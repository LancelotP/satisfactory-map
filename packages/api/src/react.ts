import * as express from "express";
import * as path from "path";

export function applyReactMiddleware(app: express.Application) {
  if (process.env.NODE_ENV === "production") {
    app.get(
      "/static",
      express.static(path.join(__dirname, "../../next/out/static"), {
        maxAge: 31536000
      })
    );

    app.use(express.static(path.join(__dirname, "../../next/out")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../next/out", "index.html"));
    });
  } else {
    app.get("*", (req, res) => res.redirect("/graphql"));
  }
}
