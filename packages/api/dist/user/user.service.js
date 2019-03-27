"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth0_1 = require("auth0");
const managementClient = new auth0_1.ManagementClient({
    domain: process.env.AUTH0_MANAGEMENT_DOMAIN,
    clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
});
async function retrieveUserFromAuth0(sub) {
    const user = await managementClient.getUser({ id: sub });
    if (!user) {
        return undefined;
    }
    return {
        firstName: user.given_name,
        lastName: user.family_name,
        userName: user.username,
        email: user.email,
        sub: user.user_id
    };
}
exports.retrieveUserFromAuth0 = retrieveUserFromAuth0;
