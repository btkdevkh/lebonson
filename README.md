# LEBONSON, Graduation Projet FullStack Node API PostgreSQL + React/TS

## Testing this project with localhost

  1) Clone this repository and run `npm install` in the root of te project
  2) Create `.env` file in the root of the folder with the following variables with your informations:

    - PORT=5000
    - NODE_ENV=development
    - JWT_SECRET=YOUR_JWT_SECRET
    - MY_EMAIL=YOUR_OUTLOOK_EMAIL
    - MY_PASSWORD=YOUR_OUTLOOK_GENERATED_PASSWORD
    - STRIPE_PRIVATE_KEY=YOUR_TESTING_STRIPE_PRIVATE_KEY

  3) Create the database name `lebonson` and import `lebonson.sql` file in the `sql/lebonson` folder in the `backend` folder into your database
  4) Go to the `frontend` folder and run `npm install`
  5) Find the `config.ts` file in the `frontend` folder in `src` folder and switch all `API URLS` that have been commented to `localhost` http
  6) Run `npm run dev` to start testing the project.
  
  - Show items
  ![alt text](https://github.com/btkdevkh/lebonson/blob/main/frontend/src/assets/img/covers/lbs_1.jpg?raw=true)

  - Add to cart
  ![alt text](https://github.com/btkdevkh/lebonson/blob/main/frontend/src/assets/img/covers/lbs_2.jpg?raw=true)

  - Cart items
  ![alt text](https://github.com/btkdevkh/lebonson/blob/main/frontend/src/assets/img/covers/lbs_m_3.jpg?raw=true)

  - Payment test by stripe
  ![alt text](https://github.com/btkdevkh/lebonson/blob/main/frontend/src/assets/img/covers/lbs_4.jpg?raw=true)

  - Administration
  ![alt text](https://github.com/btkdevkh/lebonson/blob/main/frontend/src/assets/img/covers/lbs_5.jpg?raw=true)

  ** Note: By default, to test `stripe payment`, enter these credit card fake informations, see photo below :
  ![alt text](https://github.com/btkdevkh/lebonson/blob/main/frontend/src/assets/img/stripe-testing-en.png?raw=true)
