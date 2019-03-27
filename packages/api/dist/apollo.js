"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
const user_model_1 = require("./user/user.model");
const typeorm_1 = require("typeorm");
const user_service_1 = require("./user/user.service");
function applyApolloMiddleware(app) {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: schema_1.default,
        context: generateContext()
    });
    apolloServer.applyMiddleware({ app });
}
exports.applyApolloMiddleware = applyApolloMiddleware;
function generateContext() {
    return async ({ req }) => {
        let viewer;
        let sub;
        if (req && req.user && req.user.sub) {
            sub = req.user.sub;
        }
        if (sub) {
            viewer = await typeorm_1.getConnection()
                .getRepository(user_model_1.User)
                .findOne({ where: { sub } });
        }
        if (!viewer && sub) {
            let auth0User;
            try {
                auth0User = await user_service_1.retrieveUserFromAuth0(sub);
            }
            catch (e) {
                console.error("error retrieving user from auth0", e.message);
            }
            if (auth0User) {
                viewer = new user_model_1.User();
                viewer.email = auth0User.email;
                viewer.firstName = auth0User.firstName;
                viewer.lastName = auth0User.lastName;
                if (auth0User.userName) {
                    viewer.userName = auth0User.userName;
                }
                else if (auth0User.firstName) {
                    viewer.userName = [auth0User.firstName, auth0User.lastName]
                        .filter(Boolean)
                        .join(" ");
                }
                viewer.sub = auth0User.sub;
                viewer = await typeorm_1.getConnection()
                    .getRepository(user_model_1.User)
                    .save(viewer);
            }
        }
        return {
            viewer,
            sub
        };
    };
}
exports.generateContext = generateContext;
