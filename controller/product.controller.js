const express = require ('express')
const product = require ('../model/product')
const catchAsync = require ('../utils/catchAsync')
const store = require ('../model/generalStore')
const variantUnit = require ('../model/variantunit')
const mongoose = require('mongoose');
let Formatter = require('../services/formatter')
const brand = require('../model/brand')
const category = require('../model/category')
const subcategory = require('../model/subcategory')
const childcategory = require('../model/childcategory')


//POST
const post_product = catchAsync(async(req,res) =>{
  try{
  const values = req.body;
  await product(values).save().then((result)=>{
    res.send({
      code:200,
      message:'Product posted',
      data:result,
      success:true
    })
  })
  } catch{
    res.send({
      code:201,
      message:'Product not posted',
      success:false
    })
  }
})

//UPDATE FIELDS

const update_product = catchAsync(async(req,res) =>{
  const params = req.params.id;
  const values = req.body;
  const file = req.files;
  if (params != null && params != '' && params != undefined){
    let query ={
      id : params
    }
    
    if(file){
      if (file.productfeaturedimage){
        values.productfeaturedimage= "http://localhost:2000/uploads/"+ file.productfeaturedimage[0].filename;
      }
      if (file.producthoverfeaturedimage){
        values.producthoverfeaturedimage= "http://localhost:2000/uploads/"+ file.producthoverfeaturedimage[0].filename;
      }
    }
    let changes={
      $set : values
    }
     await product.updateOne(query,changes).sort().lean().exec().then((result)=>{
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



//ADD VARIANT
const VariantProduct = catchAsync(async(req,res) =>{
  const values = req.body;

  if (values.productId != '' && values.productId != null && values.productId != undefined){
    let query ={
      id :  values.productId
    }
    // delete values.productId
  console.log(query)
  let changes={
    $push:{
      variant:[values]
    }
}
     await product.findOneAndUpdate(query,changes).sort().lean().exec().then((result)=>{
       res.send({
        code:200,
        message:'data updated',
        data:result,
        success:true
    })
   }).catch((err) => {
    console.log(err.stack)
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


//UPDATE VARIANT

const Update_variant = catchAsync(async(req,res) =>{
  const params = req.params.id;
  const values = req.body;
  if (params != null && params != '' && params != undefined){
    let query ={
      "variant.id" : params
    }
    let responseJson = {}
    for(const key in values){
      responseJson['variant.$.'+key] = values[key]
    }
    console.log(responseJson);
    let changes={
      $set : responseJson
    }
    product.updateOne(query,changes).sort().lean().exec().then((result)=>{
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
  }
});

//UPDATE PRODUCT IMAGE

const UpdateProductImages = catchAsync(async(req,res) =>{
  const params = req.params.id;
  const files = req.files;
  // const values = req.values;

  if (params != '' && params != null && params != undefined){
    let query ={
      id :  params
    }
    
    let productimage = []
    if(files){
      for(const file of files){
        // console.log(file.filename)
        
        productimage.push("http://localhost:2000/uploads/"+file.filename)
      }
    }

    let changes={
      $set : {
        productimage
      }
    }
     await product.findOneAndUpdate(query,changes).sort().lean().exec().then((result)=>{
       res.send({
        code:200,
        message:'data updated',
        data:result,
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

// DELETE PRODUCT

const delete_product = catchAsync(async(req,res) =>{
  let values = req.params.id;
  let query = values;
  let changes = {
      $set: {
          status: 1
      }
  }
  product.updateOne(query,changes).lean().exec().then((UpdateStatus) => {
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

//DELETE VARIANT
 
const delete_variant = catchAsync(async(req,res) =>{
  let params = req.params.id;
  let values = req.body;
  
  // let query = values;
  if (params != null && params != '' && params != undefined){
    let query ={
     "variant.id" : params
    // id:values
    }
  let changes = {
      $set: {
          status: 1
      }
  }
  product.updateOne(query, changes).lean().exec().then((UpdateStatus) => {
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

  }
});

//DELETE IMAGE
const delete_image = catchAsync(async(req,res) =>{
  const params = req.params.id;
  const files = req.files;

  if (params != '' && params != null && params != undefined){
    let query ={
      id :  params
    }
    
    let productimage = []
    if(files){
      for(const file of files){        
        productimage.push("http://localhost:2000/uploads/"+file.filename)
      }
    }
    let changes={
      $set : {
        status: 1
      }
    }
  product.updateOne(query, changes).lean().exec().then((UpdateStatus) => {
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
  }
});

//GET ALL ID's

const products = catchAsync(async(req,res)=>{
  try
  {
    //console.log(req.query)
      let values = req.query;
      query = {};

      if (values.productname != null && values.productname != '' && values.productname  != undefined)
          {
            query.productname = {$regex:values.productname,$options:"i"}
          }
      if (values.store_id != null && values.store_id !='' && values.store_id != undefined)
          {
              query.store_id = values.store_id
          }

      const getProduct = await product.find(query)
      const new_data1 = [];
      if (getProduct && getProduct.length >0){
        let variant = await varinatdetails()
        for(let each of getProduct){
          let responsejson = {};

          //store name
          let strName = await store.findOne({id:each.store_id})
          let storeName = '';
          if(strName != null && strName != '' && strName !=undefined)
          {
            storeName = strName.name
          }
          
          //brand name
          let brndName = await brand.findOne({id:each.brand})
          let brandName ='';
          if (brndName !='' && brndName != undefined && brndName != null)
          {
            brandName = brndName.name
          } 

          //category name
          let catgoryName = await category.findOne({id:each.category})
          let categoryName = '';
          if (catgoryName != null && catgoryName != undefined && catgoryName != '')
          {
            categoryName = catgoryName.name
          }

          //sub category
          let sbcategoryName = await subcategory.findOne({id:each.subcategory})
          let subcategoryName ='';
          if (sbcategoryName != null && sbcategoryName != undefined && sbcategoryName != '')
          {
            subcategoryName = sbcategoryName.name
          }

          //child category
          let chcategoryName = await childcategory.findOne({id:each.childcategory})
          let childcategoryName = '';
          if (chcategoryName != '' && chcategoryName != undefined && chcategoryName != null)
          {
            childcategoryName = chcategoryName.name
          }

        // variant unit
        let varinatdetails = []
        console.log(variant);
        for(let vari in each.variant){
          let varinatid = each.variant[vari].variantid
          let unitid = each.variant[vari].unitid
          variantlist = variant[varinatid]
          // unitlist = unit[unitid]
          // variantlist.units = unitlist
          varinatdetails.push(variantlist)
        }
        responsejson.varinat = varinatdetails
  
        responsejson.store_id = each.store_id
        responsejson.storeName = storeName
        responsejson.productname = each.productname
        responsejson.brand = each.brand
        responsejson.brandName = brandName
        responsejson.category = each.category
        responsejson.categoryName = categoryName
        responsejson.phoneNumber = each.phoneNumber
        responsejson.subcategory = each.subcategory
        responsejson.subcategoryName = subcategoryName
        responsejson.childcategory = each.childcategory
        responsejson.childcategoryName = childcategoryName
        responsejson.mrpprice = each.mrpprice
        responsejson.sellingprice = each.sellingprice
        responsejson.resellerprice = each.resellerprice
        responsejson.productgst = each.productgst
        responsejson.productfeaturedimage = each.productfeaturedimage
        responsejson.producthoverfeaturedimage = each.producthoverfeaturedimage
        responsejson.productimage = each.productimage
        responsejson.shortdescription = each.shortdescription
        responsejson.description = each.description
        responsejson.variantid = each.variant[0].variantid

        //responsejson.varName = varName
        // responsejson.unitid = each.variant.unitid
        // responsejson.uniName = uniName
        responsejson.orderBy = each.orderBy
        responsejson.status = each.status
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
          message: error.stack,
          success: false
      });
  }
});


  const varinatdetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
          let variantdetails = await variantUnit.find({},{_id:0})
          let ResponseJson = {}
          for(let each in variantdetails){
             let a = variantdetails[each].id;
             let b = variantdetails[each]
             ResponseJson[a] = b
          }
          if(ResponseJson){
            resolve(ResponseJson)
          } else {
            reject(ResponseJson)
          }

        } catch(error) {
          reject({
            code: 201,
            message: error.stack,
            success: false
        });
      }
    })
  }

  // (NOT USED)
  const unitdetails = () => {
    return new Promise(async (resolve, reject) => {
        try {

          let unitdetail = await variantUnit.find({},{_id:0,units:1});
          let ResponseJson = {}
          for(let each in unitdetail){
            for(let each2 in unitdetail[each].units){
              let a = unitdetail[each].units[each2].id;
              let b = unitdetail[each].units[each2]
              ResponseJson[a] = b
            }
          }
          
          if(ResponseJson){
            resolve(ResponseJson)
          } else {
            reject(ResponseJson)
          }

        } catch(error) {
          let ResponseJson = {}
          reject({
            code: 201,
            message: error.stack,
            success: false
        });
      }
    })
  }
  


module.exports = {post_product , UpdateProductImages , VariantProduct , update_product , Update_variant , delete_product,
                  delete_variant , delete_image , products,varinatdetails}