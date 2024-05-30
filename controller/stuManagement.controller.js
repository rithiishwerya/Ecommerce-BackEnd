const express = require('express');   
const catchAsync = require('../utils/catchAsync');
const studentManagement = require('../model/studentManagement');
const institute = require('../model/institute');
const mongoose = require('mongoose');
let Formatter = require('../services/formatter');

//POST
const studManagement = catchAsync(async (req, res) => {
  try {
      let values = req.body;
      let phoneNumber = parseInt(values.phoneNumber)
       if (values.firstName != '' && values.firstName != null && values.firstName != undefined) {
        
        const result = await studentManagement.findOne({phoneNumber: phoneNumber});
        
        if(result != null){
          res.send({
            success: false,
            code: 201,
            Data:[],
            Status: "Phone Number already Exits!",
         });
        } else {
          const GeneratedUID = await GenerateUniqueUserIdForAssociate(values);
          let fileLink = ''
          if(req.file){
            fileLink = "http://localhost:2000/uploads/"+req.file.filename;
          }
          values.username = GeneratedUID;
          values.file_path = fileLink
          values.phoneNumber = phoneNumber
          console.log(values);
          studentManagement(values).save().then((Result) => {
              res.send({
                  success: true,
                  code: 200,
                  Data:Result,
                  Status: "Data Saved Successfully",
              });
          });
        }
      } else {
          res.status(400).json({
              success: false,
              code: 400,
              status: "First Name is required"
          });
      }
  } catch (error) {
      console.log("Error at unique id associate", error);
      res.status(500).json({
          success: false,
          code: 500,
          status: "Internal Server Error"
      });
  }
});

//USERID
const GenerateUniqueUserIdForAssociate = (values) => {
  return new Promise((resolve, reject) => {
      setImmediate(async () => {
          try {
            
              let mysort = { username: -1 };
              const institutions = await institute.findOne({"id": values.instituteId});
              if(institutions != '' && institutions != null && institutions != undefined){
                let instituteName = institutions.name
                instituteName = instituteName.slice(0,3)
                const result = await studentManagement.find({username:{$regex:instituteName,$options:'i'}}).sort(mysort).limit(1);
                if (result.length > 0) {
                    let LastUID = result[0].username;
                    let idchars = parseInt(LastUID.slice(4, 10)) + 1;
                    let lengthofdigits = idchars.toString().length;
                    let generatedUIDString = LastUID.slice(-10, 10 - lengthofdigits);
                    let finalStringGenerated = generatedUIDString + idchars;
                    resolve(finalStringGenerated);
                } else {
                    resolve(instituteName.toUpperCase()+"0000001");
                }
            } else {
                reject({
                    code: 201,
                    success: false,
                    status: "Institute Name is Mandary",
                    timestamp: new Date()
                });
            }
          } catch (error) {
              console.error('Something Error');
              console.error(error);
              reject({
                  code: 201,
                  success: false,
                  status: "DATABASE_ERROR",
                  timestamp: new Date()
              });
          }
      });
  });
};

//UPDATE
const updatestudent = catchAsync(async (req, res) => {
  let values = req.body;
  let prams = req.params;
  console.log(prams)
  if (prams.id != '' && prams.id != null && prams.id != undefined) {
      let query = {
        _id: new mongoose.Types.ObjectId(prams.id)
      }
      let newvalues = {
          $set: values
      };
      studentManagement.updateOne(query, newvalues).lean().exec().then((UpdateStatus) => {
          console.log(UpdateStatus);
          res.send({
              code: 200,
              success: true,
              message: "Category Updated Success.",
              timestamp: new Date()
          })
      }).catch((err) => {
          emailError.sendErrorEmail(err.stack, req.body, req.originalUrl);
          logger1.errorWithLineNumber('An error occurred:', err);
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
          Status: "Category id is Mandatory.",
          "timestamp": new Date()
      });
  }
});


