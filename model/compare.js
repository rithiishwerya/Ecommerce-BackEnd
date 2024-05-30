var mongoose = require ('mongoose');
var  Schema = mongoose.Schema;

const compare = new Schema({
  id :{type:String , default:'',required:false},
  userId :{type:String , default:'',required:false},
  productId :{type:String , default:'',required:false},
  status :{type:Number, default:0,required:false}
},{
  timestamps :{createdAt:'createdAt',updateAt:'updatedAt'}
})
compare.pre('save',function(){
  this.id = this._id
})
module.exports = mongoose.model('compare',compare)