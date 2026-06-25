import { Product, Ingredient, QuizQuestion } from '../types';

export const products: Product[] = [
  {
    id: 'hydrating-fluid',
    name: 'Amira Daily Hydrating Fluid',
    subtitle: 'SPF 50+ • PA++++ • Hyaluronic Acid & Centella',
    spf: 50,
    pa: 'PA++++',
    type: 'hybrid',
    finish: 'Dewy/Glow',
    skinType: ['Dry', 'Combination', 'Sensitive'],
    description: 'An ultra-lightweight, hydrating sunscreen fluid that leaves a luminous, glass-skin dewy finish. Infused with double-molecular hyaluronic acid.',
    longDescription: 'Amira Daily Hydrating Fluid merges high-performance solar filters with deep-cell hydration. Formulated specifically to combat screen-emitted blue light and intense UV radiation, it applies like an ultra-fluid water cream. Within seconds, it melts transparently into the skin, replenishing lost hydration and building a radiant, glowing shield that lasts all day without causing congestion or white cast.',
    keyBenefits: [
      'Deepsheet hydration with 2% Hyaluronic Acid',
      'Glass-skin, glowing dewy finish with zero greasy feeling',
      'Soothes redness using fermented Centella Asiatica',
      'Shields against UVA, UVB, and High-Energy Visible (HEV) Blue Light'
    ],
    ingredients: ['Zinc Oxide', 'Hyaluronic Acid', 'Centella Asiatica', 'Niacinamide'],
    texture: 'Fluid Water Cream',
    textureDescription: 'Sinks in instantly with a cooling sensation, leaving a lightweight moisture-locking barrier.',
    usage: 'Shake well before use. Apply 2 fingers-length as the final step of your morning skincare routine, at least 15 minutes before sun exposure.',
    volume: '50ml / 1.7 fl. oz',
    image: '/src/assets/images/amira_hydrating_fluid_1782403531019.jpg',
    rating: 4.9,
    reviewsCount: 342,
    colorHex: '#E2B276'
  },
  {
    id: 'matte-mineral',
    name: 'Amira Matte Mineral Shield',
    subtitle: 'SPF 30 • PA+++ • Zinc Oxide & Green Tea',
    spf: 30,
    pa: 'PA+++',
    type: 'mineral',
    finish: 'Velvet/Matte',
    skinType: ['Oily', 'Sensitive', 'Combination'],
    description: 'A 100% physical mineral sunscreen that delivers complete broad-spectrum protection with a velvety-soft, oil-controlling matte finish.',
    longDescription: 'Amira Matte Mineral Shield is the gold standard for sensitive and shine-prone skin. Utilizing micronized non-nano Zinc Oxide, it reflects harmful solar radiation away from the skin surface. This physical shield is supercharged with high-grade antioxidant green tea extract and silica spheres to absorb excess sebum, ensuring a beautifully refined velvet texture that smooths pores and primes skin flawlessly for makeup.',
    keyBenefits: [
      '100% physical mineral shield (Non-Nano Zinc Oxide)',
      'Instantly controls shine and blurs pores with a velvety matte finish',
      'Fragrance-free and hypoallergenic for highly reactive skin',
      'Regulates sebum production and prevents heat-induced redness'
    ],
    ingredients: ['Zinc Oxide', 'Green Tea Extract', 'Niacinamide', 'Vitamin E'],
    texture: 'Velvet-Touch Lotion',
    textureDescription: 'A whipped, soft lotion that spreads effortlessly and dries to a weightless, non-sticky matte layer.',
    usage: 'Apply a nickel-sized amount onto face and neck. Gently press and blend outward. Ideal as an oil-controlling makeup primer.',
    volume: '40ml / 1.4 fl. oz',
    image: '/src/assets/images/amira_matte_mineral_1782403545902.jpg',
    rating: 4.8,
    reviewsCount: 198,
    colorHex: '#CE8D64'
  },
  {
    id: 'active-gel',
    name: 'Amira Invisible Active Gel',
    subtitle: 'SPF 50+ • PA++++ • 80-Min Sweat & Water Resistant',
    spf: 50,
    pa: 'PA++++',
    type: 'chemical',
    finish: 'Totally Invisible',
    skinType: ['Oily', 'Dry', 'Combination'],
    description: 'An advanced, completely clear sunscreen gel designed for high-intensity activity, water sports, and active daily sun defense.',
    longDescription: 'Amira Invisible Active Gel is engineered for performance. Completely transparent, this state-of-the-art gel leaves zero white cast, even on the deepest skin tones. Formulated to be water and sweat-resistant for up to 80 minutes, it creates a flexible, breathable, non-slippery matrix on the skin. Supercharged with robust antioxidants and hydration boosters to neutralize free radical damage from high outdoor exposure.',
    keyBenefits: [
      '100% clear formulation - guaranteed zero white cast',
      '80-minute certified sweat and water resistance',
      'Breathable, non-slip, non-stinging formulation ideal for eyes and sport',
      'Infused with Vitamin E and Aloe to defend against salt/chlorine drying'
    ],
    ingredients: ['Avobenzone', 'Vitamin E', 'Hyaluronic Acid', 'Aloe Leaf Extract'],
    texture: 'Weightless Clear Gel',
    textureDescription: 'A cooling, crystal-clear gel that glides on like air and leaves a completely imperceptible, bare-skin finish.',
    usage: 'Apply generously to dry skin 15 minutes before swimming or exercising. Reapply after 80 minutes of swimming or sweating, or immediately after towel drying.',
    volume: '60ml / 2.0 fl. oz',
    image: '/src/assets/images/amira_active_gel_1782403562071.jpg',
    rating: 4.7,
    reviewsCount: 265,
    colorHex: '#4C7A8C'
  }
];

