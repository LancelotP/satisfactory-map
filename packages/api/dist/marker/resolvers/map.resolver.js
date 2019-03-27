"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const map_model_1 = require("../../map/map.model");
exports.mapResolver = {
    Marker: {
        map: async (_) => {
            const map = await typeorm_1.getConnection()
                .getRepository(map_model_1.Map)
                .createQueryBuilder("map")
                .innerJoin("map.markers", "markers", "markers.id = :markerId", {
                markerId: _.id
            })
                .getOne();
            return map;
        }
    }
};
