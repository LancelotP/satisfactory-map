"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const deposit_model_1 = require("../deposit.model");
const map_model_1 = require("../../map/map.model");
const apollo_server_core_1 = require("apollo-server-core");
exports.depositeCreateMutation = {
    Mutation: {
        depositCreate: async (_, args, ctx) => {
            if (!ctx.viewer) {
                throw new apollo_server_core_1.AuthenticationError("You must be logged");
            }
            const repo = typeorm_1.getConnection().getRepository(deposit_model_1.Deposit);
            const map = await typeorm_1.getConnection()
                .getRepository(map_model_1.Map)
                .findOneOrFail(1);
            return await repo.save(repo.create(Object.assign({}, args.input, { map, creator: ctx.viewer })));
        }
    }
};
