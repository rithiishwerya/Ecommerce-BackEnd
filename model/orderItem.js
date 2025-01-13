const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItem = new Schema ({
  id: {type:String ,default:'' ,required:false},
  order_id: {type:String ,default:'' ,required:false},
  user_id: {type:String ,default:'' ,required:false},
  orderItem:
  [
    {
      id: {type:String ,default:'' ,required:false},
      product_id: {type:String ,default:'' ,required:false},
      variant_id: {type:String ,default:'' ,required:false},
      quantity: {type:Number ,default:0 ,required:false},
      price: {type:Number ,default:0 ,required:false}
    }
  ],
  createdBy: {type:String ,default:'Admin' ,required:false},
  updatedBy: {type:String ,default:'Admin' ,required:false}
})
orderItem.pre('save',function(){
  this.id = this._id
  this.orderItem.forEach(item => {
    item.id = item._id
  });
})
module.exports = mongoose.model('orderItem',orderItem)