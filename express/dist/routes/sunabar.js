"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const request_1 = __importDefault(require("request"));
let getInfo;
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var options = {
            'method': 'GET',
            'url': 'https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances',
            'headers': {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': 'NzBlODYyNDQ1MTA1MDg3YTEzMDQ0ODBm' //アクセスしてきた人のトークンの必要性
            },
            json: true
        };
        (0, request_1.default)(options, function (error, responce) {
            if (error)
                throw new Error;
            console.log(responce.body);
            getInfo = responce.body;
            // responce.json(responce.body.balances[0].balance)
        });
        res.json(getInfo);
    });
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
router.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var options = {
            'method': 'POST',
            'url': 'https://api.sunabar.gmo-aozora.com/personal/v1/transfer/request',
            'headers': {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': '???' // ???参加者それぞれのtokenにする必要あり！！ そうすればbodyのaccountIdと紐づきそう? postmanも自分のaccountIdは入れてないけど自動で入ってる
            },
            body: `{ \n	"accountId":{{accountId}}, \n	"transferDesignatedDate":${today}, \n	"transferDateHolidayCode":"1", \n	"totalCount":"1", \n	"totalAmount":"30000", \n	"transfers":\n	[\n		{ \n			"itemId":"1", \n			"transferAmount":"30000", \n			"beneficiaryBankCode":"0310",\n			"beneficiaryBranchCode":"301", \n			"accountTypeCode":"1", \n			"accountNumber":"0005142", \n			"beneficiaryName":"ｽﾅﾊﾞﾋﾅｺ (ｶ"\n		}\n	] \n}`,
            json: true
        };
        (0, request_1.default)(options, function (error, responce) {
            if (error)
                throw new Error;
            console.log(responce.body);
            getInfo = responce.body;
            // responce.json(responce.body.balances[0].balance)
        });
    });
});
module.exports = router;
