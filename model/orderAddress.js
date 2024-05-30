const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderAdress = new Schema ({
  id: {type:String ,default:'' ,required:false},
  order_id: {type:String ,default:'' ,required:false},
  user_id: {type:String ,default:'' ,required:false},
  first_name: {type:String ,default:'' ,required:false},
  last_name: {type:String ,default:'' ,required:false},
  company_name: {type:String ,default:'' ,required:false},
  email: {type:String ,default:'' ,required:false},
  phone_number: {type:Number ,default:0 ,required:false},
  alternate_contact_number: {type:Number ,default:0 ,required:false},
  address1: {type:String ,default:'' ,required:false},
  address2: {type:String ,default:'' ,required:false},
  landmark: {type:String ,default:'' ,required:false},
  city: {type:String ,default:'' ,required:false},
  state: {type:String ,default:'' ,required:false},
  pincode: {type:Number ,default:0 ,required:false},
  createdBy: {type:String ,default:'Admin' ,required:false},
  updatedBy: {type:String ,default:'Admin' ,required:false}
})
orderAdress.pre('save',function(){
  this.id = this._id
})
module.exports = mongoose.model('orderAddress',orderAdress)