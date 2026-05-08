import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.predict': 'Predict',
    'nav.train': 'Train Model',
    'nav.dashboard': 'Dashboard',
    'nav.report': 'Report',
    
    'home.title': 'Smart Crop Recommendation System',
    'home.subtitle': 'Empowering Indian farmers with Machine Learning. Input your soil and environment data to discover the most profitable crop to plant.',
    'home.startBtn': 'Start Prediction',
    'home.howItWorks': 'How It Works',
    'home.step1.title': '1. Enter Soil Data',
    'home.step1.desc': 'Provide Nitrogen (N), Phosphorus (P), Potassium (K), and pH levels based on your soil test results.',
    'home.step2.title': '2. Add Environment',
    'home.step2.desc': 'Input average temperature, humidity percentages, and expected rainfall for your specific region.',
    'home.step3.title': '3. AI Analysis',
    'home.step3.desc': 'Our trained Random Forest ML model analyzes the parameters and recommends the best crops with high confidence.',

    'predict.title': 'Crop Prediction Form',
    'predict.subtitle': 'Enter the properties of your soil and weather context.',
    'predict.params': 'Agronomic Parameters',
    'predict.getWeather': 'Get Weather',
    'predict.loadSample': 'Load Sample Data',
    'predict.n': 'Nitrogen (N)',
    'predict.p': 'Phosphorus (P)',
    'predict.k': 'Potassium (K)',
    'predict.temp': 'Temperature',
    'predict.humidity': 'Humidity (%)',
    'predict.ph': 'pH Level',
    'predict.rainfall': 'Rainfall',
    'predict.button': 'Predict Best Crop',
    'predict.analyzing': 'Analyzing Data...',
    'predict.resultsTitle': 'Prediction Results',
    'predict.highlyRecommended': 'Highly Recommended Crop',
    'predict.confidence': 'Confidence',
    'predict.alternatives': 'Other suitable alternatives:',
    'predict.fertilizer': 'Fertilizer & Care Guide',
    'predict.regional': 'Regional Varieties for',
    'predict.history': 'Recent Soil Inputs',
    'predict.cultivation': 'Cultivation Tips',
    'predict.sensor': 'Read Soil Sensor',
    'predict.cropDetails': 'Crop Details',
    'predict.climate': 'Climate Requirements',
    'predict.soil': 'Soil Requirements',
    'predict.pests': 'Common Pests & Diseases',

    'hist.load': 'Load',

    'dash.title': 'Analytics Dashboard',
    'dash.subtitle': 'Visualizing Machine Learning performance and crop patterns.',
    'dash.modelPerf': 'Model Performance Comparison',
    'dash.nutritional': 'Nutritional Needs by Crop Type',
    'dash.yield': 'Historical Crop Yield Trends (Tonnes/Hectare)',
    'dash.humidity': 'Historical Humidity Trends (%)',
    'dash.rainfall': 'Historical Rainfall Patterns (mm)',
    'dash.ph': 'Soil pH Distribution',

    'train.title': 'Model Training Studio',
    'train.subtitle': 'Upload datasets and train custom ML models for crop recommendation.',
    'train.data': '1. Dataset',
    'train.click': 'Click to upload CSV',
    'train.format': 'Format: N, P, K, Temp...',
    'train.algo': '2. Algorithms',
    'train.start': 'Start Training',
    'train.processing': 'Processing...',
    'train.configure': 'Configure settings and start training to see progress here.',
    'train.pipeline': 'Training Pipeline',
    'train.pre': 'Preprocessing Data...',
    'train.train': 'Model Training...',

    'doc.title': 'Project Documentation',
    'doc.subtitle': 'Formal project report and methodology details.',
    'doc.download': 'Download PDF/MD',

    // Crop names
    'crop.rice': 'Rice',
    'crop.maize': 'Maize',
    'crop.jute': 'Jute',
    'crop.cotton': 'Cotton',
    'crop.coconut': 'Coconut',
    'crop.papaya': 'Papaya',
    'crop.orange': 'Orange',
    'crop.apple': 'Apple',
    'crop.muskmelon': 'Muskmelon',
    'crop.watermelon': 'Watermelon',
    'crop.grapes': 'Grapes',
    'crop.mango': 'Mango',
    'crop.banana': 'Banana',
    'crop.pomegranate': 'Pomegranate',
    'crop.lentil': 'Lentil',
    'crop.blackgram': 'Blackgram',
    'crop.mungbean': 'Mungbean',
    'crop.mothbeans': 'Mothbeans',
    'crop.pigeonpeas': 'Pigeonpeas',
    'crop.kidneybeans': 'Kidneybeans',
    'crop.chickpea': 'Chickpea',
    'crop.coffee': 'Coffee',
    'crop.sugarcane': 'Sugarcane',
    'crop.tea': 'Tea',
    'crop.groundnut': 'Groundnut',
    'crop.mustard': 'Mustard',
    'crop.soybean': 'Soybean'
  },
  hi: {
    'nav.home': 'होम',
    'nav.predict': 'भविष्यवाणी',
    'nav.train': 'ट्रेन मॉडल',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.report': 'रिपोर्ट',
    
    'home.title': 'स्मार्ट फसल सिफारिश प्रणाली',
    'home.subtitle': 'मशीन लर्निंग के साथ भारतीय किसानों को सशक्त बनाना। अपनी मिट्टी और पर्यावरण डेटा दर्ज करें और सबसे अधिक लाभदायक फसल खोजें।',
    'home.startBtn': 'भविष्यवाणी शुरू करें',
    'home.howItWorks': 'यह कैसे काम करता है',
    'home.step1.title': '1. मिट्टी डेटा दर्ज करें',
    'home.step1.desc': 'अपनी मिट्टी परीक्षण परिणामों के आधार पर नाइट्रोजन (N), फास्फोरस (P), पोटेशियम (K), और pH स्तर प्रदान करें।',
    'home.step2.title': '2. पर्यावरण जोड़ें',
    'home.step2.desc': 'अपने विशिष्ट क्षेत्र के लिए औसत तापमान, आर्द्रता प्रतिशत, और अपेक्षित वर्षा इनपुट करें।',
    'home.step3.title': '3. AI विश्लेषण',
    'home.step3.desc': 'हमारा प्रशिक्षित रैंडम फॉरेस्ट ML मॉडल मापदंडों का विश्लेषण करता है और उच्च आत्मविश्वास के साथ सर्वोत्तम फसलों की सिफारिश करता है।',

    'predict.title': 'फसल की भविष्यवाणी फॉर्म',
    'predict.subtitle': 'अपनी मिट्टी और मौसम के संदर्भ के गुण दर्ज करें।',
    'predict.params': 'कृषि मापदंड',
    'predict.getWeather': 'मौसम जांचें',
    'predict.loadSample': 'नमूना डेटा लोड करें',
    'predict.n': 'नाइट्रोजन (N)',
    'predict.p': 'फास्फोरस (P)',
    'predict.k': 'पोटेशियम (K)',
    'predict.temp': 'तापमान',
    'predict.humidity': 'नमी (%)',
    'predict.ph': 'पीएच (pH) स्तर',
    'predict.rainfall': 'वर्षा',
    'predict.button': 'सर्वश्रेष्ठ फसल की भविष्यवाणी करें',
    'predict.analyzing': 'डेटा का विश्लेषण किया जा रहा है...',
    'predict.resultsTitle': 'परिणाम',
    'predict.highlyRecommended': 'अत्यधिक अनुशंसित फसल',
    'predict.confidence': 'आत्मविश्वास (Confidence)',
    'predict.alternatives': 'अन्य उपयुक्त विकल्प:',
    'predict.fertilizer': 'उर्वरक और देखभाल गाइड',
    'predict.regional': 'के लिए क्षेत्रीय किस्में',
    'predict.history': 'हाल के मिट्टी इनपुट',
    'predict.cultivation': 'खेती के सुझाव',
    'predict.sensor': 'मिट्टी सेंसर पढ़ें',
    'predict.cropDetails': 'फसल विवरण',
    'predict.climate': 'जलवायु आवश्यकताएँ',
    'predict.soil': 'मिट्टी की आवश्यकताएँ',
    'predict.pests': 'सामान्य कीट और रोग',

    'hist.load': 'लोड करें',

    'dash.title': 'एनालिटिक्स डैशबोर्ड',
    'dash.subtitle': 'मशीन लर्निंग प्रदर्शन और फसल पैटर्न की कल्पना करना।',
    'dash.modelPerf': 'मॉडल प्रदर्शन की तुलना',
    'dash.nutritional': 'फसल के प्रकार द्वारा पोषण मूल्य',
    'dash.yield': 'ऐतिहासिक फसल उपज रुझान (टन/हेक्टेयर)',
    'dash.humidity': 'ऐतिहासिक आर्द्रता रुझान (%)',
    'dash.rainfall': 'ऐतिहासिक वर्षा पैटर्न (मिमी)',
    'dash.ph': 'मिट्टी पीएच (pH) वितरण',

    'train.title': 'मॉडल प्रशिक्षण स्टूडियो',
    'train.subtitle': 'फसल की सिफारिश के लिए डेटासेट अपलोड करें और कस्टम ML मॉडल को प्रशिक्षित करें।',
    'train.data': '1. डेटासेट',
    'train.click': 'CSV अपलोड करने के लिए क्लिक करें',
    'train.format': 'प्रारूप: N, P, K, Temp...',
    'train.algo': '2. एल्गोरिदम',
    'train.start': 'प्रशिक्षण शुरू करें',
    'train.processing': 'प्रोसेसिंग...',
    'train.configure': 'प्रगति देखने के लिए सेटिंग्स कॉन्फ़िगर करें और प्रशिक्षण शुरू करें।',
    'train.pipeline': 'प्रशिक्षण पाइपलाइन',
    'train.pre': 'डेटा प्रीप्रोसेसिंग...',
    'train.train': 'मॉडल प्रशिक्षण...',

    'doc.title': 'परियोजना दस्तावेज़ीकरण',
    'doc.subtitle': 'औपचारिक परियोजना रिपोर्ट और कार्यप्रणाली विवरण।',
    'doc.download': 'PDF/MD डाउनलोड करें',

    'crop.rice': 'चावल',
    'crop.maize': 'मक्का',
    'crop.jute': 'जूट',
    'crop.cotton': 'कपास',
    'crop.coconut': 'नारियल',
    'crop.papaya': 'पपीता',
    'crop.orange': 'संतरा',
    'crop.apple': 'सेब',
    'crop.muskmelon': 'खरबूजा',
    'crop.watermelon': 'तरबूज',
    'crop.grapes': 'अंगूर',
    'crop.mango': 'आम',
    'crop.banana': 'केला',
    'crop.pomegranate': 'अनार',
    'crop.lentil': 'मसूर',
    'crop.blackgram': 'उड़द',
    'crop.mungbean': 'मूंग',
    'crop.mothbeans': 'मोठ',
    'crop.pigeonpeas': 'अरहर',
    'crop.kidneybeans': 'राजमा',
    'crop.chickpea': 'चना',
    'crop.coffee': 'कॉफी',
    'crop.sugarcane': 'गन्ना',
    'crop.tea': 'चाय',
    'crop.groundnut': 'मूंगफली',
    'crop.mustard': 'सरसों',
    'crop.soybean': 'सोयाबीन'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string) => {
    return translations[lang]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
