const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const Users = require('../model/user');
const Admin = require('../model/admin')

// User

const AuthUser = catchAsync(async (req, res,next) => {
  try {
    const token = req.headers['authorization']
    if(token){
      let bearertoken = token.split(' ')
       jwt.verify(bearertoken[1],process.env.JWT_USER_SECRET_KEY, async(err,decode) => {
        if(err){
          res.send({
            code:201,
            success: false,
            message: 'not verified'
         });
        } else {
          let user = await Users.findOne({id:decode.id})
          console.log('Auth.Usersdetails ==>', user)
          req.user = user
          next()
        }
      })
    } else {
      res.send({
        success: false,
        code:401,
        status:"Un Authorized"
     });
    }
  } catch (error) {
    res.send({
      success: false,
      code:401,
      message:error.stack
   });
  }
});


// Admin 

const AuthAdmin = catchAsync(async (req, res,next) => {
  try {
    const token = req.headers['authorization']
    console.log('token ==>', token)
    if(token){
      let bearertoken = token.split(' ')
       jwt.verify(bearertoken[1],process.env.JWT_ADMIN_SECRET_KEY, async(err,decode) => {
        if(err){
          res.send({
            code:201,
            success: false,
            message: 'not verified'
         });
        } else {
          let admin = await Admin.findOne({id:decode.id})
          console.log('Auth.Adminsdetails ==>', admin)
          req.admin = admin
          next()
        }
      })
    } else {
      res.send({
        success: false,
        code:401,
        status:"Un Authorized"
     });
    }
  } catch (error) {
    res.send({
      success: false,
      code:401,
      message:error.stack
   });
  }
});

module.exports = {
  AuthUser,
  AuthAdmin
}