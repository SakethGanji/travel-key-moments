const express = require('express')
const postRoute = require("../routes/posts")
const userRoute = require("../routes/user")

const app = express()

app.use(express.json());

app.use("/post", postRoute);
app.use("/user", userRoute);


app.listen(3000, () =>
  console.log(`Server ready at: http://localhost:3000`))
