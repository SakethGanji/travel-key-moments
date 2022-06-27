const express = require("express");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()


app.listen(process.env.PORT, () =>
    console.log(`Server ready at: http://localhost:${process.env.PORT}`)
)
