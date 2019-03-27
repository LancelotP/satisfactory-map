"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const map_model_1 = require("../map.model");
exports.defaultMapQuery = {
    Query: {
        defaultMap: () => {
            return typeorm_1.getConnection()
                .getRepository(map_model_1.Map)
                .findOneOrFail(1);
        }
    }
};
