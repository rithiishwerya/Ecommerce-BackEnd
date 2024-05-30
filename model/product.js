const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const variantSchema = new Schema ({
  id : {type:String, default:'', required:false},
  variantid : {type:String, default:'', required:false},
})
// variant.pre('save',function(){
//   this.id = this._id
// })

const product = new Schema({
  id : {type:String, default:'', required:false},
  store_id : {type:String, default:'', required:false},
  productname : {type:String, default:'', required:false},
  brand : {type:String, default:'', required:false},
  category :{type:String, default:'', required:false},
  subcategory : {type:String, default:'', required:false},
  childcategory : {type:String, default:'', required:false},
  mrpprice : {type:Number, default:0, required:false},
  sellingprice : {type:Number, default:0, required:false},
  resellerprice : {type:Number, default:0, required:false},
  productgst : {type:Number, default:0, required:false},
  productfeaturedimage : {type:String, default:"", required:false},
  producthoverfeaturedimage : {type:String, default:"", required:false},
  shortdescription : {type:String, default:'', required:false},
  description : {type:String, default:'', required:false},
  orderBy : {type:Number, default:0, required:false},
  productimage : {type:Array, default:[], required:false},
  variant :[variantSchema],
  status : {type:Number, default:0, required:false},
  createdBy : {type:String, default:'ADMIN', required:false},
  updatedBy :  {type:String, default:'ADMIN', required:false}
})
product.pre('save',function(){
  this.id = this._id
})

product.pre('findOneAndUpdate',function (){
  const update = this.getUpdate()
  if(update.$push && update.$push.variant){
    update.$push.variant = update.$push.variant.map(element => {
     const newId = new mongoose.Types.ObjectId()
     return {
         ...element,
         _id: newId,
         id: newId // Assign a new ObjectId
     } // Assign a new ObjectId
    });
  }
  console.log(JSON.stringify(this.getUpdate()))
})
module.exports = mongoose.model('product',product)