import express from 'express';
var router = express.Router();

import request from 'request';

let getInfo: any;
router.get('/', async function(req: express.Request, res: express.Response, next: express.NextFunction) {  
    var options = {
        'method': 'GET',
            'url': 'https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances',
            'headers': {
              'Accept': 'application/json;charset=UTF-8',
              'Content-Type': 'application/json;charset=UTF-8',
              'x-access-token': 'NzBlODYyNDQ1MTA1MDg3YTEzMDQ0ODBm'  //アクセスしてきた人のトークンの必要性
            },
            json:true
          };
    
          request(options, function(error: string | undefined, responce: request.Response){
            if(error) throw new Error
            console.log(responce.body)
            getInfo= responce.body
            // responce.json(responce.body.balances[0].balance)
          })
          res.json(getInfo)
  });
  

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



const date = new Date();
const today = date.toISOString().split('T')[0];
//fetch or axiosでつながってくる先↓

router.post("/", async function(req: express.Request, res: express.Response, next: express.NextFunction){ //??? totalAmount, 宛先への変数の当て方
    var options = {
        'method': 'POST',
        'url': 'https://api.sunabar.gmo-aozora.com/personal/v1/transfer/request',
        'headers': {
          'Accept': 'application/json;charset=UTF-8',
          'Content-Type': 'application/json;charset=UTF-8',
          'x-access-token': '???'// ???参加者それぞれのtokenにする必要あり！！ そうすればbodyのaccountIdと紐づきそう? postmanも自分のaccountIdは入れてないけど自動で入ってる
        },
        body: `{ \n	"accountId":{{accountId}}, \n	"transferDesignatedDate":${today}, \n	"transferDateHolidayCode":"1", \n	"totalCount":"1", \n	"totalAmount":"30000", \n	"transfers":\n	[\n		{ \n			"itemId":"1", \n			"transferAmount":"30000", \n			"beneficiaryBankCode":"0310",\n			"beneficiaryBranchCode":"301", \n			"accountTypeCode":"1", \n			"accountNumber":"0005142", \n			"beneficiaryName":"ｽﾅﾊﾞﾋﾅｺ (ｶ"\n		}\n	] \n}`,
        json: true
      };
      request(options, function(error: string | undefined, responce: request.Response){
        if(error) throw new Error
        console.log(responce.body)
        getInfo= responce.body
        // responce.json(responce.body.balances[0].balance)
      })
})
module.exports = router;