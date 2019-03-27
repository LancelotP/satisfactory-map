"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const deposit_model_1 = require("../deposit.model");
exports.addedByResolver = {
    Deposit: {
        addedBy: _ => {
            console.log(_);
            return typeorm_1.getConnection()
                .getRepository(deposit_model_1.Deposit)
                .createQueryBuilder("deposit")
                .relation("creator")
                .of(_)
                .loadOne();
        }
    }
};
