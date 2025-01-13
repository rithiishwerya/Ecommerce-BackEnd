const catchAsync = require('../utils/catchAsync');
const users = require('../model/user');
const bcrypt = require('bcrypt');
const Email = require('../services/email')

// REGISTER

const register = catchAsync(async(req,res) =>{
    let values = req.body;
    try{
      if (values.hasOwnProperty('password') && values.password !='' && values.password != null && values.password != undefined &&
       values.email != '' && values.email != null && values.email != undefined) {
        let UsersDetails = await users.findOne({ status: 0, email: values.email })
        if (UsersDetails ) {
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
          phone: values.phone,
          password: hashedPassword
        }
        const postusers = await users(Data).save();
        res.send({
          code: 200,
          message: 'User created',
          data:postusers,
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


const SendMail = catchAsync(async (req, res) => {
    try {
        let values = req.body
        if (values.email) {
            const generateOTP = Math.floor(Math.random() * 9000000)
            const Mail = await Email.sendEmail(values.email, "Ecommerce Mail", `Your OTP for verification is: ${generateOTP}`)
            if (Mail.code === 200) {
              const checkEmail = await user.findOne({email: values.email})
              if (checkEmail)
                checkEmail.otp = generateOTP;
                await checkEmail.save();
                res.send({
                    code: 200,
                    success: true,
                    message: 'Email Send Successfully',
                });
            } else {
                res.send({
                    code: 201,
                    success: false,
                    message: 'Error in send Email'
                })
            }
        } else {
            res.send({
                code: 201,
                success: false,
                message: 'Please provide a EmailId'
            })
        }
    } catch (err) {
        res.send({
            code: 201,
            success: false,
            message: err.stack
        })
    }
})

const VerifyOTP = catchAsync(async (req, res) => {
    try {
        let values = req.body
        if (values.otp != null && values.otp != '' && values.otp != undefined && values.email != null && values.email != '' && values.email != undefined) {
          const checkEmail = await user.findOne({email: values.email})
          if (checkEmail)
            if (checkEmail.otp === values.otp) {
              checkEmail.isMail = true;
                await checkEmail.save();
                res.send({
                    code: 200,
                    success: true,
                    message: 'Email verified'
                })
            } else {
                res.send({
                    code: 201,
                    success: false,
                    message: 'Verfication Code is Invalid'
                })
            }
        } else {
            res.send({
                code: 201,
                success: false,
                message: 'Please enter Verfication Code'
            })
        }
    } catch (err) {
        res.send({
            code: 201,
            success: false,
            message: err.stack
        })
    }
})


// LOGIN 

const login = catchAsync(async(req,res) =>{
  var values = req.body;
  if(values.email != null && values.email !='' && values.email != undefined && values.password != null && values.password !='' && values.password != undefined){
      const hashedPassword = await bcrypt.hash(values.password, 10);
      let user = await users.findOne({email: values.email , isMail:true})
        if (!user ) {
          res.send({
            code: 201,
            message: 'User not found/ verified',
            success: false
          });
        } else {
          let token = await user.getjwttoken()
          res.set('Authentication', token);
          bcrypt.compare(values.password, user.password, function (err, result){
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
    let usersdetails = req.user
    query={};

    const getuser = await users.findOne({ id: usersdetails.id });
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

  const update_users = catchAsync(async(req,res) =>{
    var params = req.params.id;
    var values = req.body;
    if (values.password != '' && values.password != null && values != undefined.password && values.phone != '' && values.phone != null && values.phone != undefined) {
      let query = {
        id:params
      }
      
      if(values.password !='' && values.password !=null && values.password !=undefined){
        const hashedPassword = await bcrypt.hash(values.password, 10);
        values.password = hashedPassword;
      }
      let changes = {
          $set: values
      };
      users.updateOne(query, changes).lean().exec().then((UpdateStatus) => {
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
const user = require('../model/user');

const post_userToken = catchAsync(async(req,res)=>{
  try{
  const values = req.body;
  if(values){
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
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

module.exports = {register , get_Profile , update_users ,login, post_userToken, SendMail , VerifyOTP}; 
    


