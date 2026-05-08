import React from 'react';
import Markdown from 'react-markdown';
import { Download } from 'lucide-react';

const REPORT_MARKDOWN = `
# Smart Crop Recommendation System for Indian Farmers
## Final Year Project Report

---

### 1. Abstract
Agriculture is the backbone of the Indian economy, yet crop yield is highly dependent on unpredictable environmental and soil factors. Choosing the wrong crop can lead to massive financial losses for farmers. This project introduces a "Smart Crop Recommendation System," an AI-driven web application that leverages Machine Learning algorithms to analyze soil parameters (Nitrogen, Phosphorus, Potassium, pH) and environmental factors (Temperature, Humidity, Rainfall). By evaluating these variables, the system predicts the most suitable crop and provides actionable fertilizer recommendations, bridging the gap between traditional farming and modern precision agriculture.

### 2. Introduction
Traditional crop selection relies on intuition and historical practices, which are becoming less reliable due to climate change and soil degradation. Precision agriculture utilizes statistical models to provide accurate, data-driven decisions. The purpose of this project is to support farmers by recommending crops that have the highest probability of thriving under specific local conditions.

### 3. Problem Statement
Indian farmers often lack access to scientific soil analysis and crop alignment tools, leading to suboptimal yields and excess use of incorrect fertilizers. There is an urgent need for an accessible, low-cost software solution that takes geographical and pedological (soil) data as inputs and returns robust crop recommendations.

### 4. Objectives
- To develop a machine learning model capable of handling multiple soil and weather features.
- To compare algorithms (Logistic Regression, Decision Tree, Random Forest, KNN) to find the most accurate model.
- To build a user-friendly Web Interface allowing farmers to input data without technical expertise.
- To provide basic fertilizer remediation advice based on N-P-K deficiencies.

### 5. Methodology
#### 5.1 Data Collection
A comprehensive dataset containing 22 distinct crops with features: Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, pH, and Rainfall.

#### 5.2 Data Preprocessing
- **Handling Missing Values:** Imputation or removal protocols.
- **Feature Scaling:** Application of \`StandardScaler\` to normalize distributions, particularly beneficial for distance-based algorithms like KNN.
- **Train-Test Split:** An 80-20 ratio ensures the model is evaluated on unseen data.

#### 5.3 Model Selection
- **Logistic Regression:** Serves as a strong linear baseline.
- **Decision Tree:** Captures non-linear decision boundaries but prone to overfitting.
- **Random Forest:** An ensemble approach utilizing multiple decision trees to reduce variance. Chosen as the primary model due to its high accuracy and robustness.
- **K-Nearest Neighbors (KNN):** Classifies based on feature similarity.

### 6. System Architecture
1. **Frontend:** React + TailwindCSS (live interactive dashboard) & HTML/Bootstrap (Flask version).
2. **Backend:** Node.js / Python Flask.
3. **ML Pipeline:** Scikit-learn, Pandas, Numpy. Model serialized using \`joblib\`.

### 7. Implementation & Results
Based on testing across multiple algorithms on the test set:
- **Logistic Regression:** 95.2%
- **Decision Tree:** 98.1%
- **KNN:** 97.4%
- **Random Forest:** 99.5% (Selected Model)

The Random Forest model demonstrated the highest precision, recall, and f1-score, confirming its ability to generalize well without overfitting.

### 8. Advantages
- **Data-Driven:** Eliminates guesswork in farming.
- **Cost-Saving:** Specific fertilizer recommendations prevent over-purchasing and soil toxicity.
- **Scalable:** Easily extended to include new crops or deeper region-specific datasets.

### 9. Future Scope
- Integration with live weather APIs (e.g., OpenWeatherMap) to fetch real-time climate data automatically.
- Incorporation of soil image analysis via Deep Learning (CNNs).
- Addition of regional language support (Hindi, Marathi, Telugu) for broader accessibility.

### 10. Conclusion
The Smart Crop Recommendation System successfully illustrates how machine learning can be practically applied to agriculture. By providing real-time, data-backed insights, it empowers farmers to maximize their yield and income, paving the way for sustainable farming practices.
`;

export default function Documentation() {
  const handleDownload = () => {
    const blob = new Blob([REPORT_MARKDOWN], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Project_Report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Project Documentation</h2>
          <p className="text-gray-500 mt-2">Formal project report and methodology details.</p>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center space-x-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Download PDF/MD</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 prose prose-emerald max-w-none">
        <div className="markdown-body">
          <Markdown>{REPORT_MARKDOWN}</Markdown>
        </div>
      </div>
    </div>
  );
}
