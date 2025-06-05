import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "../contexts/LanguageContext";

export function Rewards() {
  const { t } = useLanguage();
  const rewards = useQuery(api.wasteManagement.getRewards);
  const userProfile = useQuery(api.wasteManagement.getUserProfile);

  if (rewards === undefined || userProfile === undefined) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "product": return "🛍️";
      case "voucher": return "🎫";
      case "donation": return "🌱";
      default: return "🎁";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "product": return "bg-blue-100 text-blue-800";
      case "voucher": return "bg-purple-100 text-purple-800";
      case "donation": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const userPoints = userProfile?.totalPoints || 0;

  return (
    <div className="space-y-6">
      {/* Points Balance */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">{t('yourPointsBalance')}</h3>
            <p className="text-3xl font-bold">{userPoints}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
        </div>
        <p className="text-purple-100 mt-2">{t('redeemPoints')}</p>
      </div>

      {/* Rewards Grid */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🎁 {t('availableRewards')}
          </h2>
          <p className="text-gray-600 mt-1">{t('redeemForSustainable')}</p>
        </div>

        <div className="p-6">
          {rewards && rewards.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rewards.map((reward) => {
                const canAfford = userPoints >= reward.pointsCost;
                
                return (
                  <div 
                    key={reward._id}
                    className={`border rounded-lg p-6 transition-all ${
                      canAfford 
                        ? "border-green-200 bg-green-50 hover:shadow-md" 
                        : "border-gray-200 bg-gray-50 opacity-75"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getCategoryIcon(reward.category)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getCategoryColor(reward.category)
                        }`}>
                          {t(reward.category)}
                        </span>
                      </div>
                      {canAfford && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {t('available')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {reward.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {reward.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">⭐</span>
                        <span className="font-bold text-gray-800">
                          {reward.pointsCost}
                        </span>
                        <span className="text-sm text-gray-500">{t('points')}</span>
                      </div>
                      
                      <button
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          canAfford
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {canAfford ? t('redeem') : t('needMorePoints')}
                      </button>
                    </div>

                    {!canAfford && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          {t('needMore')} {reward.pointsCost - userPoints} {t('morePoints')}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <p className="text-gray-600">{t('noRewardsAvailable')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('checkBackLater')}</p>
            </div>
          )}
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 {t('howToEarnMore')}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">📸</span>
            <div>
              <p className="font-medium text-blue-800">{t('scanWasteItems')}</p>
              <p className="text-sm text-blue-600">{t('pointsPerItem')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">♻️</span>
            <div>
              <p className="font-medium text-blue-800">{t('markAsRecycled')}</p>
              <p className="text-sm text-blue-600">{t('bonusPoints')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">🏆</span>
            <div>
              <p className="font-medium text-blue-800">{t('completeChallenges')}</p>
              <p className="text-sm text-blue-600">{t('comingSoon')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">👥</span>
            <div>
              <p className="font-medium text-blue-800">{t('referFriends')}</p>
              <p className="text-sm text-blue-600">{t('comingSoon')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
