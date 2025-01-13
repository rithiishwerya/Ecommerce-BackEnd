const catchAsync = require('../utils/catchAsync');
const Admin = require('../model/admin');
const bcrypt = require('bcrypt');


// REGISTER

const register = catchAsync(async(req,res) =>{
    let values = req.body;
    try{
      if (values.hasOwnProperty('password') && values.password !='' && values.password != null && values.password != undefined &&
       values.email != '' && values.email != null && values.email != undefined) {
        let AdminDetails = await Admin.findOne({ email: values.email })
        if (AdminDetails ) {
          res.send({
            code: 201,
            message: 'Email already exists!'
          })
        } else {
        const hashedPassword = await bcrypt.hash(values.password, 10);
        values.password = hashedPassword;
        let Data = {
          name: values.name,
          email: values.email,
          password: hashedPassword,
          roleId: values.roleId,
          storeId: values.storeId,
        }
        const postAdmin = await Admin(Data).save();
        res.send({
          code: 200,
          message: 'User created',
          data:postAdmin,
          success:true
        });
      }
      }else{
        res.send({
          code:201,
          message:'password not encrypted'
        })
      } 
    }catch(err)  {
      res.send({
          code:204,
          message:err.stack
          
      })
    }
  })

// LOGIN 

const login = catchAsync(async(req,res) =>{
  var values = req.body;
  if(values.email != null && values.email !='' && values.email != undefined && values.password != null && values.password !='' && values.password != undefined){
      const hashedPassword = await bcrypt.hash(values.password, 10);
      let admin = await Admin.findOne({email: values.email })
        if (!admin ) {
          res.send({
            code: 201,
            message: 'User not found/ verified',
            success: false
          });
        } else {
          let token = await admin.getjwttoken()
          res.set('Authentication', token);
          bcrypt.compare(values.password, admin.password, function (err, result){
            if (result) {
              res.send({
                code: 200,
                message: 'User verified',
                success: true
              });
            } else {
              res.send({
                code: 201,
                message: 'Invalid password',
                success: false
              });
            }
          });
        }
    } else {
      res.send({
        code: 201,
        message: 'Login failed',
        success: false
      });
    }
  });



  
//GET

const get_Profile = catchAsync(async(req,res) =>{
    try{
    let values = req.query
    let admin = req.admin
    query={};

    const getuser = await Admin.findOne({ id: admin.id });
    if (getuser){
      res.send({
        code:200,
        message:'data fetched',
        data:getuser,
        success:true
      })
    } else {
      res.send({
        code:201,
        message:'No user found ',
        success: false
      })
    }
  }catch(err)  {
    res.send({
        code:204,
        message:"not fetched"
        
    })
   }
})
  
  
//UPDATE

  const update_Admin = catchAsync(async(req,res) =>{
    var admin = req.admin.id
    var values = req.body;
    if (values) {
      let query = {
        id:admin
      }
      
      if(values.password !='' && values.password !=null && values.password !=undefined){
        const hashedPassword = await bcrypt.hash(values.password, 10);
        values.password = hashedPassword;
      }
      let changes = {
          $set: values
      };
      Admin.updateOne(query, changes).lean().exec().then((UpdateStatus) => {
          console.log(UpdateStatus);
          res.send({
              code: 200,
              success: true,
              message: "Update Success.",
              timestamp: new Date()
          })
      }).catch((err) => {
          res.send({
              code: 201,
              success: false,
              message: "DATABASE_ERROR.",
              timestamp: new Date()
          });
      })
  } else {
      res.send({
          success: false,
          code: 201,
          Status: " id is Mandatory.",
          "timestamp": new Date()
      });
  }
  });


//GET TOKEN

const jwt = require('jsonwebtoken');
const admin = require('../model/admin');

const post_userToken = catchAsync(async(req,res)=>{
  try{
  const values = req.body;
  if(values){
    let jwtSecretKey = process.env.JWT_ADMIN_SECRET_KEY;
    let Data ={
      name:values.name,
      email:values.email,
    }
    const token = jwt.sign(Data, jwtSecretKey);
    res.send({
        code:200,
        message:'Token generated',
        data:token,
        success:true
      })
  }
}catch(error){
  res.send({
    code:201,
    message:'user data error !',
    success:false
  })
}
})

module.exports = {register , get_Profile , update_Admin ,login, post_userToken}; 
    


