# RestaurantFAInder Frontend

Welcome to the RestaurantFAInder Frontend repository! This is the home of the source code for our intelligent system, RestaurantFAInder.

## Installation

To get started, you'll need to clone this repository and set up the backend as well. The backend source code is available at [iui-backend repository](https://github.com/FloKit/iui-backend).

1. **Clone the frontend repository:** `git clone git@github.com:FloKit/iui-frontend.git`
2. **Navigate to the frontend directory:** `cd iui-frontend/native-app`
3. **Install dependencies:** `npm install`

## Usage

To run the app, you'll need additional dependencies like emulators. Refer to the [React Native documentation](https://reactnative.dev/docs/environment-setup) for a comprehensive tutorial. Choose your Development OS and target OS, and follow the tutorial up to the sub-section `Creating a new application` (don't actually create a new application).

Instead of creating a new application, run the following command in your terminal to start the app: `npm start`. Open a new terminal tab and navigate to `iui-frontend/native-app`.

### iOS

For `iOS` (works only on `MacOS`), navigate to the `ios` directory with `cd ios` and run `pod install`. After installing the pods, execute `npm run ios` to run the iOS app.

### Android

For `Android`, run `npm run android`.

Make sure the backend is running! In a new terminal tab, navigate to `<PATH_TO_BACKEND_REPOSITORY>/backend` and run `python server.py`.

## ⚠️ Disclaimer ⚠️

The geolocation library used in this app may not function correctly on Android, requiring location mocking. The default location used is the city center of Munich.

Please note that the iOS simulator does not use real coordinates. You can adjust them under the tab `Features/Location/Custom Location...`.
