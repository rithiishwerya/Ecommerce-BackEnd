const express = require('express');
const catchAsync = require('../utils/catchAsync');
const categorys = require('../model/category');
const subcategory = require('../model/subcategory');
const childcategory = require('../model/childcategory');
const product = require('../model/product');
const category = require('../model/category');


//**************  CATEGORY  *************//

//POST
const post_category = catchAsync(async (req, res) => {
  try{
  let values = req.body;
  let file = req.file;
    if(file){
      values.image = "http://localhost:2000/uploads/"+ file.filename;
    }  
      await categorys(values).save().then((result)=>{
      res.send({
        code: 200,
        message: "category added",
        data: result,
        success: true
      });
    })
}catch{
  res.send({
    code: 201,
    message: "role not added",
    success: false
  });
}
});



//GET
const get_category = catchAsync(async(req,res) =>{
  const values = req.body;
  query={}
try{
    if(values.name != null && values.name !='' && values.name != undefined){
      query.name = values.name
    }
    const getcategory = await categorys.find(query)
    if(getcategory && getcategory.length > 0){
      res.send({
        code : 200,
        message : 'category retrieved',
        data:getcategory,
        success : true
      })
    }
  }catch{
    res.send({
      code : 201,
      message :'name not  given',
      success:false
    })
  }
})


