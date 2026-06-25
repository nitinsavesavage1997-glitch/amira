export interface Product {
  id: string;
  name: string;
  subtitle: string;
  spf: number;
  pa: string;
  type: 'mineral' | 'chemical' | 'hybrid';
  finish: 'Dewy/Glow' | 'Velvet/Matte' | 'Totally Invisible';
  skinType: string[];
  description: string;
  longDescription: string;
  keyBenefits: string[];
  ingredients: string[];
  texture: string;
  textureDescription: string;
  usage: string;
  volume: string;
  image: string;
  rating: number;
  reviewsCount: number;
  colorHex: string; // Theme color for product detail accent
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'UV Filter' | 'Antioxidant' | 'Soothing' | 'Hydration';
  benefit: string;
  description: string;
  icon: string;
  synergyWith: string[]; // IDs of ingredients that synergize with this
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: 'skinType' | 'activity' | 'finish';
  options: {
    label: string;
    description: string;
    value: string;
    icon: string;
  }[];
}

export interface QuizAnswers {
  skinType: string;
  activity: string;
  finish: string;
}
