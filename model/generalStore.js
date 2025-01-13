var mongoose = require('mongoose')
var Schema = mongoose.Schema

const generalStore = new Schema({
  id :{type:String , default:"" , required:false},
  name :{type:String , default:"" , required:true}, 
  status:{type:Number, default:0 , required:false},
  phonenumber:{type:Number, default:0 , required:false},
  address: {type:String, default:"" , required:false},
  createdBy:{type:String , default:"Admin" , required:false},
  updatedBy:{type:String , default:"Admin" , required:false}
},
{
  timestamps:{createdAt:'createdAt' , updatedAt:'updatedAt'}
})

generalStore.pre('save',function(){
  this.id = this._id
})

module.exports = mongoose.model('GeneralStore',generalStore)
