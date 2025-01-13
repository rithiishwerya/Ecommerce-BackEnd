const catchAsync = require ('../utils/catchAsync')
const express = require ('express')
const cart = require ('../model/cart')
const wishlist = require ('../model/wishlist');
const compare = require ('../model/compare');
const User = require ('../model/user');
const product = require('../model/product');
const variantunit = require('../model/variantunit');
const productController = require('../controller/product.controller');
const subcategory = require('../model/subcategory');
const category = require('../model/category');
const childcategory = require('../model/childcategory');
const generalStore = require('../model/generalStore');
const brand = require('../model/brand')

//************** CART ************** 

//POST CART
const post_cart = catchAsync(async(req,res) => {
  let values = req.body;
  try {
    console.log(values)
    await cart(values).save().then((result)=>{
    res.send({
      code: 200,
      message: "cart added",
      data: result,
      success: true
    });
  })
  } catch (err){
    console.log(err.stack)
    res.send({
      code: 201,
      message: err.stack,
      success: false
    });
  }
});

//GET CART
const get_cart = catchAsync(async(req,res)=>{
  let values = req.query;
  let user = req.user
  query ={}
  try{
    // if (values.userId != null && values.userId != undefined && values.userId !=''){
    //   query.userId = values.userId   
    // }
    //query.status = 0;
    const getcart = await cart.find({userId: user.id})
    const new_data1 = [];
    if (getcart && getcart.length >0){
      cartTotal = 0
      for (let each of getcart){
        responseJson = {};
        let userId = await User.findOne({id:each.userId})
        if (userId)
        {
          userName = userId.name
        }

        let productId = await product.findOne({id:each.productId})
        if (productId)
        {
          productName = productId.productname,
          mrp = productId.mrpprice,
          sellingprice = productId.sellingprice,
          quantitytotal = each.quantity,
          image = productId.productfeaturedimage 
          cartTotal += sellingprice * quantitytotal
        }

        let variantId = await variantunit.findOne({id:each.variantID})
        if(variantId)
        {
          variantName = variantId.name
        }

        
        responseJson.userId = each.userId
        responseJson.userName = userName
        responseJson.productId = each.productId
        responseJson.productName = productName
        responseJson.variantId= each.variantID
        responseJson.variantName = variantName
        responseJson.quantity = each.quantity
        responseJson.MRP = mrp
        responseJson.SellingPrice = sellingprice
        responseJson.image = image
        new_data1.push(responseJson)
      }
       res.send ({
        code :200,
        message :'your cart items ',
        data:new_data1,
        totalAmount: cartTotal,
        success:true
      })
    } else {
      res.send ({
        code :201,
        message :' No id found!',
        data:[],
        success:false
      })
    }
  }catch (error){
    res.send({
      code :201,
      message :error.stack,
      success:false
    })
  }
})


//DELETE CART ITEMS

