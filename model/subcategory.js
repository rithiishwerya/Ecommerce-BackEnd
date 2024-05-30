var mongoose = require ('mongoose');
const category = require('./category');
var Schema = mongoose.Schema;

const subcategory = new Schema({
  id: {type:String , default:'' , required:false},
  name: {type:String , default:'' , required:true},
  image: {type:String , default:'' , required:false},
  categoryId: {type:String , default:'' , required:false},
  status: {type:Number , default:'' , required:false},  //0-inactive , 1-active
  orderBy: {type:Number , default:'' , required:false},  //0-asc desc , 1- desc asc
  show_on_homepage: {type:String , default:'' , required:false}, //0- dont show , 1-show
  show_on_header: {type:String , default:'' , required:false},  //0-dont show , 1-show
  createdBy: {type:String , default:'Admin' , required:false},
  updatedBy: {type:String , default:'Admin' , required:false}
})
subcategory.pre('save',function(){
  this.id = this._id
})

module.exports = mongoose.model('subcategory',subcategory)