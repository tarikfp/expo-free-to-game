# 🎮 React Native Free to Game App


This React Native Expo app displays a list of free-to-play games sourced from an API. The main screen features a fixed header with filtering and sorting options, allowing the user to narrow down the list according to platform, category, and popularity.


## 📚 Table of contents 

*  [💻 Running locally](#-running-locally)
*  [🪄 Running extra solution](#-running-extra-solution)
*  [📦 Core packages](#-core-packages)
*  [🛠️ Code linters](#-code-linters)




## 💻 Running locally
This project is built with [Expo](https://expo.dev/). Follow the instructions below in order to run the project locally.

- #### Install dependencies

```bash
  yarn install
  ```

- #### [Start the development server](https://docs.expo.dev/get-started/create-a-new-app/#starting-the-development-server)

```bash
 npx expo start
```

- #### If you are using a simulator or emulator, you may find the following Expo CLI keyboard shortcuts to be useful to open the app on any of the following platforms:

  - Pressing a will open in an Android Emulator or connected device.
  - Pressing i will open in an iOS Simulator.
  - Pressing w will open in a web browser. Expo supports all major browsers.

- #### [Opening the app on your phone/tablet](https://docs.expo.dev/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet)

  To open the app:

  - On your Android device, press "Scan QR Code" on the "Home" tab of the Expo Go app and scan the QR code you see in the terminal.
  - On your iPhone or iPad, open the default Apple "Camera" app and scan the QR code you see in the terminal.

⚠ Please refer to [official expo docs](https://docs.expo.dev/get-started/installation/) or contact me at [tarikdotcom@gmail.com](mailto:tarikdotcom@gmail.com) if you encounter any issues running the project.

## 🪄 Running extra solution
Extra solution has been added to this repository in a file named `extra-problem-solution.js`. To run this solution:

- Go the project root directory.
- Run the following command.
```bash
 node extra-problem-solution.js
```


## 📦 Core packages

- @react-navigation v6
- react-native-reanimated
- @shopify/flash-list

## 🛠️ Code linters

- React native, typescript specific robust [eslint](https://eslint.org/) configurations to enhance development experience.
    - Some of eslint configurations are the followings:
        - [Airbnb eslint](https://www.npmjs.com/package/eslint-config-airbnb)
        - [Airbnb typescript eslint](https://www.npmjs.com/package/eslint-config-airbnb-typescript)
        - [Eslint plugin react hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
        - [Eslint plugin react native](https://github.com/intellicode/eslint-plugin-react-native)
        and more... 💫
