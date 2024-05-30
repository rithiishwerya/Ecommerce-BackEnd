var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const brand = new Schema({
  id : {type:String, default:'', required:false},
  store_id : {type:String, default:'', required:false},
  name : {type:String, default:'', required:true},
  image : {type:String, default:'' , required:false},
  description : {type:String, default:'', required:false},
  status : {type:Number, default:0 , required:false},
  orderBy : {type:Number, default:0, required:false},
  createdBy : {type:String, default:'Admin', required:false},
  updatedBy : {type:String, required:'Admin', required:false}
},{
  timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}
})
brand.pre('save',function(){
  this.id = this._id
})
module.exports = mongoose.model('brand',brand)