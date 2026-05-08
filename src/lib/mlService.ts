/**
 * Client-side simulation of the Crop Recommendation ML Model.
 * This simulates a decision tree / heuristic approach based on the Kaggle Crop Recommendation Dataset.
 */

const CROPS = [
  'rice', 'maize', 'jute', 'cotton', 'coconut', 'papaya', 'orange',
  'apple', 'muskmelon', 'watermelon', 'grapes', 'mango', 'banana',
  'pomegranate', 'lentil', 'blackgram', 'mungbean', 'mothbeans',
  'pigeonpeas', 'kidneybeans', 'chickpea', 'coffee'
];

const CROP_SPECIFIC_RECOMMENDATIONS: Record<string, string[]> = {
  'rice': [
    'Rice is a water-intensive crop. Maintain field water level at 5cm during early vegetative stages.',
    'Apply Zinc Sulphate (25 kg/ha) mixed with sand to prevent Khaira disease.',
    'Split nitrogen application: 50% at base, 25% at tillering, 25% at panicle initiation.'
  ],
  'cotton': [
    'Apply Boron (0.1%) as foliar spray during flowering to prevent boll shedding.',
    'Ensure proper spacing to allow aeration and prevent pest buildup.',
    'Avoid excessive nitrogen to prevent rampant vegetative growth at the expense of boll formation.'
  ],
  'apple': [
    'Maintain soil pH around 6.5. If acidic, apply agricultural lime well before planting.',
    'Apply Calcium Nitrate sprays (0.5%) to prevent bitter pit disorders in fruit.',
    'Requires a significant chilling period for proper bud break.'
  ],
  'coconut': [
    'Coconut palms require heavy potassium. Apply wood ash or Muriate of Potash regularly.',
    'Magnesium deficiency is common (yellowing of older leaves); apply Magnesium Sulphate.',
    'Ensure proper drainage; waterlogging leads to root rot.'
  ],
  'chickpea': [
    'Seed treatment with Rhizobium culture improves nitrogen fixation.',
    'Avoid heavy irrigation during the flowering stage to prevent flower drop.',
    'Apply 2% urea spray at pod development stage for better yield.'
  ],
  'grapes': [
    'Pruning is critical for yield. Ensure proper trellis management.',
    'Apply Iron Sulphate if interveinal chlorosis (yellowing) appears on young leaves.',
    'Fungal diseases are common; preventive copper-based sprays are recommended.'
  ]
};

export function getPrediction(
  n: number,
  p: number,
  k: number,
  temp: number,
  humidity: number,
  ph: number,
  rainfall: number
) {
  // Simple heuristic logic based on average dataset values to mimic ML prediction
  let topCrop = 'rice';
  let alternatives = ['jute', 'maize'];
  let confidence = 85 + Math.random() * 14; 
  
  if (rainfall > 200 && humidity > 80) {
    topCrop = 'rice';
    alternatives = ['jute', 'coconut'];
  } else if (rainfall < 50 && temp > 30) {
    topCrop = 'mothbeans';
    alternatives = ['mungbean', 'blackgram'];
  } else if (ph < 5.5 && temp < 20) {
    topCrop = 'apple';
    alternatives = ['grapes', 'kidneybeans'];
  } else if (ph > 7.5 && rainfall < 50) {
    topCrop = 'cotton';
    alternatives = ['mothbeans', 'maize'];
  } else if (n > 100 && p > 50 && k > 40) {
    topCrop = 'cotton';
    alternatives = ['maize', 'jute'];
  } else if (k > 100 && temp > 25) {
    topCrop = 'grapes';
    alternatives = ['apple', 'watermelon'];
  } else if (temp > 25 && humidity > 80 && rainfall > 90) {
    topCrop = 'coconut';
    alternatives = ['banana', 'papaya'];
  } else if (n < 50 && p < 50 && k < 50) {
    topCrop = 'lentil';
    alternatives = ['mothbeans', 'mungbean'];
  } else if (humidity < 30) {
    topCrop = 'chickpea';
    alternatives = ['kidneybeans', 'pigeonpeas'];
  }

  // Fertilizer logic based on NPK
  const fertilizers = [];
  if (n < 40) {
    fertilizers.push("Low Nitrogen: Apply Urea or Ammonium Nitrate to encourage vegetative growth.");
  }
  if (p < 40) {
    fertilizers.push("Low Phosphorus: Apply DAP (Diammonium Phosphate) for robust root development.");
  }
  if (k < 40) {
    fertilizers.push("Low Potassium: Apply Muriate of Potash to improve disease resistance and fruit quality.");
  }
  
  if (ph < 5.5) {
    fertilizers.push("Soil is acidic: Consider applying agricultural lime to raise pH to optimal levels.");
  } else if (ph > 8.0) {
    fertilizers.push("Soil is highly alkaline: Incorporate organic matter or agricultural sulfur to lower pH.");
  }
  
  if (fertilizers.length === 0) {
    fertilizers.push("Soil NPK and pH levels are optimal. Standard compost recommended for organic matter maintenance.");
  }

  // Add crop-specific advanced logic if available
  const specificAdvice = CROP_SPECIFIC_RECOMMENDATIONS[topCrop];
  if (specificAdvice) {
    fertilizers.push(...specificAdvice);
  } else {
    fertilizers.push(`Ensure proper irrigation after fertilizing. Monitor ${topCrop} closely for local pests.`);
  }

  return {
    topCrop,
    alternatives,
    confidence: confidence.toFixed(1),
    fertilizers
  };
}
