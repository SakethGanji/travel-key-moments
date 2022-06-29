const router = require("express").Router();
require('dotenv').config()
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const {PrismaClient} = require("@prisma/client");
const Process = require("process");
const { User } = new PrismaClient();

router.post("/register", [
    check("email", "Please input a valid email")
        .isEmail(),
    check("password", "Please input a password with a min length of 6")
        .isLength({min: 6})
], async (req, res) => {
    let { email, username, password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        })
    }

    const userExists = await User.findUnique({
        where: {
            email
        },
        select: {
            email: true
        }
    })

    if(userExists) {
        return res.status(400).json({
            msg: "user already exists"
        })
    }

    password = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        data: {
            email,
            username,
            password
        }
    })
    const token = await JWT.sign({ email }, process.env.TOKEN_KEY, {expiresIn: process.env.TOKEN_TIME});

    res.json({ newUser:username })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const loginUser = await User.findUnique({
        where: {
            email
        },
        select: {
            email: true,
            password: true
        }
    })

    if(!loginUser){
        return res.status(422).json({
            errors: [
                {
                    msg: "Invalid Credentials",
                }
            ]
        })
    }

    let isMatch = await bcrypt.compare(password, loginUser.password);

    if(!isMatch){
        return res.status(404).json({
            errors: [
                {
                    msg: "Invalid Credentials"
                }
            ]
        })
    }

    const token = await JWT.sign({email}, process.env.TOKEN_KEY, {expiresIn: Process.env.TOKEN_TIME})

    res.json({ loginUser:email })
})


module.exports = router