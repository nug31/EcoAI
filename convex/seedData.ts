import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedRecyclingTips = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existing = await ctx.db.query("recyclingTips").first();
    if (existing) return { message: "Data already seeded" };

    const tips = [
      {
        wasteType: "plastic",
        title: "Plastic Bottle Planter",
        description: "Transform plastic bottles into beautiful planters for your garden",
        difficulty: "easy",
        materials: ["Plastic bottle", "Scissors", "Paint (optional)", "Soil", "Seeds"],
        steps: [
          "Clean the plastic bottle thoroughly",
          "Cut the bottle in half",
          "Make drainage holes in the bottom",
          "Decorate with paint if desired",
          "Fill with soil and plant seeds"
        ],
        pointsReward: 15,
        tags: ["gardening", "decoration", "upcycling"]
      },
      {
        wasteType: "paper",
        title: "Paper Mache Art",
        description: "Create beautiful art pieces using old newspapers and magazines",
        difficulty: "medium",
        materials: ["Old newspapers", "Flour", "Water", "Paint", "Brush"],
        steps: [
          "Mix flour and water to make paste",
          "Tear paper into strips",
          "Dip strips in paste and layer on form",
          "Let dry completely",
          "Paint and decorate as desired"
        ],
        pointsReward: 12,
        tags: ["art", "crafts", "creative"]
      },
      {
        wasteType: "glass",
        title: "Glass Jar Storage",
        description: "Repurpose glass jars for kitchen and bathroom storage",
        difficulty: "easy",
        materials: ["Glass jars", "Labels", "Cleaning supplies"],
        steps: [
          "Remove all labels and adhesive",
          "Clean thoroughly with soap and water",
          "Dry completely",
          "Add new labels for organization",
          "Use for storing spices, toiletries, or craft supplies"
        ],
        pointsReward: 10,
        tags: ["organization", "storage", "kitchen"]
      },
      {
        wasteType: "organic",
        title: "Home Composting",
        description: "Turn organic waste into nutrient-rich compost for your garden",
        difficulty: "medium",
        materials: ["Organic waste", "Compost bin", "Brown materials (leaves, paper)", "Water"],
        steps: [
          "Set up compost bin in suitable location",
          "Layer green (organic waste) and brown materials",
          "Keep moist but not waterlogged",
          "Turn regularly for aeration",
          "Harvest compost after 3-6 months"
        ],
        pointsReward: 20,
        tags: ["gardening", "sustainability", "fertilizer"]
      },
      {
        wasteType: "electronic",
        title: "E-Waste Recycling",
        description: "Properly dispose of electronic waste at certified centers",
        difficulty: "easy",
        materials: ["Electronic devices", "Transportation"],
        steps: [
          "Remove all personal data from devices",
          "Find certified e-waste recycling center",
          "Separate different types of electronics",
          "Transport to recycling facility",
          "Get certificate of proper disposal"
        ],
        pointsReward: 25,
        tags: ["electronics", "certified", "data-security"]
      }
    ];

    for (const tip of tips) {
      await ctx.db.insert("recyclingTips", tip);
    }

    // Seed rewards
    const rewards = [
      {
        title: "Eco-Friendly Water Bottle",
        description: "Reusable stainless steel water bottle",
        pointsCost: 500,
        category: "product",
        isActive: true
      },
      {
        title: "Plant a Tree Donation",
        description: "Donate to plant one tree in your name",
        pointsCost: 200,
        category: "donation",
        isActive: true
      },
      {
        title: "Local Cafe Discount",
        description: "10% off at participating eco-friendly cafes",
        pointsCost: 100,
        category: "voucher",
        isActive: true
      },
      {
        title: "Organic Grocery Voucher",
        description: "$5 off organic groceries",
        pointsCost: 300,
        category: "voucher",
        isActive: true
      }
    ];

    for (const reward of rewards) {
      await ctx.db.insert("rewards", reward);
    }

    return { message: "Data seeded successfully" };
  },
});

