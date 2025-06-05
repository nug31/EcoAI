import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";

export function RecyclingTips() {
  const { t } = useLanguage();
  const [selectedWasteType, setSelectedWasteType] = useState<string>("");
  const tips = useQuery(api.wasteManagement.getRecyclingTips, { 
    wasteType: selectedWasteType || undefined 
  });

  const wasteTypes = [
    { value: "", label: t('allTypes'), icon: "🗂️" },
    { value: "plastic", label: t('plastic'), icon: "🥤" },
    { value: "paper", label: t('paper'), icon: "📄" },
    { value: "glass", label: t('glass'), icon: "🍶" },
    { value: "organic", label: t('organic'), icon: "🥬" },
    { value: "electronic", label: t('electronic'), icon: "📱" },
    { value: "metal", label: t('metal'), icon: "🔧" }
  ];

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800"
  };

  if (tips === undefined) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💡 {t('recyclingTipsTitle')}</h2>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {wasteTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedWasteType(type.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedWasteType === type.value
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tips && tips.length > 0 ? (
          tips.map((tip) => (
            <div key={tip._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    difficultyColors[tip.difficulty as keyof typeof difficultyColors]
                  }`}>
                    {t(tip.difficulty)}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{tip.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">{t('materialsNeeded')}</h4>
                    <div className="flex flex-wrap gap-1">
                      {tip.materials.map((material, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">{t('steps')}</h4>
                    <ol className="text-sm text-gray-600 space-y-1">
                      {tip.steps.map((step, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-green-500 font-medium">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex flex-wrap gap-1">
                      {tip.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <span className="text-sm">⭐</span>
                      <span className="text-sm font-medium">{tip.pointsReward} pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <p className="text-gray-600">{t('noTipsFound')}</p>
            <p className="text-sm text-gray-500 mt-1">{t('tryDifferentType')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
