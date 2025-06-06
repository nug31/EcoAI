import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    appName: "EcoAI",
    smartWasteManagement: "Smart Waste Management",
    tagline: "Use AI to identify waste, get recycling tips, and earn rewards for eco-friendly actions",
    
    // Navigation
    dashboard: "Dashboard",
    scanWaste: "Scan Waste",
    recyclingTips: "Recycling Tips",
    leaderboard: "Leaderboard",
    rewards: "Rewards",
    
    // Dashboard
    totalPoints: "Total Points",
    level: "Level",
    itemsScanned: "Items Scanned",
    itemsRecycled: "Items Recycled",
    progressToNextLevel: "Progress to next level",
    recentActivity: "Recent Activity",
    recycled: "Recycled",
    points: "points",
    noWasteItems: "No waste items scanned yet",
    startScanning: "Start scanning waste to earn points and help the environment!",
    
    // Waste Scanner
    scanYourWaste: "Scan Your Waste",
    takeOrUploadPhoto: "Take or Upload Photo",
    clickToSelect: "Click to select an image of your waste item",
    description: "Description",
    optional: "Optional",
    describeWaste: "Describe the waste item to help with analysis...",
    analyzeWithAI: "Analyze with AI",
    analyzingWithAI: "Analyzing with AI...",
    analysisComplete: "Analysis Complete!",
    wasteType: "Waste Type",
    recyclingTipsLabel: "Recycling Tips",
    reuseIdeas: "Reuse Ideas",
    environmentalImpact: "Environmental Impact",
    scanAnotherItem: "Scan Another Item",

    // AR Recycling Animation
    scanAndLearn: "Scan & Learn",
    watchRecyclingProcess: "Watch how this waste is recycled into new products",
    step: "Step",
    startAnimation: "Start Animation",
    stopAnimation: "Stop Animation",
    didYouKnow: "Did You Know?",
    learningComplete: "Learning complete! You've discovered the recycling process!",
    scanAndLearnDescription: "Scan waste items and watch interactive AR animations showing how they're recycled into new products",
    scanWasteItems: "Scan waste items",
    watchARAnimation: "Watch AR animations",
    learnRecyclingProcess: "Learn recycling process",
    startScanning: "Start Scanning",
    tryScanning: "Try scanning",

    // Recycling Process Steps
    collection: "Collection",
    sorting: "Sorting",
    cleaning: "Cleaning",
    shredding: "Shredding",
    melting: "Melting",
    pulping: "Pulping",
    bleaching: "Bleaching",
    forming: "Forming",
    crushing: "Crushing",
    molding: "Molding",
    newProduct: "New Product",

    // Plastic Process
    plasticCollection: "Plastic bottles are collected from recycling bins",
    plasticSorting: "Bottles are sorted by type and color",
    plasticCleaning: "Labels and caps are removed, bottles are washed",
    plasticShredding: "Clean bottles are shredded into small flakes",
    plasticMelting: "Flakes are melted and formed into pellets",
    plasticToClothing: "Pellets are spun into fibers for clothing",
    plasticFact: "One plastic bottle can be recycled into enough fiber for one t-shirt!",

    // Paper Process
    paperCollection: "Used paper is collected and transported",
    paperPulping: "Paper is mixed with water to create pulp",
    paperCleaning: "Ink and contaminants are removed from pulp",
    paperBleaching: "Pulp is bleached to achieve desired whiteness",
    paperForming: "Clean pulp is formed into new paper sheets",
    paperToNewPaper: "New recycled paper is ready for use",
    paperFact: "Recycling one ton of paper saves 17 trees and 7,000 gallons of water!",

    // Glass Process
    glassCollection: "Glass containers are collected and sorted",
    glassSorting: "Glass is sorted by color (clear, brown, green)",
    glassCrushing: "Sorted glass is crushed into small pieces called cullet",
    glassMelting: "Cullet is melted in furnaces at 1500°C",
    glassMolding: "Molten glass is shaped into new containers",
    glassToNewBottle: "New glass bottles are ready for use",
    glassFact: "Glass can be recycled infinitely without losing quality!",

    // Waste Analysis Results
    properDisposal: "Proper Disposal",
    checkLocalGuidelines: "Please check local recycling guidelines for proper disposal",
    creativeReuse: "Creative Reuse Ideas",
    considerCreativeWays: "Consider creative ways to reuse this item before disposal",
    improperDisposal: "Improper disposal can harm the environment",
    
    // Recycling Tips
    recyclingTipsTitle: "Recycling Tips & DIY Projects",
    allTypes: "All Types",
    plastic: "Plastic",
    paper: "Paper",
    glass: "Glass",
    organic: "Organic",
    electronic: "Electronic",
    metal: "Metal",
    easy: "easy",
    medium: "medium",
    hard: "hard",
    materialsNeeded: "Materials Needed:",
    steps: "Steps:",
    noTipsFound: "No recycling tips found for the selected category",
    tryDifferentType: "Try selecting a different waste type",
    
    // Leaderboard
    yourPosition: "Your Position",
    notRanked: "Not ranked",
    ecoChampions: "Eco Champions Leaderboard",
    topEcoWarriors: "Top eco-warriors making a difference",
    you: "(You)",
    scanned: "scanned",
    noUsersYet: "No users on the leaderboard yet",
    beTheFirst: "Be the first to start scanning waste and earning points!",
    
    // Rewards
    yourPointsBalance: "Your Points Balance",
    redeemPoints: "Redeem points for eco-friendly rewards!",
    availableRewards: "Available Rewards",
    redeemForSustainable: "Redeem your points for sustainable rewards",
    product: "product",
    voucher: "voucher",
    donation: "donation",
    available: "Available",
    redeem: "Redeem",
    needMorePoints: "Need more points",
    needMore: "Need",
    morePoints: "more points",
    noRewardsAvailable: "No rewards available at the moment",
    checkBackLater: "Check back later for new eco-friendly rewards!",
    howToEarnMore: "How to Earn More Points",
    scanWasteItems: "Scan Waste Items",
    pointsPerItem: "5-25 points per item",
    markAsRecycled: "Mark as Recycled",
    bonusPoints: "+5 bonus points",
    completeChallenges: "Complete Challenges",
    referFriends: "Refer Friends",
    comingSoon: "Coming soon!",
    
    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    close: "Close"
  },
  id: {
    // Header
    appName: "EcoAI",
    smartWasteManagement: "Manajemen Sampah Cerdas",
    tagline: "Gunakan AI untuk mengidentifikasi sampah, dapatkan tips daur ulang, dan raih reward untuk tindakan ramah lingkungan",
    
    // Navigation
    dashboard: "Dasbor",
    scanWaste: "Pindai Sampah",
    recyclingTips: "Tips Daur Ulang",
    leaderboard: "Papan Peringkat",
    rewards: "Hadiah",
    
    // Dashboard
    totalPoints: "Total Poin",
    level: "Level",
    itemsScanned: "Item Dipindai",
    itemsRecycled: "Item Didaur Ulang",
    progressToNextLevel: "Progres ke level berikutnya",
    recentActivity: "Aktivitas Terbaru",
    recycled: "Didaur Ulang",
    points: "poin",
    noWasteItems: "Belum ada sampah yang dipindai",
    startScanning: "Mulai pindai sampah untuk mendapatkan poin dan membantu lingkungan!",
    
    // Waste Scanner
    scanYourWaste: "Pindai Sampah Anda",
    takeOrUploadPhoto: "Ambil atau Unggah Foto",
    clickToSelect: "Klik untuk memilih gambar sampah Anda",
    description: "Deskripsi",
    optional: "Opsional",
    describeWaste: "Deskripsikan sampah untuk membantu analisis...",
    analyzeWithAI: "Analisis dengan AI",
    analyzingWithAI: "Menganalisis dengan AI...",
    analysisComplete: "Analisis Selesai!",
    wasteType: "Jenis Sampah",
    recyclingTipsLabel: "Tips Daur Ulang",
    reuseIdeas: "Ide Penggunaan Ulang",
    environmentalImpact: "Dampak Lingkungan",
    scanAnotherItem: "Pindai Item Lain",

    // AR Recycling Animation
    scanAndLearn: "Pindai & Pelajari",
    watchRecyclingProcess: "Saksikan bagaimana sampah ini didaur ulang menjadi produk baru",
    step: "Langkah",
    startAnimation: "Mulai Animasi",
    stopAnimation: "Hentikan Animasi",
    didYouKnow: "Tahukah Anda?",
    learningComplete: "Pembelajaran selesai! Anda telah mempelajari proses daur ulang!",
    scanAndLearnDescription: "Pindai sampah dan saksikan animasi AR interaktif yang menunjukkan bagaimana sampah didaur ulang menjadi produk baru",
    scanWasteItems: "Pindai sampah",
    watchARAnimation: "Tonton animasi AR",
    learnRecyclingProcess: "Pelajari proses daur ulang",
    startScanning: "Mulai Memindai",
    tryScanning: "Coba pindai",

    // Recycling Process Steps
    collection: "Pengumpulan",
    sorting: "Pemilahan",
    cleaning: "Pembersihan",
    shredding: "Pencacahan",
    melting: "Peleburan",
    pulping: "Pembuatan Pulp",
    bleaching: "Pemutihan",
    forming: "Pembentukan",
    crushing: "Penghancuran",
    molding: "Pencetakan",
    newProduct: "Produk Baru",

    // Plastic Process
    plasticCollection: "Botol plastik dikumpulkan dari tempat sampah daur ulang",
    plasticSorting: "Botol dipilah berdasarkan jenis dan warna",
    plasticCleaning: "Label dan tutup dilepas, botol dicuci bersih",
    plasticShredding: "Botol bersih dicacah menjadi serpihan kecil",
    plasticMelting: "Serpihan dilebur dan dibentuk menjadi pelet",
    plasticToClothing: "Pelet dipintal menjadi serat untuk pakaian",
    plasticFact: "Satu botol plastik dapat didaur ulang menjadi serat yang cukup untuk satu kaos!",

    // Paper Process
    paperCollection: "Kertas bekas dikumpulkan dan diangkut",
    paperPulping: "Kertas dicampur dengan air untuk membuat pulp",
    paperCleaning: "Tinta dan kontaminan dipisahkan dari pulp",
    paperBleaching: "Pulp diputihkan untuk mencapai tingkat putih yang diinginkan",
    paperForming: "Pulp bersih dibentuk menjadi lembaran kertas baru",
    paperToNewPaper: "Kertas daur ulang baru siap digunakan",
    paperFact: "Mendaur ulang satu ton kertas menghemat 17 pohon dan 26.000 liter air!",

    // Glass Process
    glassCollection: "Wadah kaca dikumpulkan dan dipilah",
    glassSorting: "Kaca dipilah berdasarkan warna (bening, coklat, hijau)",
    glassCrushing: "Kaca yang sudah dipilah dihancurkan menjadi potongan kecil",
    glassMelting: "Potongan kaca dilebur dalam tungku pada suhu 1500°C",
    glassMolding: "Kaca cair dibentuk menjadi wadah baru",
    glassToNewBottle: "Botol kaca baru siap digunakan",
    glassFact: "Kaca dapat didaur ulang tanpa batas tanpa kehilangan kualitas!",

    // Waste Analysis Results
    properDisposal: "Pembuangan yang Tepat",
    checkLocalGuidelines: "Silakan periksa panduan daur ulang lokal untuk pembuangan yang tepat",
    creativeReuse: "Ide Penggunaan Ulang Kreatif",
    considerCreativeWays: "Pertimbangkan cara kreatif untuk menggunakan kembali item ini sebelum dibuang",
    improperDisposal: "Pembuangan yang tidak tepat dapat merusak lingkungan",

    // Recycling Tips
    recyclingTipsTitle: "Tips Daur Ulang & Proyek DIY",
    allTypes: "Semua Jenis",
    plastic: "Plastik",
    paper: "Kertas",
    glass: "Kaca",
    organic: "Organik",
    electronic: "Elektronik",
    metal: "Logam",
    easy: "mudah",
    medium: "sedang",
    hard: "sulit",
    materialsNeeded: "Bahan yang Dibutuhkan:",
    steps: "Langkah-langkah:",
    noTipsFound: "Tidak ada tips daur ulang untuk kategori yang dipilih",
    tryDifferentType: "Coba pilih jenis sampah yang berbeda",
    
    // Leaderboard
    yourPosition: "Posisi Anda",
    notRanked: "Belum masuk peringkat",
    ecoChampions: "Papan Peringkat Juara Eco",
    topEcoWarriors: "Para pejuang eco terbaik yang membuat perbedaan",
    you: "(Anda)",
    scanned: "dipindai",
    noUsersYet: "Belum ada pengguna di papan peringkat",
    beTheFirst: "Jadilah yang pertama memulai memindai sampah dan meraih poin!",
    
    // Rewards
    yourPointsBalance: "Saldo Poin Anda",
    redeemPoints: "Tukarkan poin untuk hadiah ramah lingkungan!",
    availableRewards: "Hadiah Tersedia",
    redeemForSustainable: "Tukarkan poin Anda untuk hadiah berkelanjutan",
    product: "produk",
    voucher: "voucher",
    donation: "donasi",
    available: "Tersedia",
    redeem: "Tukar",
    needMorePoints: "Butuh lebih banyak poin",
    needMore: "Butuh",
    morePoints: "poin lagi",
    noRewardsAvailable: "Tidak ada hadiah yang tersedia saat ini",
    checkBackLater: "Periksa kembali nanti untuk hadiah ramah lingkungan baru!",
    howToEarnMore: "Cara Mendapatkan Lebih Banyak Poin",
    scanWasteItems: "Pindai Item Sampah",
    pointsPerItem: "5-25 poin per item",
    markAsRecycled: "Tandai Sebagai Didaur Ulang",
    bonusPoints: "+5 poin bonus",
    completeChallenges: "Selesaikan Tantangan",
    referFriends: "Ajak Teman",
    comingSoon: "Segera hadir!",
    
    // Common
    loading: "Memuat...",
    error: "Error",
    success: "Berhasil",
    cancel: "Batal",
    save: "Simpan",
    delete: "Hapus",
    edit: "Edit",
    close: "Tutup"
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
