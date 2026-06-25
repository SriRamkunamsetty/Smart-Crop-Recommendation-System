# Smart Crop Recommendation - Python Backend

This folder contains the actual Machine Learning implementation and Flask backend for the application, exactly as required for the college submission.

## File Structure
- \`src/train.py\`: The Jupyter notebook equivalent script to train the model, perform EDA, and evaluate metrics.
- \`app.py\`: The Flask server that serves the frontend and handles prediction requests.
- \`requirements.txt\`: Python dependencies.

## Installation & Setup

1. **Install Python:** Ensure you have Python 3.8+ installed on your computer.
2. **Open Terminal/Command Prompt:** Navigate to this \`machine_learning\` directory.
3. **Install Dependencies:**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`
4. **Train the Model:**
   \`\`\`bash
   python src/train.py
   \`\`\`
   This will run the Exploratory Data Analysis, compare Logistic Regression, Decision Tree, KNN, and Random Forest, and generate \`model/crop_model.pkl\` and \`model/scaler.pkl\`.
5. **Run the Server:**
   \`\`\`bash
   python app.py
   \`\`\`
6. **Open in Browser:** Go to \`http://localhost:5000\`

## Deployment Options (Render / Railway / Vercel)

### Render / Railway (Recommended for Flask)
1. Push this directory to a GitHub repository.
2. Create an account on [Render.com](https://render.com) or [Railway.app](https://railway.app).
3. Create a new "Web Service" and link your GitHub repo.
4. Set the Build Command to \`pip install -r requirements.txt\`.
5. Set the Start Command to \`gunicorn app:app\` (make sure to add \`gunicorn\` to requirements.txt).

### Vercel (Requires Next.js / Serverless adaptation)
*Note: Vercel is best suited for the Node.js/React frontend included in the root directory. To deploy Flask on Vercel, you need a \`vercel.json\` configuration.*
