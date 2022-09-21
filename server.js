const express = require("express");
const cors = require("cors");

// express config
const app = express();
const port = process.env.PORT || 5000;

// express middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, "public")));

// express routers
const uploadsRouter = require("./routes/uploads");

app.use("/uploads", uploadsRouter);

app.get("/", (req, res) => {
	res.send("hello world");
});

app.listen(port, () => {
	//console.log(`express listening at http://localhost:${port}`);
});
