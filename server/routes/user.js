const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { User } = new PrismaClient();

router.get('/', async (req, res) => {
    let users = await User.findMany({
        select: {
            username: true,
            id:true,
            posts: true
        }
    })

    res.json(users)
})


module.exports = router