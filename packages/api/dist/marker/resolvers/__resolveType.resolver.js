"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deposit_model_1 = require("../../deposit/deposit.model");
exports.resolveTypeResolver = {
    Marker: {
        __resolveType: _ => {
            if (_ instanceof deposit_model_1.Deposit) {
                return "Deposit";
            }
            throw new Error("Unexpected server error");
        }
    }
};
