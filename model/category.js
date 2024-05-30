var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const category = new Schema({
  id: {type:String , default:'' , required:false},
  store_id: {type:String , default:'' , required:false},
  name: {type:String , default:'' , required:true},
  image: {type:String , default:'' , required:false},
  orderBy: {type:Number , default:0 , required:false},
  show_on_homepage: {type:Number , default:0 , required:false},//0- yes , 1- no
  show_on_header: {type:Number , default:0 , required:false},//0- yes , 1- no
  status: {type:Number , default:0 , required:false},  //0- inactive , 1- active
  createdBy: {type:String , default:'Admin' , required:false},
  updatedBy: {type:String , default:'Admin' , required:false},
})
category.pre('save',function(){
  this.id = this._id
})

module.exports = mongoose.model('category',category)