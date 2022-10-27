# lebonson, Graduation projet FullStack Node API + React/TS

## Testing this project with localhost

  1) Clone this repository and run `npm install` in the root of te project
  2) Create `.env` file in the root of the folder with the following variables with your informations:

    - PORT=5000
    - NODE_ENV=development
    - JWT_SECRET=YOUR_JWT_SECRET
    - MY_EMAIL=YOUR_OUTLOOK_EMAIL
    - MY_PASSWORD=YOUR_OUTLOOK_GENERATED_PASSWORD
    - STRIPE_PRIVATE_KEY=YOUR_TESTING_STRIPE_PRIVATE_KEY

  3) Create the database name `lebonson` and import all tables in the `sql/lebonson` folder in the `backend` folder into your database
  4) Go to the `frontend` folder and run `npm install`
  5) Find the `config.ts` file in the `frontend` folder in `src` folder and switch all `API URLS` that have been commented to `localhost` http
  6) Run `npm run dev` to start testing the project.

  ** Note: By default, to test `stripe payment`, enter these credit card fake informations, see photo below :
     
  ![alt text](https://github.com/btkdevkh/lebonson/blob/main/frontend/src/assets/img/stripe-testing-en.png?raw=true)
