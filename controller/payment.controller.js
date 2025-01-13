const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// html page 

// http://localhost:2000/api/payment
const start = async(req,res) => {
    res.render('../views/index.ejs')
}


// localhost:2000/checkout
const session = async(req,res) => {
    try{
        const checkout = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'One Plus 9R'
                        },
                        unit_amount: 410000 //2 zero addition for inr
                    },
                    quantity: 1
                },
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'One Plus 9R Back Case '
                        },
                        unit_amount: 164000 //2 zero addition for inr
                    },
                    quantity: 2
                }            
            ],
            shipping_options: [
                {
                  shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                      amount: 0,
                      currency: "inr",
                    },
                    display_name: "Free shipping",
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                      minimum: {
                        unit: "business_day",
                        value: 5,
                      },
                      maximum: {
                        unit: "business_day",
                        value: 7,
                      },
                    },
                  },
                },
                {
                  shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                      amount: 1500,
                      currency: "inr",
                    },
                    display_name: "Next day air",
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                      minimum: {
                        unit: "business_day",
                        value: 1,
                      },
                      maximum: {
                        unit: "business_day",
                        value: 1,
                      },
                    },
                  },
                },
              ],
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['IN','US']
            },
            success_url:'http://localhost:2000/api/payment/complete',
            cancel_url: 'http://localhost:2000/api/payment/cancel'
        })

      
        // const customerId = stripe.paymentIntent.customer;

        // const customer = await stripe.customers.retrieve(customerId);
        //  console.log(customer.email)
  
        
        console.log('message --->',checkout.success_url)
        console.log('session --->',session)
        console.log("payment link --->",checkout.url)
        res.redirect(checkout.url)

        if(checkout.success_url){
          console.log(`Your order successfully been places....Thanks for your order`)
        }else{
          console.log('Some fault occured in placing your order')
        }

    } catch(error){
        res.send({
            code:201,
            message:error.stack,
            success:false
        })
    }
}

const complete = async(req,res) => {
    res.send('Your payment was successfull')
}

const cancel = async(req,res) => {
    res.send('payment failed')
}



//**** webhook *****//


const endpointSecret = "whsec_d69cb03479382ba34ec3edc5c8763d6789fbb7a7f34e7022ec0f5e86d179e858";

const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.stack}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  
  response.send();
};




module.exports = {session, complete, cancel, start, webhook} 

