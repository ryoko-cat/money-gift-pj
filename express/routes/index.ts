var express = require('express');
var router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// import { Router, Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// const router = Router();

/* GET home page. */
router.get('/', async function (req: any, res: any) {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/', async function (req: any, res: any) {
  const { name, adress, tel, payAmount } = req.body;
  try {
    const users = await prisma.user.create({
      data: {
        name,
        adress,
        tel,
        payAmount
      }
    })
    return res.json(users)

  } catch (error) {
    console.log(error)
  }
})
module.exports = router;