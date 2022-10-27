const express = require("express");
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { errorHandler } = require('./middleware/errorMiddleware');

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");

const app = express();

app.use(cors());

app.use(fileUpload({
  createParentPath: true
}));

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ status: 200, msg: "API OK" })
})

app.use('/api/v1/product', productRoutes)
app.use('/api/v1/user', userRoutes)
app.use(orderRoutes)
app.use('/api/v1/contact', contactUsRoutes)

app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server's listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
})
