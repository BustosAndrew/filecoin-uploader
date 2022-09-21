const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

// express config
const app = express();
const port = process.env.PORT || 5000;

// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
);

// express middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
