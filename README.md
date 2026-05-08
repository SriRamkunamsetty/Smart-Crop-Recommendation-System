# 🌾 AgriSmart AI: Smart Crop Recommendation System

![Hero Image](https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop)

## 📖 Problem Statement
Traditional farming relies heavily on intuition and historical knowledge, which often fails in the face of changing climate conditions, unpredictable weather, and varying soil compositions. Farmers frequently struggle with:
- Suboptimal crop selection leading to reduced yields and financial losses.
- Over-or under-use of fertilizers, causing soil degradation and water cycle pollution.
- Lack of access to real-time, data-driven agricultural insights and modern agronomic data.

## 💡 Our Solution
AgriSmart AI is a machine learning-powered web application designed to empower farmers with actionable intelligence. By analyzing core soil agronomic parameters (Nitrogen, Phosphorus, Potassium, pH) alongside environmental factors (Temperature, Humidity, Rainfall), our system accurately predicts the most profitable and suitable crop for a specific region. 

## 🌍 How Our Solution Helps Society (Impact)
- **Economic Empowerment:** Maximizes agricultural yield and boosts farmers' income by recommending the most optimal crops tailored to their exact soil conditions in their locality.
- **Sustainable Farming:** Reduces excessive fertilizer use by offering targeted nutritional constraints, preventing soil degradation.
- **Food Security:** Promotes reliable food production through data-backed decisions rather than trial and error, increasing overall supply chain stability.
- **Accessibility:** With seamless dual-language support (English and Hindi), the tool is highly accessible to a broader demographic of Indian farmers, bridging the technological divide.

## ✨ Key Features
- **Intelligent Crop Prediction:** Uses machine learning models (simulating Random Forest) to recommend the best crop based on NPK, pH, and climate data.
- **Hardware Integration Simulation:** Includes a mock NPK sensor input that automatically populates the Nitrogen, Phosphorus, and Potassium fields, simulating data directly from a smart IoT soil sensor.
- **Comprehensive Crop Insights:** When a crop is recommended, users can view detailed information in a modal including specific climate requirements, soil needs, and common regional pests and diseases.
- **Multilingual Support:** One-click toggling between English and Hindi for maximum accessibility across India.
- **Interactive Analytics Dashboard:** Visualizes model metrics, crop nutritional needs, historical yield trends, and environmental data (humidity, rainfall, pH distribution) using Recharts.
- **Model Training Studio:** A UI demonstrating how data scientists could upload datasets and train custom ML models.
- **Convertible Units:** Seamless toggling between Celsius/Fahrenheit and millimeters/inches.

![Dashboard Example](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop)

## 🏗️ System Architecture
The application follows a modern client-side architecture focusing on speed and reactivity:
1. **Presentation Layer:** Built with React, Vite, and Tailwind CSS. Features highly responsive and accessible UI components specifically tailored for devices of all sizes.
2. **State & Localization:** React Context API handles stateful internationalization (English/Hindi).
3. **ML Inference Engine:** A client-side deterministic logical model simulates a robust ML classifier, evaluating weighted thresholds to map inputs to more than 25 different crops (including local variations like Sugarcane, Tea, Groundnut, Mustard, and Soybean).
4. **Data Visualization:** Recharts library handles complex multivariate data analysis and time-series charting in the Analytics Dashboard.

## 🔄 System Workflow
1. **Data Input:** The farmer inputs soil macro-nutrients (N, P, K) and pH. They can also use the "Read Soil Sensor" feature to import data automatically.
2. **Context Enrichment:** The user inputs or automatically fetches location-specific weather details (Temperature, Humidity, Rainfall).
3. **Processing:** The input parameters are validated, formatted, and fed into the AI recommendation engine.
4. **Output Generation:** The system determines the highest-probability crop and suggests viable comparative alternatives.
5. **Actionable Guidance:** Detailed fertilizer regimens, cultivation tips, and pest warnings are displayed for the recommended crop. The user can click on any crop name to reveal exact soil, climate, and pest interactions.

## 🚀 Advantages
- **Fast & Lightweight:** Runs entirely in the browser, requiring minimal bandwidth or server overhead, perfect for low-connectivity rural regions.
- **Highly Scalable:** Can easily be connected to an actual Python/Flask REST API backend hosting a massive trained `.pkl` model.
- **User-Centric Design:** Clean, accessible UI with smooth motion animations and intuitive inputs that decrease the learning curve.
- **Educational Value:** Helps farmers understand the delicate relationship between specific nutrient bounds and crop performance.

## 💻 Tech Stack
- **Frontend Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Motion
- **Data Visualization:** Recharts
- **Markdown Rendering:** React Markdown
- **Routing:** React Router DOM

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