const delete_cart = catchAsync(async(req,res) =>{
  //let params = req.params.id;
  let values = req.body;
  console.log(values)
  let query = values;
  let changes = {
      $set: {
          status: 1
      }
  }
  console.log(changes)
  cart.updateOne(query, changes).lean().exec().then((UpdateStatus) => {
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

//************** WISHLIST ************* 

//POST WISHLIST
const post_wishlist = catchAsync(async (req,res) => {
  let values = req.body;
  try {
    await wishlist(values).save().then((result)=>{
    res.send({
      code: 200,
      message: "wishlist added",
      data: result,
      success: true
    });
  })
  } catch (err) {
    res.send({
      code: 201,
      message: err.stack,
      success: false
    });
  }
});

//GET WISHLIST
const get_wishlist= catchAsync(async(req,res)=>{
  let values = req.body;
  let user = req.user
  query ={}
  try{
    // if (values.userId != null && values.userId != undefined && values.userId !=''){
    //   query.userId = values.userId   
    // }
    const getwishlist= await wishlist.find({userId: user.id})
    const new_data1 = [];
    if (getwishlist && getwishlist.length >0){
      for (let each of getwishlist){
        responseJson = {};

        let userId = await User.findOne({id:each.userId})
        if (userId)
        {
          userName = userId.name
        }

        let productId = await product.findOne({id:each.productId})
        if (productId)
        {
          productName = productId.productname
        }
        responseJson.userId = each.userId
        responseJson.userName = userName
        responseJson.productId = each.productId
        responseJson.productName = productName
        new_data1.push(responseJson)
      }
      res.send ({
        code :200,
        message :'your wishlist items ',
        data:new_data1,
        success:true
      })
    }
  } catch{
    res.send({
      code :201,
      message :'id is mandatory',
      success:false
    })
  }
})


//DELETE WISHLIST
const delete_wishlist= catchAsync(async(req,res) =>{
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
  wishlist.updateOne(query, changes).lean().exec().then((result) => {
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


//************** COMPARE ************* 

//POST COMPARE (only 3 items)
const post_compare = catchAsync(async (req, res) => {
  try {
  let values = req.body; 
  let user = req.user;
  if (values.userId != null && values.userId != undefined && values.userId !=''){
    const query = { userId: user.id };
    const users = await compare.countDocuments(query);
    if (users >= 3){
      res.send({
      message :'wishlist limit is 3'
    })
  }else{
    await compare(values).save().then((result)=>{
      res.send({
        code: 200,
        message: "added to compare",
        data: result,
        success: true
      });
    })
  }
  }else{
    res.send({
      code :201,
      message:'userId is mandatory',
      success:false
    })
  }
  } catch (err) {
    res.send({
      code: 201,
      message: err.stack,
      success: false
    });
  }
});

//GET COMPARE

const get_compare= catchAsync(async(req,res)=>{
  let values = req.body;
  let user = req.user;
  query ={}

  try{
    // if (values.userId != null && values.userId != undefined && values.userId !=''){
    //   query.userId = values.userId   
    // }
    const getcompare= await compare.find({userId: user.id})
    const new_data1 = [];
    let variant = await productController.varinatdetails()
    if (getcompare && getcompare.length >0){
      for (let each of getcompare){
        responseJson = {};
        let productdetails = {}

        let userId = await User.findOne({id:each.userId})
        if (userId)
        {
          userName = userId.name
        }
        responseJson.userId = each.userId
        responseJson.userName = userName

        let productId = await product.findOne({id:each.productId})
        if (productId)
        {
          productID = productId.id
          responseJson.productId = productID

          //store
          let strName = await generalStore.findOne({id:productId.store_id})
          let storeName = '';
          if(strName != null && strName != '' && strName !=undefined)
          {
            storeId = strName.id
            storeName = strName.name
          }
          
          //variant
          let varinatdetails = []
          for(let vari in productId.variant){
            let varinatid = productId.variant[vari].variantid
            let variantlist = variant[varinatid]
            // varinatdetails.push(variantlist)
            varinatdetails = variantlist
          }

          //brand
          let brndName = await brand.findOne({id:productId.brand})
          let brandName ='';
          if (brndName !='' && brndName != undefined && brndName != null)
          {
            brandId = brndName.id
            brandName = brndName.name
          } 

          //category name
          let catgoryName = await category.findOne({id:productId.category})
          let categoryName = '';
          if (catgoryName != null && catgoryName != undefined && catgoryName != '')
          {
            categoryId = catgoryName.id
            categoryName = catgoryName.name
          }

          //sub category
          let sbcategoryName = await subcategory.findOne({id:productId.subcategory})
          let subcategoryName ='';
          if (sbcategoryName != null && sbcategoryName != undefined && sbcategoryName != '')
          {
            subcategoryId = sbcategoryName.id
            subcategoryName = sbcategoryName.name
          }
 

          
          //child category
          let chcategoryName = await childcategory.findOne({id:productId.childcategory})
          let childcategoryName = '';
          if (chcategoryName != '' && chcategoryName != undefined && chcategoryName != null)
          {
            childcategoryId = chcategoryName.id
            childcategoryName = chcategoryName.name
          }

          productdetails.name = productId.productname
          productdetails.productgst  =  productId.productgst
          productdetails.mrpprice  = productId.mrpprice
          productdetails.sellingprice  = productId.sellingprice
          productdetails.resellerprice  = productId.resellerprice
          productdetails.productfeaturedimage  = productId.productfeaturedimage
          productdetails.producthoverfeaturedimage  = productId.producthoverfeaturedimage
          productdetails.shortdescription  = productId.shortdescription
          productdetails.description  = productId.description
          productdetails.productimage  = productId.productimage
          productdetails.storeId = storeId
          productdetails.storeName = storeName
          productdetails.brandId = brandId
          productdetails.brandName = brandName
          productdetails.variant  = varinatdetails
          productdetails.categoryId = categoryId
          productdetails.categoryName = categoryName
          productdetails.subcategoryId = subcategoryId
          productdetails.subcategoryName = subcategoryName
          productdetails.childcategoryId = childcategoryId
          productdetails.childcategoryName = childcategoryName
          responseJson.product = productdetails
        }
        new_data1.push(responseJson)

      }
      res.send ({
        code :200,
        message :'your items to compare ',
        data:new_data1,
        success:true
      })
    }
  } catch (error){
    res.send({
      code :201,
      message :error.stack,
      success:false
    })
  }
})

//CATEGORY
// const categorydetails = () =>{
//   return new Promise(async(resolve,reject) =>{
//     try{
//       let  categorydetails = await category.find({},{_id:0})
//       let ResponseJson ={}
//       for (let each in categorydetails){
//         let a = categorydetails[each].id;
//         let b = categorydetails[each]
//         ResponseJson[a] = b
//       }
//       if (ResponseJson){
//         resolve(ResponseJson)
//       }else{
//         reject(ResponseJson)
//       }
//     }catch(error){
//       reject({
//         code:201,
//         message:'failed!',
//         succeses:false
//       })
//     }
//   })
// }

// let categorydetails =[] //defining function
// if(productId.category){
//   let categoryid = productId.category
//   let categorylist = category[categoryid].name
//   categorydetails = categorylist //without brackets (categorydetails:phone)
// }

module.exports ={post_cart ,get_cart, delete_cart,
                 post_wishlist , get_wishlist,delete_wishlist,
                 post_compare , get_compare}