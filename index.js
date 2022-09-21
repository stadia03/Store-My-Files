require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("./gaurab_Service");
//const uuid = require("uuid").v4;
const app = express();

//single file upload
// const upload = multer({ dest: "uploads/" });
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ status: "success" });
// });

// multiple file uploads
// const upload = multer({ dest: "uploads/" });
// app.post("/upload", upload.array("file", 2), (req, res) => {
//   res.json({ status: "success" });
// });



const storage = multer.memoryStorage();



const upload = multer({
  storage,

});

app.post("/upload", upload.array("file"), async (req, res) => {
  try {
    const results = await s3Uploadv2(req.files);
    console.log(results);
    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
  }
});



app.listen(5000, () => console.log("listening on port 5000"));
