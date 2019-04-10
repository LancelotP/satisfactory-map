import * as next from "next";
import * as express from "express";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    "/static",
    express.static(__dirname + "/../static", {
      setHeaders(res) {
        res.setHeader("Cache-Control", "public,max-age=31536000,immutable");
      }
    })
  );

  server.get("/embed/", (req, res) => {
    return app.render(req, res, "/embed");
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
