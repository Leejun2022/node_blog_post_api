const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require('./routes/posts.js');
const commentsRouter = require('./routes/comments.js');
const connect = require("./schemas");
connect();


app.get("/", (req, res) => {
    res.send("블로그로다~!!");
  });

app.use(express.json());

app.post("/", (req,res) => {
    console.log(req.body)

    res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.")
})

app.use("/", postsRouter);

app.use("/", commentsRouter);


app.listen(port, () => {
  console.log(port, '서버가 켜졌다!!');
});