export const seedIndonesianRecyclingTips = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing tips first
    const existingTips = await ctx.db.query("recyclingTips").collect();
    for (const tip of existingTips) {
      await ctx.db.delete(tip._id);
    }

    const tipsIndonesian = [
      {
        wasteType: "plastic",
        title: "Pot Tanaman dari Botol Plastik",
        description: "Ubah botol plastik menjadi pot tanaman yang indah untuk kebun Anda",
        difficulty: "easy",
        materials: ["Botol plastik", "Gunting", "Cat (opsional)", "Tanah", "Benih"],
        steps: [
          "Bersihkan botol plastik dengan teliti",
          "Potong botol menjadi dua bagian",
          "Buat lubang drainase di bagian bawah",
          "Hias dengan cat jika diinginkan",
          "Isi dengan tanah dan tanam benih"
        ],
        pointsReward: 15,
        tags: ["berkebun", "dekorasi", "daur-ulang"]
      },
      {
        wasteType: "paper",
        title: "Seni Paper Mache",
        description: "Buat karya seni indah menggunakan koran dan majalah bekas",
        difficulty: "medium",
        materials: ["Koran bekas", "Tepung", "Air", "Cat", "Kuas"],
        steps: [
          "Campur tepung dan air untuk membuat pasta",
          "Sobek kertas menjadi strip-strip",
          "Celupkan strip ke pasta dan tempelkan pada bentuk",
          "Biarkan kering sempurna",
          "Cat dan hias sesuai keinginan"
        ],
        pointsReward: 12,
        tags: ["seni", "kerajinan", "kreatif"]
      },
      {
        wasteType: "glass",
        title: "Penyimpanan Toples Kaca",
        description: "Manfaatkan kembali toples kaca untuk penyimpanan dapur dan kamar mandi",
        difficulty: "easy",
        materials: ["Toples kaca", "Label", "Perlengkapan pembersih"],
        steps: [
          "Lepas semua label dan lem",
          "Bersihkan dengan sabun dan air",
          "Keringkan sempurna",
          "Tambahkan label baru untuk organisasi",
          "Gunakan untuk menyimpan rempah, toiletries, atau perlengkapan kerajinan"
        ],
        pointsReward: 10,
        tags: ["organisasi", "penyimpanan", "dapur"]
      },
      {
        wasteType: "organic",
        title: "Kompos Rumahan",
        description: "Ubah sampah organik menjadi kompos kaya nutrisi untuk kebun Anda",
        difficulty: "medium",
        materials: ["Sampah organik", "Tempat kompos", "Bahan coklat (daun, kertas)", "Air"],
        steps: [
          "Siapkan tempat kompos di lokasi yang sesuai",
          "Lapisi bahan hijau (sampah organik) dan bahan coklat",
          "Jaga kelembaban tapi jangan terlalu basah",
          "Aduk secara teratur untuk aerasi",
          "Panen kompos setelah 3-6 bulan"
        ],
        pointsReward: 20,
        tags: ["berkebun", "keberlanjutan", "pupuk"]
      },
      {
        wasteType: "electronic",
        title: "Daur Ulang E-Waste",
        description: "Buang limbah elektronik dengan benar di pusat daur ulang bersertifikat",
        difficulty: "easy",
        materials: ["Perangkat elektronik", "Transportasi"],
        steps: [
          "Hapus semua data pribadi dari perangkat",
          "Cari pusat daur ulang e-waste bersertifikat",
          "Pisahkan berbagai jenis elektronik",
          "Bawa ke fasilitas daur ulang",
          "Dapatkan sertifikat pembuangan yang benar"
        ],
        pointsReward: 25,
        tags: ["elektronik", "bersertifikat", "keamanan-data"]
      }
    ];

    for (const tip of tipsIndonesian) {
      await ctx.db.insert("recyclingTips", tip);
    }

    // Clear existing rewards and add Indonesian rewards
    const existingRewards = await ctx.db.query("rewards").collect();
    for (const reward of existingRewards) {
      await ctx.db.delete(reward._id);
    }

    const rewardsIndonesian = [
      {
        title: "Botol Air Ramah Lingkungan",
        description: "Botol air stainless steel yang dapat digunakan kembali",
        pointsCost: 500,
        category: "product",
        isActive: true
      },
      {
        title: "Donasi Tanam Pohon",
        description: "Donasi untuk menanam satu pohon atas nama Anda",
        pointsCost: 200,
        category: "donation",
        isActive: true
      },
      {
        title: "Diskon Kafe Lokal",
        description: "Diskon 10% di kafe ramah lingkungan yang berpartisipasi",
        pointsCost: 100,
        category: "voucher",
        isActive: true
      },
      {
        title: "Voucher Belanja Organik",
        description: "Diskon Rp 75.000 untuk belanja organik",
        pointsCost: 300,
        category: "voucher",
        isActive: true
      }
    ];

    for (const reward of rewardsIndonesian) {
      await ctx.db.insert("rewards", reward);
    }

    return { message: "Indonesian data seeded successfully" };
  },
});
