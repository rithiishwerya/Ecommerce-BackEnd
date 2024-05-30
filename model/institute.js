var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var institute = new Schema ({
  id:{type:String,default:"",required:false},
  name:{type:String ,default:"" , required:false},
  createdBy: { type: String, default: "", required:false},
  updatedBy: { type: String, default: "", required:false},
},
{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}
)

institute.pre('save', function() {
  this.id = this._id;
});

module.exports = mongoose.model('institute', institute);
