const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const units = new Schema ({
  id : {type:String, default:'', required:false},
  name : {type:String, default:'', required:true},
  status : {type:Number, default:0, required:false}
})
units.pre('save',function(){
  this.id = this._id
})


const variantUnit = new Schema ({
  id : {type:String, default:'', required:false},
  store_id : {type:String, default:'', required:false},
  name : {type:String, default:'', required:true},
  units : [units],
  createdBy : {type:String, default:'Admin', required:false},
  updatedBy : {type:String, default:'Admin', required:false}
})
variantUnit.pre('save',function(){
  this.id = this._id
})

variantUnit.pre('findOneAndUpdate',function (){
   const update = this.getUpdate()
   if(update.$push && update.$push.units){
    update.$push.units =  update.$push.units.map(units => {
      const newId = new mongoose.Types.ObjectId()
      return {
          ...units,
          _id: newId,
          id: newId // Assign a new ObjectId
      } // Assign a new ObjectId
  });
   }
   console.log(JSON.stringify(this.getUpdate()))
})
module.exports = mongoose.model('variantUnit',variantUnit)