const express = require("express");
const catchAsync = require("../utils/catchAsync");
const cartproduct = require("../model/cartproduct");

//get
const list_products = catchAsync(async (req, res) => {
  const values = req.query;
  query = {};
  try {
    if (
      values.product != "" &&
      values.product != null &&
      values.product != undefined
    ) {
      query.product = values.product;
    }
    const product = await cartproduct.find(query);
    if (product && product.length > 0) {
      res.send({
        code: 200,
        message: "data retrieved",
        data: product,
        success: true,
      });
    }
  } catch {
    res.send({
      code: 201,
      message: "data not retrieved",
      success: false,
    });
  }
});

module.exports = { list_products };
