const express = require("express");
const router = express.Router();
const { Duplex } = require("stream"); // Native Node Module
const { Web3Storage } = require("web3.storage");

function bufferToStream(myBuffer) {
	let tmp = new Duplex();
	tmp.push(myBuffer);
	tmp.push(null);
	return tmp;
}

router.post("/upload", async (req, res) => {
	try {
		if (!req.files) {
			res.send({
				status: false,
				message: "No file uploaded",
			});
		} else {
			const files = [];
			const fileStream = bufferToStream(req.files.file.data);
			files.push({ name: req.files.file.name, stream: () => fileStream }); // has to be passed in this way :)

			const token = process.env.TOKEN;
			const storage = new Web3Storage({ token });
			const cid = await storage.put(files);
			const fileUrl = encodeURI(
				`https://${cid}.ipfs.w3s.link/${req.files.file.name}`
			);

			res.send({ fileUrl });
		}
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
