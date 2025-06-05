import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  wasteItems: defineTable({
    userId: v.id("users"),
    imageId: v.optional(v.id("_storage")),
    wasteType: v.string(), // "organic", "plastic", "glass", "paper", "electronic", "metal", "other"
    description: v.string(),
    aiAnalysis: v.optional(v.string()),
    recyclingTips: v.optional(v.string()),
    pointsEarned: v.number(),
    isRecycled: v.boolean(),
    location: v.optional(v.object({
      latitude: v.number(),
      longitude: v.number(),
      address: v.optional(v.string())
    }))
  }).index("by_user", ["userId"])
    .index("by_waste_type", ["wasteType"]),

  userProfiles: defineTable({
    userId: v.id("users"),
    totalPoints: v.number(),
    level: v.number(),
    wasteItemsCount: v.number(),
    recycledItemsCount: v.number(),
    achievements: v.array(v.string()),
    preferences: v.optional(v.object({
      notifications: v.boolean(),
      location: v.optional(v.string())
    }))
  }).index("by_user", ["userId"])
    .index("by_points", ["totalPoints"]),

  recyclingTips: defineTable({
    wasteType: v.string(),
    title: v.string(),
    description: v.string(),
    difficulty: v.string(), // "easy", "medium", "hard"
    materials: v.array(v.string()),
    steps: v.array(v.string()),
    pointsReward: v.number(),
    tags: v.array(v.string())
  }).index("by_waste_type", ["wasteType"])
    .index("by_difficulty", ["difficulty"]),

  rewards: defineTable({
    title: v.string(),
    description: v.string(),
    pointsCost: v.number(),
    category: v.string(), // "voucher", "product", "donation"
    isActive: v.boolean(),
    imageUrl: v.optional(v.string())
  }).index("by_category", ["category"])
    .index("by_points", ["pointsCost"]),

  userRewards: defineTable({
    userId: v.id("users"),
    rewardId: v.id("rewards"),
    redeemedAt: v.number(),
    status: v.string() // "pending", "claimed", "expired"
  }).index("by_user", ["userId"])
    .index("by_reward", ["rewardId"])
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
