import { Auth0DecodedHash, WebAuth, Auth0UserProfile } from "auth0-js";

if (!window.location.origin) {
  // POLYFILL FOR IE
  // @ts-ignore
  window.location.origin =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "");
}

const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientID = process.env.REACT_APP_AUTH0_CLIENTID!;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE!;

const webAuth = new WebAuth({
  domain,
  clientID,
  audience,
  scope: "openid profile",
  responseType: "token id_token",
  redirectUri: `${window.location.origin}/callback`
});

export async function login() {
  localStorage.setItem("returnTo", window.location.pathname);
  webAuth.authorize();
}

export async function logout() {
  localStorage.removeItem("accessToken");

  webAuth.logout({
    clientID,
    returnTo: window.location.origin
  });
}

export async function handleCallback() {
  let authResult;

  try {
    const hash = window.location.hash.slice();
    authResult = await getAccessTokenFromHash(hash);
  } catch (e) {
    // TODO: SENTRY
    console.error("Cannot retrieve authResult", e);
    throw e;
  }

  localStorage.setItem("accessToken", authResult.accessToken!);
  setTimeout(renewSession, authResult.expiresIn! * 1000);

  return localStorage.getItem("returnTo");
}

async function getAccessTokenFromHash(hash: string) {
  return new Promise<Auth0DecodedHash>((resolve, reject) => {
    webAuth.parseHash({ hash }, (err, authResult) => {
      if (err) {
        reject(err);
      } else if (!authResult || !authResult.accessToken) {
        reject();
      } else {
        resolve(authResult);
      }
    });
  });
}

export async function getUserInfo(): Promise<Auth0UserProfile> {
  const { accessToken } = await checkSession();

  if (!accessToken) {
    throw new Error("cannot retrieve access token");
  }

  return new Promise((resolve, reject) => {
    webAuth.client.userInfo(accessToken, (err, profile) => {
      if (err) {
        reject(err);
      } else if (!profile) {
        reject();
      } else {
        resolve(profile);
      }
    });
  });
}

export async function renewSession() {
  try {
    const authResult = await checkSession();

    localStorage.setItem("accessToken", authResult.accessToken!);
    console.info("session renewed");

    setTimeout(renewSession, authResult.expiresIn! * 1000);
  } catch (e) {
    localStorage.removeItem("accessToken");
    console.info("not logged in", e);
    return;
  }
}

async function checkSession() {
  return new Promise<Auth0DecodedHash>((resolve, reject) => {
    webAuth.checkSession({}, (err, authResult) => {
      if (err) {
        reject(err);
      } else if (!authResult || !authResult.accessToken) {
        reject();
      } else {
        resolve(authResult);
      }
    });
  });
}

export async function resetPassword(email: string) {
  return await new Promise((resolve, reject) => {
    webAuth.changePassword(
      {
        connection: "Username-Password-Authentication",
        email
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}
