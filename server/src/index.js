const express = require('express')
require('dotenv').config()
const postRoute = require("../routes/posts")
const userRoute = require("../routes/user")
const authRoute = require("../routes/auth")


const app = express()

app.use(express.json());

app.use("/", authRoute);
app.use("/post", postRoute);
app.use("/user", userRoute);


app.listen(process.env.PORT, () =>
  console.log(`Server ready at: http://localhost:${process.env.PORT}`))
