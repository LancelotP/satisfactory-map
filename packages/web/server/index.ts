import * as next from "next";
import * as express from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

async function start(port: number) {
  await app.prepare();
  const server = express();

  server.use(
    "/static",
    express.static(__dirname + "/../static", {
      setHeaders(res) {
        res.setHeader("Cache-Control", "public,max-age=31536000,immutable");
      }
    })
  );

  // server.use(
  //   "/_next",
  //   express.static(__dirname + "/../.next", {
  //     setHeaders(res) {
  //       res.setHeader("Cache-Control", "public,max-age=31536000");
  //     }
  //   })
  // );

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}

start(parseInt(process.env.PORT!, 10) || 3000);
