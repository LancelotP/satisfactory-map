"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const deposit_model_1 = require("../../deposit/deposit.model");
exports.markersResolver = {
    Map: {
        markers: async (_) => {
            const [markers, totalCount] = await typeorm_1.getConnection()
                .getRepository(deposit_model_1.Deposit)
                .createQueryBuilder("marker")
                .innerJoin("marker.map", "map", "map.id = :mapId", { mapId: _.id })
                .getManyAndCount();
            return {
                totalCount,
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    startCursor: "TO_BE_IMPLEMENTED",
                    endCursor: "TO_BE_IMPLEMENTED"
                },
                edges: markers.map(marker => ({
                    cursor: `Marker:${marker.id}`,
                    node: marker
                }))
            };
        }
    }
};
