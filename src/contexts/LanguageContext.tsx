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
