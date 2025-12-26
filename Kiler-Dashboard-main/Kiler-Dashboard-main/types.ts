export interface KPI {
  id: string;
  label: string;
  value: string | number;
  trend: number; // percentage
  story: string; // Automated data story
  icon: string;
}

export enum TimeRange {
  WEEK = '7G',
  MONTH = '1A',
  YEAR = '1Y'
}

export interface UserSegment {
  name: string;
  count: number;
  description: string;
  color: string;
}

export interface RevenueData {
  time: string;
  premium: number;
  ads: number;
}

export interface ActivityData {
  hour: string;
  users: number;
  recipes: number;
}

export interface AIActionSuggestion {
  title: string;
  description: string;
  impact: string; // e.g., "+12% Retention"
}

export interface ImageEditState {
  originalImage: string | null; // base64
  processedImage: string | null; // base64
  prompt: string;
  isLoading: boolean;
  error: string | null;
}