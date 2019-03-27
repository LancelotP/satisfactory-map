"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../user/user.model");
exports.resolveTypeResolver = {
    Node: {
        __resolveType: _ => {
            if (_ instanceof user_model_1.User) {
                return "User";
            }
            throw new Error();
        }
    },
    Connection: {
        __resolveType: _ => {
            return "MapMarkerConnection";
        }
    },
    Edge: {
        __resolveType: _ => {
            return "MapMarkerEdge";
        }
    }
};
