# Axra Task App

A key feature of this app is its offline-first design. All tasks are saved instantly on the device, meaning the app works perfectly even without an internet connection. 

## Technology Stack
The app is built using modern and powerful tools to ensure a smooth user experience:

* **React Native**: The core framework used to build the mobile app for both Android and iOS using TypeScript.
* **Apollo Client (GraphQL)**: Used for managing data and the app's state. It makes the app feel incredibly fast by updating the screen instantly before the database even finishes saving.
* **react-native-mmkv**: A lightning-fast local storage solution. We use this as our local database to save tasks on the device so they are never lost when the app closes.
* **React Navigation**: Used to handle smooth transitions and routing between different screens in the app.

## How to Run the App

### Prerequisites
Make sure you have installed:
* Node.js
* Android Studio (to run on Android)
* Xcode (to run on iOS on a Mac)

### 1. Installation
First, clone the code and install the required packages:
```bash
npm install
```

If you are using a Mac and want to run the app on iOS, you also need to install Pods:
```bash
cd ios && bundle exec pod install && cd ..
```

### 2. Start the App
Start the Metro bundler (the tool that packages the app):
```bash
npm start
```

Open a new terminal window and run the app on your chosen device:
```bash
# To run on Android:
npm run android

# To run on iOS:
npm run ios
```
