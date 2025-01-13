var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var role = new Schema({
    id: { type: Number, default: "", required:true},
    name: { type: String, default: "", required:true},
    updatedAt: { type: Date, default: new Date(), required:false},
    updatedBy: { type: String, default: "", required:false},
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}
)

module.exports = mongoose.model('role', role);
  

