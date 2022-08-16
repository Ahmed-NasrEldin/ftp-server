const express = require("express");
const app = express();
const port = 5000;
const FtpSvr = require("ftp-srv");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const hostname = "0.0.0.0";
const ftpport = 5053;

const ftpServer = new FtpSvr({
  url: "ftp://" + hostname + ":" + ftpport,
  pasv_url: "ftp://172.18.56.71",
  pasv_min: 5054,
  pasv_max: 5055,
  file_format: "ls",
  anonymous: false,
  greeting: ["Hello user"],
});

ftpServer.on("login", (data, resolve, reject) => {
  //   console.log(data);
  if (data.username === "user1" && data.password === "ip1") {
    // call resolve
    console.log("connected");
    return resolve({ root: "./uploads/" });
  } else {
    console.log("rejected");
    // if password and username are incorrectly then call reject
    reject({});
  }
});
ftpServer.listen().then(() => {
  console.log(`Server Running at ftp://${hostname}:${ftpport}/`);
});
