import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "../contexts/LanguageContext";

export function Leaderboard() {
  const { t } = useLanguage();
  const leaderboard = useQuery(api.wasteManagement.getLeaderboard, { limit: 20 });
  const userProfile = useQuery(api.wasteManagement.getUserProfile);

  if (leaderboard === undefined || userProfile === undefined) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "🏅";
    }
  };

  const userRank = leaderboard.findIndex(profile => profile.userId === userProfile?.userId) + 1;

  return (
    <div className="space-y-6">
      {/* User's Current Position */}
      {userProfile && (
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">{t('yourPosition')}</h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getRankIcon(userRank || 999)}</span>
                <div>
                  <p className="text-2xl font-bold">
                    {userRank > 0 ? `#${userRank}` : t('notRanked')}
                  </p>
                  <p className="text-green-100">
                    {userProfile.totalPoints} {t('points')} • {t('level')} {userProfile.level}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">{t('itemsRecycled')}</p>
              <p className="text-2xl font-bold">{userProfile.recycledItemsCount}</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🏆 {t('ecoChampions')}
          </h2>
          <p className="text-gray-600 mt-1">{t('topEcoWarriors')}</p>
        </div>
        
        <div className="divide-y">
          {leaderboard && leaderboard.length > 0 ? (
            leaderboard.map((profile, index) => {
              const rank = index + 1;
              const isCurrentUser = profile.userId === userProfile?.userId;
              
              return (
                <div 
                  key={profile._id}
                  className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    isCurrentUser ? "bg-green-50 border-l-4 border-green-500" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                      <span className="text-xl">{getRankIcon(rank)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">
                          {profile.userName}
                          {isCurrentUser && (
                            <span className="text-green-600 text-sm ml-2">{t('you')}</span>
                          )}
                        </h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {t('level')} {profile.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>📊 {profile.wasteItemsCount} items {t('scanned')}</span>
                        <span>♻️ {profile.recycledItemsCount} {t('recycled')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">
                      {profile.totalPoints}
                    </p>
                    <p className="text-sm text-gray-500">{t('points')}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-gray-600">{t('noUsersYet')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('beTheFirst')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
