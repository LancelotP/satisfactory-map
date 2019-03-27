import { ManagementClient } from "auth0";

const managementClient = new ManagementClient({
  domain: process.env.AUTH0_MANAGEMENT_DOMAIN,
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
});

export async function retrieveUserFromAuth0(sub: string) {
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
