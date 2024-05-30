var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var studentManagement = new Schema ({
  username: {type: String ,default: "",required:false},
  firstName: {type:String ,default: "",required:true},
  lastName: {type:String ,default: "",required:false},
  phoneNumber: {type:Number ,default: 0,required:false},
  instituteId: {type:String ,default: '',required:false},
   
  file_path: {type:String ,default: '',required:false},

  Address: {
    no: { type: String, default: "", required: false },
    street: { type: String, default: "", required: false },
    city: { type: String, default: "", required: false },
    pincode: { type: Number, default: "", required: false },
    state: { type: String, default: "", required: false }},
  createdBy: { type: String, default: "", required:false},
  updatedBy: { type: String, default: "", required:false},
},
{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}
)

module.exports = mongoose.model('details', studentManagement);