export const ingredients: Ingredient[] = [
  {
    id: 'Zinc Oxide',
    name: 'Zinc Oxide (Non-Nano)',
    category: 'UV Filter',
    benefit: 'Physical Block & Soothing',
    description: 'A natural mineral filter that sits on top of the skin, reflecting both UVA and UVB rays away like a mirror. Known for its powerful anti-inflammatory and soothing properties for acne and rosacea.',
    icon: 'Shield',
    synergyWith: ['Green Tea Extract', 'Vitamin E']
  },
  {
    id: 'Hyaluronic Acid',
    name: 'Double-Molecular Hyaluronic Acid',
    category: 'Hydration',
    benefit: 'Intense Plumping & Moisture Retention',
    description: 'Draws moisture from the air deep into the skin layers, preventing dry-out caused by solar heat and wind. Leaves skin bouncy and smooth while maintaining barrier strength.',
    icon: 'Droplet',
    synergyWith: ['Centella Asiatica']
  },
  {
    id: 'Centella Asiatica',
    name: 'Fermented Centella Asiatica (Cica)',
    category: 'Soothing',
    benefit: 'Instant Calming & Skin Barrier Repair',
    description: 'A legendary botanical extract that calms UV-induced redness and thermal irritation. Speeds up cell renewal and keeps the skin barrier resilient under active sun exposure.',
    icon: 'Sparkles',
    synergyWith: ['Hyaluronic Acid', 'Niacinamide']
  },
  {
    id: 'Niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    category: 'Antioxidant',
    benefit: 'Dark Spot Prevention & Pore Refining',
    description: 'Blocks melanin transfer to prevent UV-induced dark spots and hyperpigmentation. Regulates sebum production, strengthens the skin barrier, and keeps pores tight.',
    icon: 'Layers',
    synergyWith: ['Centella Asiatica', 'Green Tea Extract']
  },
  {
    id: 'Green Tea Extract',
    name: 'Organic Green Tea Extract',
    category: 'Antioxidant',
    benefit: 'Free-Radical Scavenging & Oil Control',
    description: 'Packed with epigallocatechin gallate (EGCG), a potent antioxidant that neutralizes free radicals created by UV rays. Delivers matte sebum-regulation for oily skin types.',
    icon: 'Leaf',
    synergyWith: ['Zinc Oxide', 'Niacinamide']
  },
  {
    id: 'Vitamin E',
    name: 'Vitamin E (Tocopherol)',
    category: 'Antioxidant',
    benefit: 'UV Photoprotection & Nourishment',
    description: 'A lipid-soluble antioxidant that shields skin cells from oxidative stress and lipid peroxidation. Synergizes perfectly with physical filters to boost solar defense.',
    icon: 'Sun',
    synergyWith: ['Zinc Oxide', 'Avobenzone']
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How would you describe your current skin type?',
    category: 'skinType',
    options: [
      {
        label: 'Dry / Dehydrated',
        description: 'Feels tight, flakey, or needs rich moisture throughout the day.',
        value: 'Dry',
        icon: 'Droplets'
      },
      {
        label: 'Oily / Acne-Prone',
        description: 'Shiny, has visible pores, and experiences frequent breakouts.',
        value: 'Oily',
        icon: 'Flame'
      },
      {
        label: 'Highly Sensitive',
        description: 'Turns red easily, stings when applying products, or is reactive.',
        value: 'Sensitive',
        icon: 'HeartPulse'
      },
      {
        label: 'Combination / Normal',
        description: 'Shiny in the T-zone, dry on the cheeks, relatively balanced.',
        value: 'Combination',
        icon: 'Scale'
      }
    ]
  },
  {
    id: 2,
    question: 'What is your primary activity level when wearing sunscreen?',
    category: 'activity',
    options: [
      {
        label: 'Daily Office / Commute',
        description: 'Mostly indoors, brief outdoor walking, screen blue light exposure.',
        value: 'Daily Commute',
        icon: 'Laptop'
      },
      {
        label: 'Outdoor Sports / Active',
        description: 'Running, cycling, high perspiration, needs reliable grip.',
        value: 'Outdoor Sports',
        icon: 'Bike'
      },
      {
        label: 'Beach, Swimming & Travel',
        description: 'Intense direct sun, water contact, needs maximum resistance.',
        value: 'Beach/Swimming',
        icon: 'Waves'
      }
    ]
  },
  {
    id: 3,
    question: 'What is your preferred aesthetic skin finish?',
    category: 'finish',
    options: [
      {
        label: 'Glass-Skin Dewy Glow',
        description: 'Luminous, plump, hydrated finish that catches the light.',
        value: 'Dewy/Glow',
        icon: 'Sparkles'
      },
      {
        label: 'Velvety Soft Matte',
        description: 'Powder-smooth, blurred pore effect, absolute shine control.',
        value: 'Velvet/Matte',
        icon: 'Fingerprint'
      },
      {
        label: 'Totally Bare & Invisible',
        description: 'Feels like water, 100% translucent, absolutely weightless.',
        value: 'Totally Invisible',
        icon: 'EyeOff'
      }
    ]
  }
];
