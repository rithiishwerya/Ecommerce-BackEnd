var mongoose = require ('mongoose')
var Schema = mongoose.Schema

const generalRole = new Schema({
  id :{type:String , default:"" , required:false},
  name :{type:String , default:"" , required:true}, 
  status:{type:Number, default:0 , required:false},
  createdBy:{type:String , default:"Admin" , required:false},
  updatedBy:{type:String , default:"Admin" , required:false}
},
{
  timestamps:{createdAt:'createdAt' , updatedAt:'updatedAt'}
})

generalRole.pre('save',function(){
  this.id = this._id
});

module.exports = mongoose.model('GeneralRole',generalRole)