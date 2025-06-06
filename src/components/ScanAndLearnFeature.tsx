import { useLanguage } from "../contexts/LanguageContext";

interface ScanAndLearnFeatureProps {
  onStartScan: () => void;
}

export function ScanAndLearnFeature({ onStartScan }: ScanAndLearnFeatureProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
      <div className="text-center">
        {/* Animated Icon */}
        <div className="relative mb-4">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <span className="text-3xl">🔬</span>
          </div>
          {/* AR Corner Markers */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="flex space-x-8">
              <div className="w-4 h-4 border-l-2 border-t-2 border-purple-400"></div>
              <div className="w-4 h-4 border-r-2 border-t-2 border-purple-400"></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
            <div className="flex space-x-8">
              <div className="w-4 h-4 border-l-2 border-b-2 border-purple-400"></div>
              <div className="w-4 h-4 border-r-2 border-b-2 border-purple-400"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          ✨ {t('scanAndLearn')}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 max-w-sm mx-auto">
          {t('scanAndLearnDescription')}
        </p>

        {/* Features List */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="text-purple-500">📱</span>
            <span>{t('scanWasteItemsAR')}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="text-blue-500">🎬</span>
            <span>{t('watchARAnimation')}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="text-green-500">🌱</span>
            <span>{t('learnRecyclingProcess')}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartScan}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🚀 {t('startScanningAR')}
        </button>

        {/* Example Items */}
        <div className="mt-4 pt-4 border-t border-purple-200">
          <p className="text-xs text-gray-500 mb-2">{t('tryScanning')}:</p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl mb-1">🥤</div>
              <div className="text-xs text-gray-600">{t('plastic')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">📄</div>
              <div className="text-xs text-gray-600">{t('paper')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🍶</div>
              <div className="text-xs text-gray-600">{t('glass')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
