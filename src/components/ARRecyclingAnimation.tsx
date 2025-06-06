import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface RecyclingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: number;
}

interface ARRecyclingAnimationProps {
  wasteType: string;
  onComplete?: () => void;
}

export function ARRecyclingAnimation({ wasteType, onComplete }: ARRecyclingAnimationProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Define recycling processes for different waste types
  const recyclingProcesses: Record<string, RecyclingStep[]> = {
    plastic: [
      {
        id: 1,
        title: t('collection'),
        description: t('plasticCollection'),
        icon: "🗂️",
        duration: 2000
      },
      {
        id: 2,
        title: t('sorting'),
        description: t('plasticSorting'),
        icon: "🔄",
        duration: 2000
      },
      {
        id: 3,
        title: t('cleaning'),
        description: t('plasticCleaning'),
        icon: "🧽",
        duration: 2000
      },
      {
        id: 4,
        title: t('shredding'),
        description: t('plasticShredding'),
        icon: "⚙️",
        duration: 2000
      },
      {
        id: 5,
        title: t('melting'),
        description: t('plasticMelting'),
        icon: "🔥",
        duration: 2000
      },
      {
        id: 6,
        title: t('newProduct'),
        description: t('plasticToClothing'),
        icon: "👕",
        duration: 2000
      }
    ],
    paper: [
      {
        id: 1,
        title: t('collection'),
        description: t('paperCollection'),
        icon: "📄",
        duration: 2000
      },
      {
        id: 2,
        title: t('pulping'),
        description: t('paperPulping'),
        icon: "🌊",
        duration: 2000
      },
      {
        id: 3,
        title: t('cleaning'),
        description: t('paperCleaning'),
        icon: "🧹",
        duration: 2000
      },
      {
        id: 4,
        title: t('bleaching'),
        description: t('paperBleaching'),
        icon: "⚪",
        duration: 2000
      },
      {
        id: 5,
        title: t('forming'),
        description: t('paperForming'),
        icon: "📋",
        duration: 2000
      },
      {
        id: 6,
        title: t('newProduct'),
        description: t('paperToNewPaper'),
        icon: "📰",
        duration: 2000
      }
    ],
    glass: [
      {
        id: 1,
        title: t('collection'),
        description: t('glassCollection'),
        icon: "🍶",
        duration: 2000
      },
      {
        id: 2,
        title: t('sorting'),
        description: t('glassSorting'),
        icon: "🎨",
        duration: 2000
      },
      {
        id: 3,
        title: t('crushing'),
        description: t('glassCrushing'),
        icon: "💎",
        duration: 2000
      },
      {
        id: 4,
        title: t('melting'),
        description: t('glassMelting'),
        icon: "🔥",
        duration: 2000
      },
      {
        id: 5,
        title: t('molding'),
        description: t('glassMolding'),
        icon: "🏺",
        duration: 2000
      },
      {
        id: 6,
        title: t('newProduct'),
        description: t('glassToNewBottle'),
        icon: "🍾",
        duration: 2000
      }
    ]
  };

  const steps = recyclingProcesses[wasteType] || recyclingProcesses.plastic;

  useEffect(() => {
    if (isPlaying && currentStep < steps.length) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          setProgress(0);
        } else {
          setIsPlaying(false);
          onComplete?.();
        }
      }, steps[currentStep].duration);

      const progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + (100 / (steps[currentStep].duration / 50));
        });
      }, 50);

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
      };
    }
  }, [isPlaying, currentStep, steps, onComplete]);

  const startAnimation = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border-2 border-dashed border-blue-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          🔬 {t('scanAndLearn')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('watchRecyclingProcess')}
        </p>
      </div>

      {/* AR-like Animation Container */}
      <div className="relative bg-white rounded-lg p-6 mb-6 min-h-[300px] border shadow-inner">
        {/* Background Grid for AR effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-blue-200"></div>
            ))}
          </div>
        </div>

        {/* Current Step Display */}
        <div className="relative z-10 text-center">
          {/* Large Icon with Animation */}
          <div className={`text-6xl mb-4 transition-all duration-500 ${
            isPlaying ? 'animate-pulse scale-110' : 'scale-100'
          }`}>
            {steps[currentStep]?.icon}
          </div>

          {/* Step Title */}
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {t('step')} {currentStep + 1}: {steps[currentStep]?.title}
          </h4>

          {/* Step Description */}
          <p className="text-gray-600 text-sm mb-4 max-w-md mx-auto">
            {steps[currentStep]?.description}
          </p>

          {/* Progress Bar */}
          {isPlaying && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-green-500 scale-110' 
                    : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* AR Corner Markers */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-blue-400"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-blue-400"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-blue-400"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-blue-400"></div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isPlaying ? (
          <button
            onClick={startAnimation}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg"
          >
            <span>▶️</span>
            {t('startAnimation')}
          </button>
        ) : (
          <button
            onClick={resetAnimation}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
          >
            <span>⏹️</span>
            {t('stopAnimation')}
          </button>
        )}
      </div>

      {/* Fun Facts */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h5 className="font-semibold text-yellow-800 mb-2">💡 {t('didYouKnow')}</h5>
        <p className="text-yellow-700 text-sm">
          {wasteType === 'plastic' && t('plasticFact')}
          {wasteType === 'paper' && t('paperFact')}
          {wasteType === 'glass' && t('glassFact')}
        </p>
      </div>
    </div>
  );
}
