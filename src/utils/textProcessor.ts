import { HumanizationMode, ProcessingResult } from '../types';
import { puterAPI, PuterHumanizationRequest } from './puterApi';

export const humanizationModes: HumanizationMode[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Balanced humanization for general use',
    icon: 'Zap'
  },
  {
    id: 'formal',
    name: 'Formal',
    description: 'Professional and academic writing',
    icon: 'FileText'
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Conversational and friendly tone',
    icon: 'MessageCircle'
  },
  {
    id: 'simplify',
    name: 'Simplify',
    description: 'Make text easier to understand',
    icon: 'Minus'
  },
  {
    id: 'expand',
    name: 'Expand',
    description: 'Add more detail and context',
    icon: 'Plus'
  },
  {
    id: 'shorten',
    name: 'Shorten',
    description: 'Make text more concise',
    icon: 'Minimize'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Maximum humanization power',
    icon: 'Sparkles'
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Scholarly and research-focused',
    icon: 'GraduationCap'
  },
  {
    id: 'plain',
    name: 'Plain',
    description: 'Simple and straightforward',
    icon: 'Type'
  }
];

export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷' },
  { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenian', flag: '🇸🇮' },
  { code: 'et', name: 'Estonian', flag: '🇪🇪' },
  { code: 'lv', name: 'Latvian', flag: '🇱🇻' },
  { code: 'lt', name: 'Lithuanian', flag: '🇱🇹' },
  { code: 'el', name: 'Greek', flag: '🇬🇷' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾' },
  { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'ne', name: 'Nepali', flag: '🇳🇵' },
  { code: 'or', name: 'Odia', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'si', name: 'Sinhala', flag: '🇱🇰' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'fa', name: 'Persian', flag: '🇮🇷' },
  { code: 'ps', name: 'Pashto', flag: '🇦🇫' },
  { code: 'ku', name: 'Kurdish', flag: '🏴' }
];

export const simulateHumanization = async (
  text: string,
  mode: string,
  language: string
): Promise<ProcessingResult> => {
  try {
    // Prepare request for Puter.com API
    const request: PuterHumanizationRequest = {
      text,
      mode,
      language,
      options: {
        preserveMeaning: true,
        bypassDetectors: ['GPTZero', 'ZeroGPT', 'Originality.ai', 'Turnitin', 'Copyleaks'],
        targetTone: getTargetTone(mode)
      }
    };

    // Call Puter.com API
    const response = await puterAPI.humanizeText(request);

    if (response.success && response.data) {
      return {
        originalText: response.data.originalText,
        humanizedText: response.data.humanizedText,
        mode: response.data.mode,
        language: response.data.language,
        processingTime: response.data.processingTime,
        wordCount: response.data.wordCount,
        confidenceScore: response.data.confidenceScore
      };
    } else {
      throw new Error(response.error?.message || 'Humanization failed');
    }
  } catch (error) {
    console.error('Humanization error:', error);
    throw error;
  }
};

const getTargetTone = (mode: string): string => {
  const toneMap: Record<string, string> = {
    'standard': 'natural and balanced',
    'formal': 'professional and academic',
    'casual': 'conversational and friendly',
    'simplify': 'clear and accessible',
    'expand': 'detailed and comprehensive',
    'shorten': 'concise and direct',
    'advanced': 'sophisticated and nuanced',
    'academic': 'scholarly and research-focused',
    'plain': 'simple and straightforward'
  };
  return toneMap[mode] || 'natural';
};

export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const detectAIContent = (text: string): { score: number; detector: string } => {
  // Simulate AI detection scores from various detectors
  const detectors = ['GPTZero', 'ZeroGPT', 'Originality.ai', 'Turnitin', 'Copyleaks'];
  const detector = detectors[Math.floor(Math.random() * detectors.length)];
  
  // Lower scores indicate better humanization (less AI-like)
  const score = Math.random() * 25 + 5; // 5-30% AI detection after humanization
  
  return { score, detector };
};

export const checkPuterConnection = async (): Promise<boolean> => {
  try {
    return await puterAPI.checkApiHealth();
  } catch {
    return false;
  }
};