const catchAsync = require ('../utils/catchAsync')
const express = require ('express')
const order = require ('../model/order')
const orderItem = require ('../model/orderItem')
const orderAddress = require ('../model/orderAddress')
const orderProcess = require ('../model/orderProcess')
const cart = require ('../model/cart')
const product = require('../model/product')

//*************** ORDER *************

//POST ORDER
const post_order = catchAsync(async(req,res) =>{
  const values = req.body
  if (values.user_id != '' && values.user_id != undefined && values.user_id != null){
    const carts = await cart.find({userId:values.user_id,status:0})
    if(carts.length > 0){
      let orderjson = {}
      orderjson.order_id = "ORD"+ Math.floor(Math.random() * 1000000000)
      orderjson.user_id = values.user_id
      orderjson.sub_total = values.sub_total
      orderjson.shipping_amount = values.shipping_amount
      orderjson.gst = values.gst
      orderjson.total = values.total
      orderjson.coupon_code = values.coupon_code
      orderjson.remarks = values.remarks
    
      const result = await order(orderjson).save()

        let orderItemjson = {}
        let orderItemdetails = []
        orderItemjson.order_id = result.order_id
        for (let cartlist of carts){
          responseJson = {};        
          responseJson.user_id = cartlist.userId
          responseJson.product_id = cartlist.productId
          responseJson.variant_id= cartlist.variantID
          responseJson.quantity = cartlist.quantity
          const products = await product.findOne({id:cartlist.productId})
          responseJson.price = cartlist.quantity * products.sellingprice
          orderItemdetails.push(responseJson);
          let query = {
            id:cartlist.id
          }
          let changes = {
            $set : {
              status: 1
            }
          }
          await cart.updateOne(query, changes).lean().exec()
        }
        orderItemjson.orderItem = orderItemdetails

        await orderItem(orderItemjson).save()

        let orderAddressjson = {}
        orderAddressjson.order_id = result.order_id
        orderAddressjson.user_id = result.user_id
        orderAddressjson.first_name = values.first_name
        orderAddressjson.last_name = values.last_name
        orderAddressjson.company_name = values.company_name
        orderAddressjson.email = values.email
        orderAddressjson.phone_number = values.phone_number
        orderAddressjson.alternate_contact_number = values.alternate_contact_number
        orderAddressjson.address1 = values.address1
        orderAddressjson.address2 = values.address2
        orderAddressjson.landmark = values.landmark
        orderAddressjson.city = values.city
        orderAddressjson.state = values.state
        orderAddressjson.pincode = values.pincode
      
        await orderAddress(orderAddressjson).save()
        res.send({
          code :200,
          message: 'order posted',
          data: orderAddressjson,
          success:true
        })   
      } else{
        res.send({
          code :201,
          message: 'No Items',
          success:false
        })     
      }         
    }else{
      res.send({
        code :201,
        message: 'order not posted',
        success:false
      })     
    }
  })
  
//GET ORDER
const get_order = catchAsync(async(req,res)=>{
  const values = req.body
  query={}
  if (values.user_id != '' && values.user_id != undefined && values.user_id !=null)
  {
    query.user_id = values.user_id
  }
  const getorder = await order.find(query)
  if (getorder && getorder.length >0){
    res.send({
      code:200,
      message:'order fetched',
      data:getorder,
      success:true
    })
  }else{
    res.send({
      code:201,
      message:'no orders fetched',
      success:false
    })
  }
})

module.exports = {post_order }
              