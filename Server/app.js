require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { File } = require("@web-std/file");
const { Blob } = require("@web-std/blob");
const multer = require("multer");
const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({ dest: "uploads/" });
var cors = require("cors");
const server = require("./backend/Controller/user");
const app = express();
const config = require("./backend/Config/db_config");
const { Web3Storage } = require("web3.storage");
const { CircularProgress } = require("@material-ui/core");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
	.connect(process.env.URL)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));
var port = process.env.PORT || 3001;

app.use("/", server);

app.post(
	"/api/uploadimages",
	upload.fields([{ name: "images" }, { name: "doc" }]),
	async (req, res, next) => {
		try {
			console.log(req.files.images);
			const client = new Web3Storage({
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA3MEYwMkM4NjZEOTRCMjFFQjE0YTdiOWRENTcwZjFhQjMxOEZjQUMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTk3MjM0NjIzNjcsIm5hbWUiOiJuZXVyb3NhZmUifQ.HeNCpTDYnlmGBXmIT06p4-sae19K7MpTz4Mtl0Bm_qE",
			});
			// const obj = req.body;

			// const files = [new File([blob], "hello.pdf")];
			// const Files = await getFilesFromPath(path);
			// console.log(Files);
			// const cid = await client.put(files);
			// console.log("Content added with CID:", cid);
			// res.status(200).json({ cid: cid });
		} catch (err) {
			console.log(err);
		}
	}
);

app.post("/api/upload", upload.any(), async (req, res, next) => {
	try {
		console.log(req.body);
		// console.log(req.body);
		return res.json({});
		const client = new Web3Storage({
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA3MEYwMkM4NjZEOTRCMjFFQjE0YTdiOWRENTcwZjFhQjMxOEZjQUMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTk3MjM0NjIzNjcsIm5hbWUiOiJuZXVyb3NhZmUifQ.HeNCpTDYnlmGBXmIT06p4-sae19K7MpTz4Mtl0Bm_qE",
		});
		const obj = req.body;
		const blob = new Blob([JSON.stringify(obj)], {
			type: "application/json",
		});
		const files = [new File([blob], "hello.json")];
		// const Files = await getFilesFromPath(path);
		// console.log(Files);
		const cid = await client.put(files);
		console.log("Content added with CID:", cid);
		res.status(200).json({ cid: cid });
	} catch (err) {
		console.log(err);
	}
});

app.listen(port);
console.log("App is running on port " + port);
