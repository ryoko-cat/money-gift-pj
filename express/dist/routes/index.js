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
const client_1 = require("@prisma/client");
const request_1 = __importDefault(require("request"));
const prisma = new client_1.PrismaClient();
/* GET home page. */
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.user.findMany();
        res.json(users);
    });
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
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.setHeader("Access-Control-Allow-Methods", "POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
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
        (0, request_1.default)(options, function (error, responce) {
            if (error)
                throw new Error;
            console.log(responce.body);
        });
        try {
            const users = yield prisma.user.create({
                data: {
                    name,
                    adress,
                    tel,
                    payAmount,
                }
            });
            return res.json(users);
        }
        catch (error) {
            console.log(error);
        }
    });
});
module.exports = router;
