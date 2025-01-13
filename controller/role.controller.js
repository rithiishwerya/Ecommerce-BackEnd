const express = require('express');   
const catchAsync = require('../utils/catchAsync');
const Role = require('../model/generalRole');

const Post_Role = catchAsync(async (req, res) => {
    let values=req.body;
    if(values.name != ' ' && values.name != null && values.name != undefined )
    {
        let Data ={
            id:values.id,
            name:values.name,
        }
        Role(Data).save().then((Result)=>{
            res.send({
                success:true,
                code:200,
                status:"DATA SAVED"
            });
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
            code:201,
            success:false,
            status:'all fields are mandatory'
        });
    }
});

const Get_Role = catchAsync(async(req,res) => {
    
    let values = req.body;
    await Role.find({}).then((Result) => {
        if(Result && Result.length >0){
        res.send({
            code:200,
            success:true,
            status:'data fetched',
            data:Result,
        })
        }else{
            res.send({
                code:201,
                success:"false",
                status:"no data"
            });
        }
    }).catch((err) => {
        console.error(err);
        res.send({
            success: false,
            code:204,
            status:"No content"
        });
})
});
    
const Patch_Role = catchAsync(async(req,res) =>{
    const user = req.user
    let values = req.body;
    const params = req.params.id;
    if (params && params != '' && params != null && params != undefined) {
        let query = {
            id: params
        }
        values.updatedBy = user.name
        let changes = {
            $set: values
        }
        Role.updateOne(query, changes, { upsert: true }).lean().exec().then((UpdateStatus) => {
            res.send({
                code: 200,
                success: true,
                message: "Data Update Success.",
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
            code:201,
            success:false,
            status:'all fields are mandatory'
        });
    }
});

const Delete_Role = catchAsync(async(req,res) =>{
    let values = req.body;
    let query = values;
    let changes = {
        $set: {
            status: 1
        }
    }
    Role.updateOne(query, changes, { upsert: true }).lean().exec().then((UpdateStatus) => {
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


module.exports = {Post_Role,Get_Role,Patch_Role,Delete_Role};
