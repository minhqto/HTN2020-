# Omakase - Helping not-so-tech-savvy chefs cook up savoury digital content!

## Installation

- Step 1: Clone the repo
- Step 2: Go to the repo folder

  ```
  npm install
  ```

- Step 3: Create an `.env.development` file at the root of the project with env variables to connect with Firebase.
  ```.env
  REACT_APP_API_KEY=
  REACT_APP_AUTH_DOMAIN=
  REACT_APP_PROJECT_ID=
  REACT_APP_STORAGE_BUCKET=
  REACT_APP_MESSAGING_SENDER_ID=
  REACT_APP_APP_ID=
  REACT_APP_MEASUREMENT_ID=
  ```
- Step 4: Run the project in development mode
  ```
  npm run start
  ```

## Project structure

- `src/App.js`: entry point of the app, contains routing configuration to show a screen based on request route.
- `src/context`: store the global state of the app
- `src/pages`: store all the screens of the app
- `src/pages/comonents`: store all the components that build up screens.
- `src/fire.js`: Firebase configuration to connect to Firebase.
