import express from 'express';
var router = express.Router();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* GET home page. */
router.get('/', async function(req: express.Request, res: express.Response, next: express.NextFunction) {  
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get('/:id', async function(req: express.Request, res: express.Response, next: express.NextFunction) {  
  const users = await prisma.user.findMany({
    where: {
      id: Number(req.params.id)
    }
  });
  res.json(users);
});

type user ={
  name: string;
  adress: string;
  tel: string;
  payAmount: number;
} 
router.post('/', async function(req: express.Request, res: express.Response, next: express.NextFunction){
  const { name, adress, tel, payAmount}:user = req.body;
  try{
    const users = await prisma.user.create({
      data: {
        name,
        adress,
        tel,
        payAmount
      }
    })
    return res.json(users)
  
  }catch(error){
    console.log(error)
  }
})
module.exports = router;