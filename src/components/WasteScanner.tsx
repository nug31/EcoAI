import { useState, useRef } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";
import { ARRecyclingAnimation } from "./ARRecyclingAnimation";

export function WasteScanner() {
  const { t } = useLanguage();

  // Helper function to translate common AI response texts
  const translateAIText = (text: string): string => {
    const translations: Record<string, string> = {
      "paper": "kertas",
      "plastic": "plastik",
      "glass": "kaca",
      "organic": "organik",
      "electronic": "elektronik",
      "metal": "logam",
      "Please check local recycling guidelines for proper disposal": "Silakan periksa panduan daur ulang lokal untuk pembuangan yang tepat",
      "Consider creative ways to reuse this item before disposal": "Pertimbangkan cara kreatif untuk menggunakan kembali item ini sebelum dibuang",
      "Improper disposal can harm the environment": "Pembuangan yang tidak tepat dapat merusak lingkungan"
    };
    return translations[text] || text;
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [userDescription, setUserDescription] = useState("");
  const [showARAnimation, setShowARAnimation] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const generateUploadUrl = useMutation(api.wasteManagement.generateUploadUrl);
  const analyzeWaste = useAction(api.wasteManagement.analyzeWaste);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysis(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      // Step 1: Get upload URL
      const uploadUrl = await generateUploadUrl();
      
      // Step 2: Upload image
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });
      
      if (!result.ok) {
        throw new Error("Failed to upload image");
      }
      
      const { storageId } = await result.json();
      
      // Step 3: Analyze with AI
      const analysisResult = await analyzeWaste({
        imageId: storageId,
        userDescription: userDescription || undefined
      });
      
      setAnalysis(analysisResult.analysis);
      toast.success("Waste analyzed successfully! Points earned.");
      
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Failed to analyze waste. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setAnalysis(null);
    setUserDescription("");
    setShowARAnimation(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📸 {t('scanYourWaste')}
        </h2>
        
        {!previewUrl ? (
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📷</span>
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">{t('takeOrUploadPhoto')}</p>
              <p className="text-sm text-gray-500">{t('clickToSelect')}</p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              capture="environment"
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative">
              <img 
                src={previewUrl} 
                alt="Waste item preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={resetScanner}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Optional Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('description')} ({t('optional')})
              </label>
              <textarea
                value={userDescription}
                onChange={(e) => setUserDescription(e.target.value)}
                placeholder={t('describeWaste')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
              />
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {t('analyzingWithAI')}
                </div>
              ) : (
                `🤖 ${t('analyzeWithAI')}`
              )}
            </button>

            {/* Analysis Results */}
            {analysis && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">✅</span>
                  <h3 className="text-lg font-semibold text-green-800">{t('analysisComplete')}</h3>
                </div>

                <div className="grid gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">{t('wasteType')}</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {translateAIText(analysis.wasteType)}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">{t('description')}</h4>
                    <p className="text-gray-600 text-sm">{analysis.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">♻️ {t('recyclingTipsLabel')}</h4>
                    <p className="text-gray-600 text-sm">
                      {translateAIText(analysis.recyclingTips)}
                    </p>
                  </div>

                  {analysis.reuseIdeas && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">💡 {t('reuseIdeas')}</h4>
                      <p className="text-gray-600 text-sm">
                        {translateAIText(analysis.reuseIdeas)}
                      </p>
                    </div>
                  )}

                  {analysis.environmentalImpact && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">🌍 {t('environmentalImpact')}</h4>
                      <p className="text-gray-600 text-sm">
                        {translateAIText(analysis.environmentalImpact)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowARAnimation(!showARAnimation)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                  >
                    🔬 {t('scanAndLearn')}
                  </button>
                  <button
                    onClick={resetScanner}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    {t('scanAnotherItem')}
                  </button>
                </div>
              </div>
            )}

            {/* AR Recycling Animation */}
            {analysis && showARAnimation && (
              <div className="mt-6">
                <ARRecyclingAnimation
                  wasteType={translateAIText(analysis.wasteType).toLowerCase()}
                  onComplete={() => {
                    toast.success("🎉 " + t('learningComplete'));
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
