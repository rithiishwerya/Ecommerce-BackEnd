const express = require('express');
const catchAsync = require('../utils/catchAsync');
const users = require('../model/generalUsers');
const role = require('../model/generalRole');
const store = require('../model/generalStore');

const bcrypt = require('bcrypt');

//POST
const post_users = catchAsync(async(req,res) =>{
  let values = req.body;
  try{
    if (values.hasOwnProperty('password') && values.password !='' && values.password != null && values.password != undefined){
      const hashedPassword = await bcrypt.hash(values.password, 10);
      values.password = hashedPassword;
      const postusers = await  users(values).save();
      res.send({
        code: 200,
        message: 'User created',
        data:postusers,
        success:true
      });
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

//GET

const get_users = catchAsync(async(req,res) =>{
  //const verifyToken = await verifyToken();
  try{
  let values = req.body;
  query={};

  if (values.hasOwnProperty("name") && values.name !='' && values.name !=null && values.name !=undefined){
    query.name = values.name
  }
  const getuser = await users.find(query);
  if (getuser && getuser.length > 0){
    res.send({
      code:200,
      message:'data fetched',
      data:getuser,
      success:true
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
  if (values != '' && values != null && values != undefined) {
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


//DELETE
const delete_users = catchAsync(async(req,res) =>{
  var values = req.params.id;
  if (values != '' && values != null && values != undefined) {
    let query = {
      id:values
    }
    let changes = {
        $set: {
          status:1
        }
    };
    users.deleteOne(query, changes).lean().exec().then((UpdateStatus) => {
        console.log(UpdateStatus);
        res.send({
            code: 200,
            success: true,
            message: "delete Success.",
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





//LOGIN EMAIL
const login = catchAsync(async(req,res) =>{
  var values = req.body;
  if(values.email != null && values.email !='' && values.email != undefined && values.password != null && values.password !='' && values.password != undefined){
      const hashedPassword = await bcrypt.hash(values.password, 10);
      let user = await users.findOne({email: values.email })
        if (!user) {
          res.send({
            code: 201,
            message: 'User not found',
            success: false
          });
        } else {
          let token = await user.getjwttoken()
          bcrypt.compare(values.password, user.password, function (err, result){
            if (result) {
              res.send({
                code: 200,
                message: 'User verified',
                success: true,
                token : token
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
  
//************      ROLE     ****************//


//POST
const post_role = catchAsync(async (req, res) => {
  let values = req.body;
  try {
    const postrole = await role(values).save().then((result)=>{
    res.send({
      code: 200,
      message: "role added",
      data: result,
      success: true
    });
  })
  } catch (err) {
    res.send({
      code: 201,
      message: 'role not added',
      success: false
    });
  }
});

//GET
const get_role = catchAsync(async(req,res) =>{
  const values = req.body;
  query={};
  try{
    if (values.name !='' && values.name !=null && values.name !=undefined){
     query.name = values.name;
    }
    const getrole = await role.find(query)
    if (getrole && getrole.length > 0){
      res.send({
        code:200,
        message:'data fetched',
        success:true
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
const update_role = catchAsync(async(req,res) =>{
  const values = req.params.id;
  if (values != null && values != '' && values != undefined){
    let query ={
      id : values
    }
    let changes={
      $set : req.body
    }
  role.updateOne(query,changes).sort().lean().exec().then((result)=>{
    res.send({
      code:200,
        message:'data updated',
        success:true
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



//DELETE
const delete_role= catchAsync(async(req,res) =>{
  let params = req.params.id;
  if ( params != '' && params != null && params != undefined) {
    const query = {
      id: params
    }
  let changes = {
      $set: {
          status: 1
      }
  }
  role.updateOne(query, changes, { upsert: true }).lean().exec().then((UpdateStatus) => {
      console.log(UpdateStatus);
      res.send({
          code: 200,
          success: true,
          message: "Data Deleted Success.",
          timestamp: new Date()
      })
  }).catch((err) => {
          console.error(err);
          res.send({
              success: false,
              code:204,
              status:"No content"
          });
})
}else{
  res.send({
    code: 201,
    success: false,
    message: "Id required to update Carrier.",
    data: {},
    timestamp: new Date()
  });
}
});


//************      STORE     ****************//


//POST
const post_store = catchAsync(async (req, res) => {
  let values = req.body;
  try {
    const poststore = await store(values).save().then((result)=>{
    res.send({
      code: 200,
      message: "Store added",
      data: result,
      success: true
    });
  })
  } catch (err) {
    res.send({
      code: 201,
      message: 'Store not added',
      success: false
    });
  }
});

//GET
const get_store = catchAsync(async(req,res) =>{
  const values = req.files;
  query={};
  try{
    if (values.name !='' && values.name !=null && values.name !=undefined){
     query.name = values.name;
    }
    const getstore = await store.find(query)
    if (getstore && getstore.length > 0){
      res.send({
        code:200,
        message:'data fetched',
        success:true
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
const update_store = catchAsync(async(req,res) =>{
  const values = req.params.id;
  if (values != null && values != '' && values != undefined){
    let query ={
      id : values
    }
    let changes={
      $set : req.body
    }
  store.updateOne(query,changes).sort().lean().exec().then((result)=>{
    res.send({
      code:200,
        message:'data updated',
        success:true
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


module.exports = {post_users , get_users , update_users , delete_users, login, post_userToken,
                  post_role , get_role , update_role , delete_role ,
                  post_store , get_store , update_store }; 
                  




