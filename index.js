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

const hostname = "ftp--server-heroko.herokuapp.com";
const ftpport = process.env.PORT;

const ftpServer = new FtpSvr({
  url: "ftps://" + hostname + ":" + process.env.PORT,
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
