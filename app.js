const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require('crypto');
const helmet = require('helmet');

const rootDir = require("./util/path");

const app = express();


app.set("view engine", "ejs");
app.set("views", "views");

const loginRoutes = require("./routes/auth");

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, "public")));
app.use((req, res, next) => {
    const nonce = crypto.randomBytes(16).toString('base64');
      res.locals.nonce = nonce;
      const cspValue = `script-src 'self' 'nonce-${nonce}'`;
    res.setHeader('Content-Security-Policy', cspValue);
      next();
  });

app.use(loginRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
