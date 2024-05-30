const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderProcess = new Schema ({
  id: {type:String ,default:'' ,require:false},
  order_id: {type:String ,default:'' ,require:false}, 
  est_delivery_date: {type:String ,default:'' ,require:false},
  process: {type:String ,default:'' ,require:false},
  courier_name: {type:String ,default:'' ,require:false},
  courier_id: {type:String ,default:'' ,require:false},
  createdBy: {type:String ,default:'' ,require:false},
  updatedBy: {type:String ,default:'' ,require:false}
})
orderProcess.pre('save',function(){
  this.id = this._id
})
module.exports = mongoose.model('orderProcess',orderProcess)