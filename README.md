# RestaurantFAInder Frontend

This repository contains the source code for the intelligent system RestaurantFAInder.

## Installation

In order to use the app, please also clone this repository containing the source code for our backend located here: https://github.com/FloKit/iui-backend

1. Clone the repository: `git clone git@github.com:FloKit/iui-frontend.git`
2. Change the directory: `cd iui-frontend/native-app`
3. Install all dependencies: `npm install`

## Usage

In order to start the app, you need some extra dependencies, such as emulators and so on.
You can find a tutorial here: https://reactnative.dev/docs/environment-setup
Select your Development OS and the target OS and follow the respective tutorial up to the sub-section `Creating a new application`.
Don't do that.

Instead, if you want to run the app type `npm start` in your terminal.
Open a new tab in the terminal and navigate to the `iui-frontend/native-app`.

For `iOS` (only possible if you are on `MacOS`) you firs need to install the pods. 
Therefore change into the ios directory via `cd ios` and run `pod install`
After the pods were installed you can run `npm run ios` to run the iOS app.

For `Android` type `npm run android`

Also make sure the backend is running!
Open a new tab in your terminal, navigate to `<PATH_TO_BACKEND_REPOSITORY>/backend` and type `python server.py`.

## ⚠️ Disclaimer ⚠️
Unfortunately the geolocation library we are using is not working properly on Android, so here we have to mock the location.
We are using the city center of Munich as default location.

Please also be aware, that the iOS simulator is not using your real coordinates.
You can adjust them under the tab `Features/Location/Custom Location...`
