import { Authenticated, Unauthenticated, useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { WasteScanner } from "./components/WasteScanner";
import { Dashboard } from "./components/Dashboard";
import { RecyclingTips } from "./components/RecyclingTips";
import { Leaderboard } from "./components/Leaderboard";
import { Rewards } from "./components/Rewards";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { LanguageToggle } from "./components/LanguageToggle";
import { useState, useEffect } from "react";
import { toast } from "sonner";

function AppContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"dashboard" | "scanner" | "tips" | "leaderboard" | "rewards">("dashboard");
  const seedData = useMutation(api.seedData.seedRecyclingTips);
  const tips = useQuery(api.wasteManagement.getRecyclingTips, {});

  // Seed data on first load if no tips exist
  useEffect(() => {
    if (tips !== undefined && tips.length === 0) {
      seedData().then(() => {
        toast.success("Initial data loaded!");
      }).catch((error) => {
        console.error("Failed to seed data:", error);
      });
    }
  }, [tips, seedData]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌱</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t('appName')}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Authenticated>
                <LanguageToggle />
                <SignOutButton />
              </Authenticated>
              <Unauthenticated>
                <LanguageToggle />
              </Unauthenticated>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Unauthenticated>
          <div className="flex items-center justify-center min-h-[80vh] p-8">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  {t('smartWasteManagement')}
                </h2>
                <p className="text-lg text-gray-600">
                  {t('tagline')}
                </p>
              </div>
              <SignInForm />
            </div>
          </div>
        </Unauthenticated>

        <Authenticated>
          <div className="max-w-6xl mx-auto p-4">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-lg p-2 shadow-sm">
              {[
                { id: "dashboard", label: t('dashboard'), icon: "📊" },
                { id: "scanner", label: t('scanWaste'), icon: "📸" },
                { id: "tips", label: t('recyclingTips'), icon: "💡" },
                { id: "leaderboard", label: t('leaderboard'), icon: "🏆" },
                { id: "rewards", label: t('rewards'), icon: "🎁" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "scanner" && <WasteScanner />}
            {activeTab === "tips" && <RecyclingTips />}
            {activeTab === "leaderboard" && <Leaderboard />}
            {activeTab === "rewards" && <Rewards />}
          </div>
        </Authenticated>
      </main>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
