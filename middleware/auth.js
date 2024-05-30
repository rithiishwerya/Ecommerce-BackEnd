const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const users = require('../model/generalUsers');

const AuthAdmin= catchAsync(async (req, res,next) => {
  try {
    const token = req.headers['authorization']
    if(token){
      let bearertoken = token.split(' ')
       jwt.verify(bearertoken[1],process.env.JWT_SECRET_KEY, async(err,decode) => {
        if(err){
          res.send({
            success: false,
            code:401,
            status:err.message
         });
        } else {
          let usersdetails = await users.findOne({id:decode.id})
          req.user = usersdetails
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
      status:error.stack
   });
  }
});

module.exports = {
  AuthAdmin
}