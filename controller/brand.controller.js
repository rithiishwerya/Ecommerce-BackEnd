const express = require("express");
const brand = require("../model/brand");
const catchAsync = require("../utils/catchAsync");
const variantUnit = require("../model/variantunit");

//************ BRAND ************//

//POST

const post_brand = catchAsync(async (req, res) => {
  try {
    const values = req.body;
    const files = req.files;
    if (files) {
      values.image = "http://localhost:2000/uploads" + files.filename;
    }
    await brand(values)
      .save()
      .then((result) => {
        res.send({
          code: 200,
          message: "Brand posted",
          data: result,
          success: true,
        });
      });
  } catch {
    res.send({
      code: 201,
      message: "Brand not posted",
      success: false,
    });
  }
});

//GET

const get_brand = catchAsync(async (req, res) => {
  const values = req.query;
  query = {};
  try {
    if (values.name != "" && values.name != null && values.name != undefined) {
      query.name = values.name;
    }
    console.log("query---->", query);
    const getbrand = await brand.find(query);
    if (getbrand && getbrand.length > 0) {
      res.send({
        code: 200,
        message: "data retrieved",
        data: getbrand,
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

//UPDATE

const update_brand = catchAsync(async (req, res) => {
  const params = req.params.id;
  const values = req.body;
  const file = req.file;
  if (params != null && params != "" && params != undefined) {
    let query = {
      id: params,
    };
    if (file) {
      values.image = "http://localhost:2000/uploads/" + file.fileename;
    }
    let changes = {
      $set: values,
    };
    brand
      .updateOne(query, changes)
      .sort()
      .lean()
      .exec()
      .then((result) => {
        res.send({
          code: 200,
          message: "data updated",
          data: result,
          success: true,
        });
      })
      .catch((err) => {
        res.send({
          code: 201,
          success: false,
          message: "DATABASE_ERROR.",
          timestamp: new Date(),
        });
      });
  } else {
    res.send({
      success: false,
      code: 201,
      Status: " id is Mandatory.",
      timestamp: new Date(),
    });
  }
});

//************ VARIANT & UNIT ************//

//POST

const post_variantUnit = catchAsync(async (req, res) => {
  try {
    const values = req.body;
    await variantUnit(values)
      .save()
      .then((result) => {
        res.send({
          code: 200,
          message: "Brand posted",
          data: result,
          success: true,
        });
      });
  } catch {
    res.send({
      code: 201,
      message: "Brand not posted",
      success: false,
    });
  }
});

//GET

const get_variantUnit = catchAsync(async (req, res) => {
  const values = req.query;
  query = {};
  try {
    if (values.name != "" && values.name != null && values.name != undefined) {
      query.name = values.name;
    }
    const getbrand = await variantUnit.find(query);
    if (getbrand && getbrand.length > 0) {
      res.send({
        code: 200,
        message: "data retrieved",
        data: getbrand,
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

//UPDATE
const update_variantUnit = catchAsync(async (req, res) => {
  const params = req.params.id;
  const values = req.body;
  if (params != null && params != "" && params != undefined) {
    let query = {
      id: params,
    };
    let changes = {
      $set: values,
    };
    variantUnit
      .updateOne(query, changes)
      .sort()
      .lean()
      .exec()
      .then((result) => {
        res.send({
          code: 200,
          message: "data updated",
          success: true,
        });
      })
      .catch((err) => {
        res.send({
          code: 201,
          success: false,
          message: "DATABASE_ERROR.",
          timestamp: new Date(),
        });
      });
  }
});

//ADD UNIT
const AddUnit = catchAsync(async (req, res) => {
  const params = req.body.variantId;
  const values = req.body;
  if (params != null && params != "" && params != undefined) {
    let query = {
      id: params,
    };
    delete values.variantId;
    let changes = {
      $push: {
        units: [values],
      },
    };
    console.log(values);
    await variantUnit
      .findOneAndUpdate(query, changes)
      .sort()
      .lean()
      .exec()
      .then((result) => {
        console.log(changes);
        res.send({
          code: 200,
          message: "data updated",
          success: true,
        });
      })
      .catch((err) => {
        res.send({
          code: 201,
          success: false,
          message: "DATABASE_ERROR.",
          timestamp: new Date(),
        });
      });
  }
});

// UPDATE UNIT

const UpdateUnit = catchAsync(async (req, res) => {
  const params = req.params.id;
  const values = req.body;
  if (params != null && params != "" && params != undefined) {
    let query = {
      "units.id": params,
    };
    console.log(query);

    let responseJson = {};
    for (const key in values) {
      responseJson["units.$." + key] = values[key];
    }
    console.log(responseJson);
    let changes = {
      $set: responseJson,
    };
    console.log(changes);
    await variantUnit
      .updateOne(query, changes)
      .sort()
      .lean()
      .exec()
      .then((result) => {
        console.log(result);
        res.send({
          code: 200,
          message: "data updated",
          success: true,
        });
      })
      .catch((err) => {
        res.send({
          code: 201,
          success: false,
          message: "DATABASE_ERROR.",
          timestamp: new Date(),
        });
      });
  }
});

module.exports = {
  post_brand,
  get_brand,
  update_brand,
  post_variantUnit,
  get_variantUnit,
  update_variantUnit,
  AddUnit,
  UpdateUnit,
};
