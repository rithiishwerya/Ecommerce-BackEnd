const catchAsync = require('../utils/catchAsync');
const email = require('../services/email')

const sendEmail = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    if (values.email) {
      const tokennew = Math.floor(Math.random() * 9000000)
      //Gmail keys (services)
      let emaildetails = await email.sendEmail(values.email,"Email Verfication Code",`OTP for you login is :${tokennew}`)
      if(emaildetails.code === 200){
        res.send({
          success: true,
          code: 200,
          status: "Verified Successfully",
          timestamp: new Date(),
        });
      } else {
        const errcode = new Error(emaildetails.status);
        errcode.statusCode = 201;
        return next(errcode);
      }
    } else {
      const errcode = new Error("All Field are Mandatory");
      errcode.statusCode = 201;
      return next(errcode);
    }
  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});


module.exports = {sendEmail}