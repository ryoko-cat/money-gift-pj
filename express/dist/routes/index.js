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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// import { Router, Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// const router = Router();
/* GET home page. */
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.user.findMany();
        res.json(users);
    });
});
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, adress, tel, payAmount } = req.body;
        try {
            const users = yield prisma.user.create({
                data: {
                    name,
                    adress,
                    tel,
                    payAmount
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
