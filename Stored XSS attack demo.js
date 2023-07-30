const express = require("express");
const session = require("express-session");
const fs = require("fs");

const PORT = process.env.PORT || 4001;
const app = express();
 
let reviews = [];
  
app.use(express.static("public"));
app.use(
  session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
    },
  })
);

app.get("/", function (req, res) {
  if (req.query.newReview) reviews.push(req.query.newReview);
  const formattedReviews = reviews
    .map((review) => `<dt>User</dt><dd>${review}</dd>`)
    .join(" ");
  const template = fs.readFileSync("./templates/index.html", "utf8");
  const view = template.replace("$reviews$", formattedReviews);
  res.send(view);
});

app.listen(PORT, () =>
  console.log(`The server is listening at port: http://localhost:${PORT}`)
);