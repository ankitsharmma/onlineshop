const stripe = require("../../config/stripe");
const {userModel}=require("../../models/userModel")
const {cartItems} =require("../../models/productModel")
const paymentcontroller= async(req,res)=>{

   try{
   const {cartItems}=req.body;
   console.log( "cartItems",cartItems)
   const user=await userModel.findOne({_id:req.userId})
   const params = {
       Submit_type : "pay",
       mode : "payment",
       payment_method_types : ["card"],
       billing_address_collection : "auto",
       shipping_options : [
           {
            shipping_rate : "shr_1Pizqc02UI8a2dDY4KmD1ppp"
           }
       ],
       costomer_email : user.email,
       line_items : cartItems.map((item)=>{
           return {
              price_data : {
                  currency : "inr",
                  product_data : {
                    
   }
              }
           }
       })
             
           }

   const session = await stripe.checkout.sessions.create(params);
   res.status(303).json(session)
   

} catch(err){
    res.json({
        message : err?.message || err,
        error : true,
        success : false
    })
}



}

module.exports={paymentcontroller}
