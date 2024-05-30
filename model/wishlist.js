var mongoose = require ('mongoose')
var Schema = mongoose.Schema;

const wishlist = new Schema ({
  id :{type:String , default:'',required:false},
  userId :{type:String , default:'',required:false},
  productId :{type:String , default:'',required:false},
  status :{type:Number , default:0,required:false}
},{
  timestamps:({createdAt:'createdAt',updatedAt:'updatedAt'})
})
wishlist.pre('save',function(){
  this.id = this._id
})

module.exports = mongoose.model('wishlist',wishlist)
