import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect } from "react";

export function Dashboard() {
  const { t } = useLanguage();
  const userProfile = useQuery(api.wasteManagement.getUserProfile);
  const recentWasteItems = useQuery(api.wasteManagement.getUserWasteItems, { limit: 5 });
  const createProfile = useMutation(api.wasteManagement.createUserProfile);

  useEffect(() => {
    if (userProfile === null) {
      createProfile();
    }
  }, [userProfile, createProfile]);

  if (userProfile === undefined || recentWasteItems === undefined) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const levelProgress = userProfile ? (userProfile.totalPoints % 100) : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('totalPoints')}</p>
              <p className="text-2xl font-bold text-green-600">{userProfile?.totalPoints || 0}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('level')}</p>
              <p className="text-2xl font-bold text-blue-600">{userProfile?.level || 1}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏅</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{t('progressToNextLevel')}</span>
              <span>{levelProgress}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('itemsScanned')}</p>
              <p className="text-2xl font-bold text-purple-600">{userProfile?.wasteItemsCount || 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📸</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('itemsRecycled')}</p>
              <p className="text-2xl font-bold text-emerald-600">{userProfile?.recycledItemsCount || 0}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">♻️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{t('recentActivity')}</h3>
        </div>
        <div className="p-6">
          {recentWasteItems && recentWasteItems.length > 0 ? (
            <div className="space-y-4">
              {recentWasteItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt="Waste item"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {item.wasteType}
                      </span>
                      {item.isRecycled && (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                          ♻️ {t('recycled')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item._creationTime).toLocaleDateString()} • +{item.pointsEarned} {t('points')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <p className="text-gray-600">{t('noWasteItems')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('startScanning')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
