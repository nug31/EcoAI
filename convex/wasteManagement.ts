import { v } from "convex/values";
import { query, mutation, action, internalMutation, internalAction } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

// Get user profile or create if doesn't exist
export const getUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    let profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) {
      return null; // Profile will be created when first waste item is scanned
    }

    return profile;
  },
});

// Create user profile
export const createUserProfile = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existingProfile) return existingProfile._id;

    return await ctx.db.insert("userProfiles", {
      userId,
      totalPoints: 0,
      level: 1,
      wasteItemsCount: 0,
      recycledItemsCount: 0,
      achievements: [],
      preferences: {
        notifications: true
      }
    });
  },
});

// Get user's waste items
export const getUserWasteItems = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const items = await ctx.db
      .query("wasteItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(args.limit || 20);

    return Promise.all(
      items.map(async (item) => ({
        ...item,
        imageUrl: item.imageId ? await ctx.storage.getUrl(item.imageId) : null
      }))
    );
  },
});

// Generate upload URL for waste image
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.storage.generateUploadUrl();
  },
});

// Analyze waste with AI
export const analyzeWaste = action({
  args: {
    imageId: v.id("_storage"),
    userDescription: v.optional(v.string())
  },
  handler: async (ctx, args): Promise<{ wasteItemId: string; analysis: any }> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Get image URL
    const imageUrl = await ctx.storage.getUrl(args.imageId);
    if (!imageUrl) throw new Error("Image not found");

    // Use AI to analyze the waste
    const analysis: any = await ctx.runAction(internal.wasteManagement.performAIAnalysis, {
      imageUrl,
      userDescription: args.userDescription
    });

    // Save the waste item
    const wasteItemId: any = await ctx.runMutation(internal.wasteManagement.saveWasteItem, {
      userId,
      imageId: args.imageId,
      analysis
    });

    return { wasteItemId, analysis };
  },
});

// Internal action for AI analysis
export const performAIAnalysis = internalAction({
  args: {
    imageUrl: v.string(),
    userDescription: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const OpenAI = (await import("openai")).default;
    
    const openai = new OpenAI({
      baseURL: process.env.CONVEX_OPENAI_BASE_URL,
      apiKey: process.env.CONVEX_OPENAI_API_KEY,
    });

    const prompt = `Analyze this waste item image and provide:
1. Waste type (organic, plastic, glass, paper, electronic, metal, or other)
2. Brief description of the item
3. Recycling tips and proper disposal method
4. Environmental impact if not disposed properly
5. Creative reuse ideas if applicable

${args.userDescription ? `User description: ${args.userDescription}` : ''}

Please respond in JSON format with fields: wasteType, description, recyclingTips, environmentalImpact, reuseIdeas`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: args.imageUrl } }
            ]
          }
        ],
        max_tokens: 500
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("No analysis received");

      // Try to parse JSON, fallback to text analysis
      try {
        return JSON.parse(content);
      } catch {
        // Fallback: extract basic info from text
        const wasteTypes = ["organic", "plastic", "glass", "paper", "electronic", "metal"];
        const detectedType = wasteTypes.find(type => 
          content.toLowerCase().includes(type)
        ) || "other";

        return {
          wasteType: detectedType,
          description: content.substring(0, 200),
          recyclingTips: "Please check local recycling guidelines for proper disposal.",
          environmentalImpact: "Improper disposal can harm the environment.",
          reuseIdeas: "Consider creative ways to reuse this item before disposal."
        };
      }
    } catch (error) {
      console.error("AI analysis failed:", error);
      return {
        wasteType: "other",
        description: "Unable to analyze image automatically",
        recyclingTips: "Please check local recycling guidelines",
        environmentalImpact: "Proper disposal is important for the environment",
        reuseIdeas: "Consider reusing before disposing"
      };
    }
  },
});

// Internal mutation to save waste item
export const saveWasteItem = internalMutation({
  args: {
    userId: v.id("users"),
    imageId: v.id("_storage"),
    analysis: v.object({
      wasteType: v.string(),
      description: v.string(),
      recyclingTips: v.string(),
      environmentalImpact: v.optional(v.string()),
      reuseIdeas: v.optional(v.string())
    })
  },
  handler: async (ctx, args) => {
    // Calculate points based on waste type
    const pointsMap: Record<string, number> = {
      organic: 10,
      plastic: 15,
      glass: 12,
      paper: 8,
      electronic: 25,
      metal: 20,
      other: 5
    };

    const pointsEarned = pointsMap[args.analysis.wasteType] || 5;

    // Save waste item
    const wasteItemId = await ctx.db.insert("wasteItems", {
      userId: args.userId,
      imageId: args.imageId,
      wasteType: args.analysis.wasteType,
      description: args.analysis.description,
      aiAnalysis: JSON.stringify(args.analysis),
      recyclingTips: args.analysis.recyclingTips,
      pointsEarned,
      isRecycled: false
    });

    // Update user profile
    let profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    if (!profile) {
      // Create profile if it doesn't exist
      const profileId = await ctx.db.insert("userProfiles", {
        userId: args.userId,
        totalPoints: pointsEarned,
        level: 1,
        wasteItemsCount: 1,
        recycledItemsCount: 0,
        achievements: [],
        preferences: {
          notifications: true
        }
      });
      profile = await ctx.db.get(profileId);
    } else {
      const newTotalPoints = profile.totalPoints + pointsEarned;
      const newLevel = Math.floor(newTotalPoints / 100) + 1;
      
      await ctx.db.patch(profile._id, {
        totalPoints: newTotalPoints,
        level: newLevel,
        wasteItemsCount: profile.wasteItemsCount + 1
      });
    }

    return wasteItemId;
  },
});

// Mark item as recycled
export const markAsRecycled = mutation({
  args: { wasteItemId: v.id("wasteItems") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const wasteItem = await ctx.db.get(args.wasteItemId);
    if (!wasteItem || wasteItem.userId !== userId) {
      throw new Error("Waste item not found");
    }

    if (wasteItem.isRecycled) {
      throw new Error("Item already marked as recycled");
    }

    // Mark as recycled and award bonus points
    const bonusPoints = 5;
    await ctx.db.patch(args.wasteItemId, {
      isRecycled: true
    });

    // Update user profile
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (profile) {
      const newTotalPoints = profile.totalPoints + bonusPoints;
      const newLevel = Math.floor(newTotalPoints / 100) + 1;
      
      await ctx.db.patch(profile._id, {
        totalPoints: newTotalPoints,
        level: newLevel,
        recycledItemsCount: profile.recycledItemsCount + 1
      });
    }

    return { success: true, bonusPoints };
  },
});

// Get recycling tips by waste type
export const getRecyclingTips = query({
  args: { wasteType: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.wasteType && args.wasteType.length > 0) {
      return await ctx.db
        .query("recyclingTips")
        .withIndex("by_waste_type", (q) => q.eq("wasteType", args.wasteType!))
        .collect();
    }
    
    return await ctx.db.query("recyclingTips").collect();
  },
});

// Get available rewards
export const getRewards = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("rewards")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Get leaderboard
export const getLeaderboard = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const profiles = await ctx.db
      .query("userProfiles")
      .withIndex("by_points")
      .order("desc")
      .take(args.limit || 10);

    return Promise.all(
      profiles.map(async (profile) => {
        const user = await ctx.db.get(profile.userId);
        return {
          ...profile,
          userName: user?.name || user?.email || "Anonymous User"
        };
      })
    );
  },
});
