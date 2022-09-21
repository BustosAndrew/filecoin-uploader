const express = require("express");
const router = express.Router();
const { Web3Storage } = require("web3.storage");

router.post("/upload", async (req, res) => {
	try {
		const files = [];
		files.push(req.body.files);
		const token = process.env.TOKEN;
		const storage = new Web3Storage({ token });
		const cid = await storage.put(files);
		res.send(cid);
	} catch (err) {
		res.send(err + "erroring");
	}
});

module.exports = router;
