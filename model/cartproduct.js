var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var variant = new Schema({
  id: { type: String, default: "", required: false },
  name: { type: String, default: "", required: false },
  mrp_price: { type: Number, default: 0, required: false },
  our_price: { type: Number, default: 0, required: false },
});

var product_details = new Schema({
  id: { type: String, default: "", required: false },
  category: { type: String, default: "", required: false },
  sub_category: { type: String, default: "", required: false },
  product: { type: String, default: "", required: false },
  description: { type: String, default: "", required: false },
  variant: [variant],
  quantity: { type: Number, default: 0, required: false },
  image: { type: String, default: "", required: false },
  product_image: { type: Array, default: [], required: false },
  estimated_delivery: { type: Date, default: 0, required: false },
  total_price: { type: Number, default: 0, required: false },
  discountd_price: { type: Number, default: 0, required: false },
});
module.exports = mongoose.model("cartproduct", product_details);

// {
//     "id": "663cb03403428818d42f18ba",
//     "category": "Groceries",
//     "sub_category": "Friuts",
//     "product": "apple",
//     "description": "an apple a day keeps the doctor away",
// "variant": [
//     {
//         "id": "663cb06b03428818d42f18bf",
//         "name": "simla apple",
//         "mrpprice": 200,
//         "ourprice": 185,
//         "status": 1
//       },
//       {
//         "id": "663cb07603428818d42f18c2",
//         "name": "indian apple",
//         "mrpprice": 150,
//         "ourprice": 130,
//         "status": 0
//     }
// ],
// "quantity": 2,
// "image": "https://paizatto.s3.ap-south-1.amazonaws.com/202218021645186512620f8dd0a1731371781cc-3197-4595-b13c-29f46957290f.png",
// "productimage":
//  [
//   "http://localhost:8080/appleimage1",
//   "http://localhost:8080/appleimage2",
//   "http://localhost:8080/appleimage3"
//  ],
// "estimated_delivery":  "2024-05-09T11:15:00.873Z",
// "total_price" : 300,
// "discountd_price": 250
//}
