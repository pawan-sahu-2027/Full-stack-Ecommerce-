// import Stripe from 'stripe';
// import dotenv from 'dotenv';

// dotenv.config();

// const stripeInstance = new Stripe({ key_id: process.env.STRIPE_kEY_ID, 
//         key_secret: process.env.STRIPE_SECRET_KEY
//      });

//      export default stripeInstance;


import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripeInstance;