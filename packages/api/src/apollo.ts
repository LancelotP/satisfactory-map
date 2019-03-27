import { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { User } from "./user/user.model";
import { getConnection } from "typeorm";
import { retrieveUserFromAuth0 } from "./user/user.service";

type ThenArg<T> = T extends Promise<infer U> ? U : any;

export function applyApolloMiddleware(app: Application) {
  const apolloServer = new ApolloServer({
    schema: schema,
    context: generateContext()
  });

  apolloServer.applyMiddleware({ app });
}

export interface GQLContext {
  viewer: User | undefined;
  sub: string | undefined;
}

export function generateContext() {
  return async ({ req }: { req?: Express.Request }): Promise<GQLContext> => {
    let viewer: User | undefined;
    let sub: string | undefined;

    if (req && req.user && req.user.sub) {
      sub = req.user.sub;
    }

    if (sub) {
      viewer = await getConnection()
        .getRepository(User)
        .findOne({ where: { sub } });
    }

    if (!viewer && sub) {
      let auth0User: ThenArg<typeof retrieveUserFromAuth0>;

      try {
        auth0User = await retrieveUserFromAuth0(sub);
      } catch (e) {
        console.error("error retrieving user from auth0", e.message);
      }

      if (auth0User) {
        viewer = new User();
        viewer.email = auth0User.email;
        viewer.firstName = auth0User.firstName;
        viewer.lastName = auth0User.lastName;
        if (auth0User.userName) {
          viewer.userName = auth0User.userName;
        } else if (auth0User.firstName) {
          viewer.userName = [auth0User.firstName, auth0User.lastName]
            .filter(Boolean)
            .join(" ");
        }

        viewer.sub = auth0User.sub;
        viewer = await getConnection()
          .getRepository(User)
          .save(viewer);
      }
    }

    return {
      viewer,
      sub
    };
  };
}
