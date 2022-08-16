const express = require("express");
const app = express();
const port = 5000;
const FtpSvr = require("ftp-srv");

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// const server = app.listen(process.env.PORT || 5000, () => {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log(`Server running on http://${host}:${port}`);
// });
// console.log(server.address());

const hostname = "18.130.120.151";
const ftpport = 3000;

const ftpServer = new FtpSvr({
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
