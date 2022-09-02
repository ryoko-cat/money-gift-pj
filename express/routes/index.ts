import express from 'express'
var router = express.Router();
import { PrismaClient } from '@prisma/client';
import request from 'request';
import { json } from 'stream/consumers';

const prisma = new PrismaClient();

/* GET home page. */
router.get('/', async function (req: any, res: any) {
  const users = await prisma.user.findMany();
  res.json(users);
});


// function a(){
// var options = {
//         'method': 'GET',
//             'url': 'https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances',
//             'headers': {
//               'Accept': 'application/json;charset=UTF-8',
//               'Content-Type': 'application/json;charset=UTF-8',
//               'x-access-token': 'NzBlODYyNDQ1MTA1MDg3YTEzMDQ0ODBm'
//             }
//           };
    
//           request(options, function(error: any, responce: any){
//             if(error) throw new Error
//             console.log(responce.body)
//           })
// }
// a()


router.post('/', async function (req: any, res: any) {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  const { name, adress, tel, payAmount, token, accountId } = req.body;
  // console.log(name)
  // console.log(token)
  var options = {
    'method': 'POST',
    'url': 'https://api.sunabar.gmo-aozora.com/personal/v1/transfer/request',
    'headers': {
      'Accept': 'application/json;charset=UTF-8',
      'Content-Type': 'application/json;charset=UTF-8',
      'x-access-token': token
    },
    body: `{ \n	"accountId":"${accountId}",\n	"transferDesignatedDate":"2022-09-02", \n	"transferDateHolidayCode":"1", \n	"totalCount":"1", \n	"totalAmount":"${payAmount}", \n	"transfers":\n	[\n		{ \n			"itemId":"1", \n			"transferAmount":"${payAmount}", \n			"beneficiaryBankCode":"0310",\n			"beneficiaryBranchCode":"301", \n			"accountTypeCode":"1", \n			"accountNumber":"0005142", \n			"beneficiaryName":"ｽﾅﾊﾞ ｶｽﾞﾄ"\n		}\n	] \n}`
  };
  // console.log(payAmount)
  // console.log(typeof payAmount)
  // console.log(accountId)
  // console.log(typeof accountId)
  // console.log(options.body)

  request(options, function(error: string | undefined, responce: request.Response){
    if(error) throw new Error
    console.log(responce.body)
  })

  try {
    const users = await prisma.user.create({
      data: {
        name,
        adress,
        tel,
        payAmount,
      }
    })
    return res.json(users)

  } catch (error) {
    console.log(error)
  }

})
module.exports = router