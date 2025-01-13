const express = require("express");
const path = require("path");
var createError = require("http-errors");

//swagger

var app = express();
const { swaggerUi, swaggerSpec, swaggerSpec2} = require('./swagger/swagger');

app.use('/api-user', swaggerUi.serveFiles(swaggerSpec,{explorer:true}), swaggerUi.setup(swaggerSpec));

app.use('/api-admin', swaggerUi.serveFiles(swaggerSpec2,{explorer:true}), swaggerUi.setup(swaggerSpec2))

//Database

const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


//routes

var cartproductRoutes = require("./routes/cartproduct");

var storeRoutes = require("./routes/store");

var categoryRoutes = require("./routes/category");

var brandRoutes = require("./routes/brand");

var productRoutes = require("./routes/product");

var cartwishlistRoutes = require("./routes/cartwishlist");

var orderRoutes = require("./routes/order");

var paymentRoutes = require("./routes/payment")

var userRoutes = require ("./routes/user");

var adminRoutes = require("./routes/admin")

var roleRoutes = require("./routes/role")

//run static files in that path

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "uploads")));

//req.body

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API

app.use("/api/cartproduct", cartproductRoutes);

app.use("/api/store", storeRoutes);

app.use("/api/category", categoryRoutes);

app.use("/api/brand", brandRoutes);

app.use("/api/product", productRoutes);

app.use("/api/cartwishlist", cartwishlistRoutes);

app.use("/api/order", orderRoutes);

app.use("/api/payment", paymentRoutes)

app.use("/api/user", userRoutes)

app.use("/api/admin", adminRoutes)

app.use("/api/role", roleRoutes)

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

// render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
