const mongoose = require('mongoose')
const Schema = mongoose.Schema

const order = new Schema ({
  id: {type:String ,default:'' ,required:false},
  order_id: {type:String ,default:'' ,required:false},
  user_id: {type:String ,default:'' ,required:false},
  sub_total: {type:Number ,default:0 ,required:false},
  shipping_amount: {type:Number ,default:0 ,required:false},
  gst: {type:Number ,default:0 ,required:false},
  total: {type:Number ,default:0 ,required:false},
  coupon_code: {type:String ,default:'' ,required:false},
  remarks: {type:String ,default:'' ,required:false},
  transaction_id: {type:String ,default:'' ,required:false},
  payment_type: {type:Number ,default:0 ,required:false}, //0-netbanking , 1-COD
  is_paid: {type:Number ,default:0 ,required:false}, //0-pending, 1- Success, 2 - Failure
  order_status: {type:Number ,default:0 ,required:false}, //0-pending, 1-confirmed , 2- Not confirm
  delivery_type:  {type:Number ,default:0 ,required:false}, //0- within 7 days , 1-1 day delivery
  date: {type:Date ,default: new Date() ,required:false},
  createdBy: {type:String,default:'Admin' ,required:false},
  updatedBy: {type:String ,default:'Admin' ,required:false}
})
order.pre('save',function(){
  this.id = this._id
})

module.exports = mongoose.model('order',order)