
---

## ⚙️ How to Run Locally

Follow these steps to run **ShareBite** on your local machine:

```bash
# 1. Clone the repo
git clone https://github.com/your-username/sharebite.git

# 2. Navigate into the project folder
cd sharebite

# 3. Install dependencies
npm install

# 4. Add Firebase config in .env file
REACT_APP_apiKey=your_firebase_api_key
REACT_APP_authDomain=your_auth_domain
REACT_APP_projectId=your_project_id
REACT_APP_storageBucket=your_storage_bucket
REACT_APP_messagingSenderId=your_sender_id
REACT_APP_appId=your_app_id

# 5. Run the development server
npm start