//DELETE
const Deletestudent = catchAsync(async(req,res) =>{
  let values = req.body;
  let query = values;
  let changes = {
      $set: {
          status: 1
      }
  }
  studentManagement.updateOne(query, changes, { upsert: true }).lean().exec().then((UpdateStatus) => {
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
});



//GET
const getstudent = catchAsync(async (req, res) => {
    try {
        const values = req.query;
        let query = {};

        if (values.phoneNumber != null && values.phoneNumber != '' && values.phoneNumber != undefined) 
        {
            query.phoneNumber = parseInt(values.phoneNumber)
        } 

        if (values.firstName != null && values.firstName != '' && values.firstName != undefined) 
        {
            query.firstName = {$regex:values.firstName,$options:"i"}
        } 
        if (values.instituteId != null && values.instituteId !='' && values.instituteId != undefined)
        {
            query.instituteId = values.instituteId
        }

        const getstudentdetail = await studentManagement.find(query)
        let new_data1 = [];
        if (getstudentdetail && getstudentdetail.length > 0){   
            for(let each of getstudentdetail) {
                let instituteName = await institute.findOne({id:each.instituteId})
                let intName = '';
                if(instituteName != null && instituteName != '' && instituteName != undefined){
                    intName = instituteName.name
                }
                let responsejson = {};
                responsejson.Address = each.Address
                responsejson.username = each.username
                responsejson.firstName = each.firstName
                responsejson.lastName = each.lastName
                responsejson.phoneNumber = each.phoneNumber
                responsejson.instituteId = each.instituteId
                responsejson.intName = intName
                responsejson.createdBy = each.createdBy
                responsejson.updatedBy = each.updatedBy
                responsejson.createdAt = Formatter.toDate(each.createdAt) + " " + Formatter.toTime(each.createdAt)
                responsejson.updatedAt = Formatter.toDate(each.updatedAt) + " " + Formatter.toTime(each.updatedAt)
                new_data1.push(responsejson)
            }
            res.send({
                code: 200,
                message: "data retrieved",
                data: new_data1,
                success: true
            });
        
        
        } else {
            res.send({
                code: 201,
                message: "data not retrieved",
                success: false
            });
        }       
    } catch (error) {
        res.send({
            code: 201,
            message: "data not retrieved",
            success: false
        });
    }
});

const institution = catchAsync(async(req,res) =>{
    try{
        let  values = req.body
        let data = {
            name:values.name
        }
        institute(data).save().then((Result) => {
            res.send({
                success: true,
                code: 200,
                Status: " Data Saved Success",
            });
        }).catch((err) => {
            res.send({
                success: false,
                code: 200,
                Status: "Database Error",
                Data: {},
                "timestamp": new Date()
            });
        })
    }catch(error){
        res.send({
            code:201,
            message:error.stack
        })
}
})

//IMAGE UPLOAD


const uploadFile = catchAsync(async(req,res) =>{
    console.log(req.file)
    try {
        if (req.file) {
            const fileLink = "http://localhost:2000/uploads/"+req.file.filename;
            res.send({
                success: true,
                code: 200,
                file:fileLink,
                Status: " Data Saved Success",
            });
        }
   } catch (error) {
       console.log(error)
       res.status(400).send(error)
   }
});

//PAIZATTO UAT
const axios = require('axios');

//GET 3RD party website
const get_WebsiteData = async (req, res) => {
    try {
        let Result = await axios.get("https://paizattouattestapi.paizatto.com/api/admin/membership");
        res.send({
            success: true,
            code: 200,
            Data:Result.data.data,
            Status: " Data Saved Success",
        });
    } catch {
        res.send({
            success: false,
            message:error.stack,
            code: 201,
            Status: " Data not fetched",
        });
    }
};

const fs = require('fs');
//post in 3rd party website
const post_WebsiteData = catchAsync(async(req,res)=>{
    const values = req.body;
    const image = req.file
    if(values){
        try{
            const FormData = require('form-data');
            let data = new FormData();
            data.append('name', values.name);
            data.append('value', values.value);
            data.append('image', fs.createReadStream(image.path));

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://paizattouattestapi.paizatto.com/api/admin/membership',
                headers: { 
                    ...data.getHeaders()
                },
                data : data
            };

            await axios.request(config).then((response) => {
                res.send({
                    success: true,
                    code: 200,
                    data:response.data.data,
                    Status: " Data Saved Success",
                });
            }).catch((error) => {
                res.send({
                    success: false,
                    code: 201,
                    message:error.stack,
                    Status: "Data not fetched",
                });
            });
            
        } catch(error)  {
            res.send({
                success: false,
                code: 201,
                message:error.stack,
                Status: " Data not fetched",
            });
        }
    }
});



module.exports ={studManagement,updatestudent ,Deletestudent , getstudent , institution , uploadFile, get_WebsiteData ,post_WebsiteData} 