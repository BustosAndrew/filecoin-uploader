const express = require("express");
const router = express.Router();
const { Web3Storage } = require("web3.storage");

router.post("/upload", async (req, res) => {
	const files = req.body.files;
	const token = process.env.TOKEN;
	try {
		const storage = new Web3Storage({ token });
		const cid = await storage.put(files);
		res.send(cid + "/" + files.name);
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
