export interface HumanizationMode {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface ProcessingResult {
  originalText: string;
  humanizedText: string;
  mode: string;
  language: string;
  processingTime: number;
  wordCount: number;
  confidenceScore: number;
}

export interface UserStats {
  wordsProcessedToday: number;
  wordsProcessedMonth: number;
  monthlyLimit: number;
  remainingWords: number;
}