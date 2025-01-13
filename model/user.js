var mongoose = require ('mongoose')
var Schema = mongoose.Schema
const jwt = require('jsonwebtoken');

const generalUsers = new Schema ({
  id :      {type:String , default:"" , required:false},
  name :    {type:String , default:"" , required:true},
  email :   {type:String , default:"" , required:false},
  password: {type:String , default:"" , required:true},
  phone :   {type:Number , default:0 , required:false},
  otp    :  {type:Number , default:0 , required:false},
  isMail :  {type:Boolean , default:false , required:false},
  status  : {type:Number , default:0 , required:false},   //0 - Active ,1 - INActive
  createdBy:{type:String , default:"Admin" , required:false},
  updatedBy:{type:String , default:"Admin" , required:false}
},
{
  timestamps:{createdAt :"createdAt" , updatedAt :"updatedAt"}
})

generalUsers.pre('save',function(){
  this.id=this._id
});

generalUsers.methods.getjwttoken = function() {
  const expiretimeinSecond = process.env.JWT_EXPIRE * 60
  return jwt.sign({id:this._id}, process.env.JWT_USER_SECRET_KEY ,{
    expiresIn: expiretimeinSecond
  });
}

module.exports = mongoose.model('GeneralUsers',generalUsers)
