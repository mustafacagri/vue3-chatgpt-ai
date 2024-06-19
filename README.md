# 🌟 Vue ChatGPT AI

✨ Powered by Modern Technologies

- **Vue 3**: The versatile powerhouse that makes building dynamic user interfaces a breeze.
- **Vuetify 3**: Elevate your design with the elegance of Material Design, right at your fingertips.
- **Pinia**: Your go-to state management solution, as easy as pie, and just as satisfying.
- **Vite**: Lightning-fast build tool that ensures your development experience is as smooth as silk.
- **Firebase**: Real-time magic for your database and storage needs, ensuring your data is always in sync.
- **OpenAI**: The brains behind the operation, bringing sophisticated AI chat capabilities to your app.

This project harnesses these cutting-edge technologies to deliver a seamless and responsive chat interface, enriched with AI-driven interactions. Enjoy the power of real-time data, sleek design, and intelligent conversation in one cohesive package.



https://github.com/mustafacagri/vue3-chatgpt-ai/assets/7488394/8d46056f-8746-4fb4-adb7-9ae181830f5c



## 🚀 Features

1. **Real-time AI Chat**

   - **OpenAI Integration**: Leverage the power of OpenAI's ChatGPT for intelligent and dynamic conversations.
   - **Seamless Interaction**: Chat with the AI in real-time, with instant responses and fluid interaction.

2. **Multi-format Support**

   - **Text Messages**: Exchange plain text messages effortlessly.
   - **Image Support**: Send and receive images directly in the chat.
   - **Audio Messages**: Record and share audio clips with ease.

3. **Persistent Chat History**

   - **Local Storage**: Messages are saved locally, ensuring chat history is retained even after the page refreshes.
   - **Firebase Realtime Database**: Store messages in the cloud for access across multiple devices.

4. **User-friendly Interface**

   - **Vuetify 3**: Aesthetic and intuitive design with Material Design components.
   - **Responsive Layout**: Optimized for both desktop and mobile devices.

5. **State Management**

   - **Pinia**: Simplified and intuitive state management for maintaining the chat application state.

6. **Efficient Development Workflow**

   - **Vite**: Fast build tool for an efficient development experience.
   - **Modular Code Structure**: Clean and maintainable codebase with Vue 3's Composition API.

7. **Security and Scalability**

   - **Firebase Authentication**: Secure user authentication to protect chat data.
   - **Scalable Infrastructure**: Firebase backend ensures scalability and reliability as the user base grows.

8. **File Management**
   - **Firebase Storage**: Store and manage images and audio files securely in the cloud.

## 🛠️ Setup Instructions

### Cloning and Running Locally

To get started, clone the repository and run the development server:

```bash
git clone https://github.com/your/repository.git
cd repository-name
yarn install
yarn dev
```

The application will be running at http://localhost:5017/.

### 🔥 Firebase Integration

To fully utilize Firebase features:

1. **Create a Firebase Project:**

   - Navigate to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. **Enable Firebase Services:**

   - In your Firebase project settings, enable Firebase Storage to store files like images and audio.

3. **Obtain Firebase Configuration:**
   - Go to your Firebase project settings and find the Firebase SDK snippet. You'll need to copy the configuration details including:
     - `apiKey`
     - `authDomain`
     - `databaseURL`
     - `projectId`
     - `storageBucket`
     - `messagingSenderId`
     - `appId`
4. **Add Firebase Configuration to `.env` File:**
   - Create a `.env` file in the root directory of your project if it doesn't exist.
   - Add your Firebase configuration details to the `.env` file using the following format:
     ```env
     VITE_FIREBASE_API_KEY=your-firebase-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_DATABASE_URL=your-database-url
     VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-firebase-app-id
     ```

### 🗄️ Local Storage

Messages are stored in local storage using the `useStorage` hook from `@vueuse/core`. This ensures that chat history persists even when the page is refreshed.

### 🤖 How to Obtain OpenAI API Key

1. **Sign up for OpenAI API:**

   - Go to the [OpenAI website](https://www.openai.com/) and sign up for an account.

2. **Generate API Key:**

   - After signing in, navigate to your account settings or API section to generate a new API key specifically for ChatGPT.
   - Copy the generated API key.

3. **Add OpenAI API Key to `.env` File:**
   - Open or create the `.env` file in your project directory.
   - Add your OpenAI API key to the `.env` file using the following format:
     ```env
     VITE_OPENAI_API_KEY=your-openai-api-key
     ```

## How can I support? 🌟

- ⭐ Star my GitHub repo
- 🛠 Create pull requests, submit bugs, suggest new features or updates