//UPDATE
const update_category = catchAsync(async(req,res) =>{
  const params = req.params.id;
  const values = req.body;
  const file = req.file;
  console.log(file)
  if (params != null && params != '' && params != undefined){
    let query ={
      id : params
    }
    if (file){
      values.image= "http://localhost:2000/uploads/"+ file.filename;
    }
    let changes={
      $set : values
    }
     categorys.updateOne(query,changes).sort().lean().exec().then((result)=>{
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


//************** SUB CATEGORY  *************//


//POST
const post_subcategory = catchAsync(async (req, res) => {
  try{
  let values = req.body;
  let file = req.file;
    if(file){
      values.image = "http://localhost:2000/uploads/"+ file.filename;
    }  
      await subcategory(values).save().then((result)=>{
      res.send({
        code: 200,
        message: "role added",
        data: result,
        success: true
      });
    })
}catch{
  res.send({
    code: 201,
    message: "role not added",
    data: [],
    success: false
  });
}
});



//GET
const get_subcategory = catchAsync(async(req,res) =>{
  let values = req.body;
  query ={}
  try{
    if(values.name !='' && values.name !=null && values.name != undefined){
      query.name = values.name
    }
    const getsubcategory = await subcategory.find(query)
    if (getsubcategory && getsubcategory.length >0){
      res.send({
        code:200,
        message:'retrieved',
        data:getsubcategory,
        success:true
      })
    }
  }catch{
    res.send({
      code:201,
      message:' not retrieved',
      success:true
    })
  }

})


//UPDATE
const update_subcategory = catchAsync(async(req,res) =>{
  const params = req.params.id;
  const values = req.body;
  const file = req.file;
  if (params != null && params != '' && params != undefined){
    let query ={
      id : params
    }
    if (file){
      values.image= "http://localhost:2000/uploads/"+ file.filename;
    }
    let changes={
      $set : values
    }
     subcategory.updateOne(query,changes).sort().lean().exec().then((result)=>{
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

//************** CHILD CATEGORY  **************//

//POST
const post_childcategory = catchAsync(async (req, res) => {
  try{
  let values = req.body;
  let file = req.file;
    if(file){
      values.image = "http://localhost:2000/uploads/"+ file.filename;
    }  
      await childcategory(values).save().then((result)=>{
      res.send({
        code: 200,
        message: "role added",
        data: result,
        success: true
      });
    })
}catch{
  res.send({
    code: 201,
    message: "role not added",
    data: [],
    success: false
  });
}
});



//GET

const get_childcategory = catchAsync(async(req,res) =>{
  let values = req.body;
  query ={}
  try{
    if(values.name !='' && values.name !=null && values.name != undefined){
      values.name = query.name
    }
    const getchildcategory = await childcategory.find(query)
    if (getchildcategory && getchildcategory.length >0){
      res.send({
        code:200,
        message:'retrieved',
        data:getchildcategory,
        success:true
      })
    }
  }catch{
    res.send({
      code:201,
      message:' not retrieved',
      success:true
    })
  }

})


//UPDATE
const update_childcategory = catchAsync(async(req,res) =>{
  var params = req.params.id;
  var values = req.body;
  var files = req.file;
  if( params != null && params != '' && params != undefined){
    let query={
      id : params
    }
    if (files){
    values.image ='http://localhost:2000/uploads'+files.filename;
    }  
    let changes={
      $set : values
    }
    await childcategory.updateOne(query,changes).lean().exec().then((result)=>{
      res.send({
        code:200,
        message:'data updated',
        data:result,
        success:true
      })
    })
    }else{
      res.send({
        code:201,
        message:'data not updated',
        success:false
      })
    }
})

//CATEGORY FLOW


// const category_flow = catchAsync(async (req, res) => {
//   try {
//     let values = req.body; 
//     query = {}; 

//     const categoryFlow = await product.find(query); 
//     let new_data1 = [];
//     if (categoryFlow && categoryFlow.length > 0) {
      
//       for (let each of categoryFlow) { 
//         let responsejson = {}; 
        
//         //CATEGORY
  
//       let categoryName = await category.findOne({id:each.category})
//       let categoryDetails = [];
//       if (categoryName != '' && categoryName != undefined && categoryName != null)
//       {
//         categoryDetails.push ({
//         categoryId :each.category,
//         Name:categoryName.name
//       })
//        }

       //SUB CATEGORY

  //      let subcategoryName = await subcategory.find({id:each.subcategory})
  //         let subcategoryDetails = [];
  //         if (subcategoryName != '' && subcategoryName != undefined && subcategoryName != null)
  //         {
  //           subcategoryDetails.push ({
  //           subcategoryId :each.subcategory,
  //           subName:subcategoryName.name
  //         })
  //          }

      
  //       //CHILD CATEGORY
  //   let chcategoryName = await childcategory.findOne({id:each.childcategory})
  //         let childcategoryDetails = [];
  //         if (chcategoryName != '' && chcategoryName != undefined && chcategoryName != null)
  //         {
  //         childcategoryDetails.push ({
  //           childcategoryId :each.childcategory,
  //           childName:chcategoryName.name
  //         })
  //          }
          
  //       categoryDetails.push(subcategoryDetails)
  //       subcategoryDetails.push(childcategoryDetails)

  //       responsejson.categoryDetails=categoryDetails,
  //      // responsejson.subcategoryDetails=subcategoryDetails,
  //       // responsejson.childcategoryDetails=childcategoryDetails


  //       new_data1.push(responsejson); 
  //     }

  //     res.send({
  //       code: 200,
  //       message: "Data retrieved",
  //       data: new_data1,
  //       success: true
  //     });
  //   } else {
  //     res.send({
  //       code: 201,
  //       message: "Couldn't find query",
  //       success: false
  //     });
  //   }
  // } catch (error) {
  //   res.send({
  //     code: 201,
  //     message: error.stack,
  //     success: false
  //   });
  // }
  //   });


//CATEGORY FLOW
const category_flow = catchAsync(async (req, res) => {
  try {
    let values = req.body; 
    query = {}; 

    const categorydetails = await category.find(query); 
    let new_data1 = [];
    if (categorydetails && categorydetails.length > 0) {   
      for (let each of categorydetails) { 
        let responsejson = {}; 

      responsejson.categoryId = each.id
      responsejson.categoryName = each.name

        let sbcategoryName = await subcategory.find({categoryId: each.id});
        let subcategorydetails = []
        if (sbcategoryName.length > 0) {
          for(sub of sbcategoryName){
            let subcategoryjson = {}
            subcategoryjson.subId = sub.id
            subcategoryjson.subName = sub.name
            let chcategoryName = await childcategory.find({subcategoryId:sub.id,categoryId:each.id})
            let childcategorydetails = []
            if(chcategoryName.length > 0){
              for(child of chcategoryName){
                let childcategoryjson = {}
                childcategoryjson.childcategoryId = child.id
                childcategoryjson.childcategoryName = child.name
                childcategorydetails.push(childcategoryjson)
              }
            }
            subcategoryjson.childcategory = childcategorydetails
            subcategorydetails.push(subcategoryjson)
          }
        }
        responsejson.subcategory = subcategorydetails


        new_data1.push(responsejson); 
      }

      res.send({
        code: 200,
        message: "Data retrieved",
        data: new_data1,
        success: true
      });
    } else {
      res.send({
        code: 201,
        message: "Couldn't find query",
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


module.exports ={ post_category , get_category , update_category ,
                  post_subcategory , get_subcategory , update_subcategory,
                  post_childcategory , get_childcategory ,update_childcategory,
                  category_flow};