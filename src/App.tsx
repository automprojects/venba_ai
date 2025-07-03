import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import ModeSelector from './components/ModeSelector';
import LanguageSelector from './components/LanguageSelector';
import ProcessingControls from './components/ProcessingControls';
import Results from './components/Results';
import ExportOptions from './components/ExportOptions';
import UserStats from './components/UserStats';
import { 
  humanizationModes, 
  supportedLanguages, 
  simulateHumanization, 
  countWords, 
  detectAIContent,
  checkPuterConnection
} from './utils/textProcessor';
import { ProcessingResult, UserStats as UserStatsType } from './types';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedMode, setSelectedMode] = useState('standard');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [aiDetectionScore, setAiDetectionScore] = useState<{ score: number; detector: string } | null>(null);
  const [isPuterConnected, setIsPuterConnected] = useState<boolean>(true);
  const [userStats, setUserStats] = useState<UserStatsType>({
    wordsProcessedToday: 2847,
    wordsProcessedMonth: 45623,
    monthlyLimit: 150000,
    remainingWords: 104377
  });

  const wordCount = countWords(inputText);
  const maxWords = 300;
  const canProcess = inputText.trim().length > 0 && wordCount <= maxWords;

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkPuterConnection();
      setIsPuterConnected(connected);
    };
    
    checkConnection();
  }, []);

  const handleProcess = async () => {
    if (!canProcess) return;
    
    setIsProcessing(true);
    setResult(null);
    setAiDetectionScore(null);
    
    try {
      // Check Puter connection before processing
      const connected = await checkPuterConnection();
      setIsPuterConnected(connected);
      
      const processResult = await simulateHumanization(inputText, selectedMode, selectedLanguage);
      setResult(processResult);
      
      // Update user stats
      setUserStats(prev => ({
        ...prev,
        wordsProcessedToday: prev.wordsProcessedToday + wordCount,
        wordsProcessedMonth: prev.wordsProcessedMonth + wordCount,
        remainingWords: prev.remainingWords - wordCount
      }));
      
      // Simulate AI detection on humanized text
      const detection = detectAIContent(processResult.humanizedText);
      setAiDetectionScore(detection);
    } catch (error) {
      console.error('Processing failed:', error);
      // You could add error state handling here
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    handleProcess();
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.humanizedText);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              AI Text Humanizer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform AI-generated content into natural, human-like text using Puter.com's advanced AI backend. 
              Bypass AI detectors while preserving meaning and context.
            </p>
            {!isPuterConnected && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-2xl mx-auto">
                <p className="text-sm text-yellow-800">
                  ⚠️ Puter.com backend unavailable. Using local fallback processing.
                </p>
              </div>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Column - Input and Controls */}
            <div className="xl:col-span-3 space-y-6">
              <TextInput
                value={inputText}
                onChange={setInputText}
                wordCount={wordCount}
                maxWords={maxWords}
              />
              
              <ModeSelector
                modes={humanizationModes}
                selectedMode={selectedMode}
                onModeChange={setSelectedMode}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LanguageSelector
                  languages={supportedLanguages}
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                />
                
                <div className="flex items-center justify-center">
                  <ProcessingControls
                    onProcess={handleProcess}
                    onRetry={handleRetry}
                    isProcessing={isProcessing}
                    hasResult={!!result}
                    disabled={!canProcess}
                  />
                </div>
              </div>
              
              {/* Results */}
              {result && (
                <div className="space-y-6">
                  <Results 
                    result={result} 
                    aiDetectionScore={aiDetectionScore}
                    isPuterConnected={isPuterConnected}
                  />
                  <ExportOptions text={result.humanizedText} onCopy={handleCopy} />
                </div>
              )}
            </div>

            {/* Right Column - Stats */}
            <div className="xl:col-span-1">
              <UserStats stats={userStats} />
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Choose Venba AI with Puter.com?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold text-gray-900">AI-Detector Bypass</h3>
                <p className="text-sm text-gray-600">
                  Powered by Puter.com's advanced AI to pass GPTZero, ZeroGPT, Originality.ai, Turnitin, and Copyleaks
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                <p className="text-sm text-gray-600">
                  Process your text in 3-10 seconds with Puter.com's optimized infrastructure
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-gray-900">Meaning Preservation</h3>
                <p className="text-sm text-gray-600">
                  100% original meaning and context maintained using advanced AI algorithms
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Powered by</span>
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Puter.com AI Backend
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
