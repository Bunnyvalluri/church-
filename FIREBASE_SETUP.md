# Firebase Authentication Setup

To make the Login page work, you need to set up Firebase in your project.

## Step 1: Create a Firebase Project
1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** and follow the steps (name it "Church App").
3.  Once created, click the **Web icon (</>)** to register your app.
4.  Copy the `firebaseConfig` object values.

## Step 2: Add Keys to `.env.local`
Open your `.env.local` file and add these variables (replace with your copied values):

```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
```

## Step 3: Enable Authentication Providers
1.  In Firebase Console, go to **Build** -> **Authentication**.
2.  Click **"Get Started"**.
3.  Go to the **Sign-in method** tab.
4.  Enable **Email/Password**.
5.  Enable **Google**.
    - For Google, you usually don't need extra setup for localhost.
    - For production (`verified.app`), add your domain to "Authorized domains" in Firebase settings.

## Step 4: Add Real Users
You can now go to `/register` (if implemented) or manually add users in the Firebase Console "Users" tab to test logging in.
