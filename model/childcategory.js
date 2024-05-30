var mongoose = require('mongoose');
const subcategory = require('./subcategory');
var Schema = mongoose.Schema;

const childcategory = new Schema ({
  id: {type:String , default:'', required:false},
  name:{type:String , default:'', required:false},
  image:{type:String , default:'', required:false},
  categoryId: {type:String , default:'', required:false},
  subcategoryId: {type:String , default:'', required:false},
  status: {type:Number , default:0 , required:false},
  orderBy: {type:Number , default:0, required:false},
  show_in_homepage: {type:Number , default:0, required:false},
  show_on_header: {type:Number , default:0, required:false},
  createdBy: {type:String , default:'Admin', required:false},
  updatedBy: {type:String , default:'Admin', required:false},
},
{
  timestamps :{createdAt:'createdAt' , updatedAt:'updatedAt'}


})
childcategory.pre('save',function(){
  this.id = this._id
})

module.exports = mongoose.model('childcategory',childcategory)