const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
var createError = require("http-errors");

require("dotenv").config();
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);

var cartproductRoutes = require("./routes/cartproduct");

var storeRoutes = require("./routes/store");

var studentRoutes = require("./routes/student");

var generalRoutes = require("./routes/general");

var categoryRoutes = require("./routes/category");

var brandRoutes = require("./routes/brand");

var productRoutes = require("./routes/product");

var cartwishlistRoutes = require("./routes/cartwishlist");

var orderRoutes = require("./routes/order");

var app = express();
app.set("views", path.join(__dirname, "views"));
//app.set('view engine', 'pug');
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api/cartproduct", cartproductRoutes);

app.use("/api", storeRoutes);

//app.use('/api/details',studentRoutes);
app.use("/", studentRoutes);

app.use("/api/general", generalRoutes);

app.use("/api/category", categoryRoutes);

app.use("/api/brand", brandRoutes);

app.use("/api/product", productRoutes);

app.use("/api/cartwishlist", cartwishlistRoutes);

app.use("/api/order", orderRoutes);

app.listen(1000, () => {
  console.log(`Server Started at ${1000}`);
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
