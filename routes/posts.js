const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");
const dayjs = require("dayjs");

router.get("/posts", async (req, res) => {
  const posts = await Posts.find().sort({time: -1});
  const data = posts.map((select) => {
    return {
      postid: select._id,
      user: select.user,
      title: select.title,
      content: select.content,
      createdAt: select.time,
    };
  });

  res.json({ data });
});

router.get("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const posts = await Posts.find({ _id: _postId }).sort({time: -1});
  const data = posts.map((select) => {
    return {
      postid: select._id,
      user: select.user,
      title: select.title,
      content: select.content,
      createdAt: select.time,
    };
  });

  res.json({ data: data });
});

// 게시물 작성
router.post("/posts", async (req, res) => {
  const { user, password, title, content } = req.body;

  let now = dayjs();
  let time = now.format();
  time = time.slice(0, 16).split("T").join(" ");

  try {
    const createdPosts = await Posts.create({
      user,
      password,
      title,
      content,
      time,
    });
    res.status(201).json({ posts: createdPosts, message: "게시물 등록을 완료했습니다!" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// 게시물 수정
router.put("/posts/:_postId", async (req, res) => {
  const { content } = req.body;
  const { password } = req.body;
  const { _postId } = req.params;

  const [existsPosts] = await Posts.find({ _id: _postId });
  console.log([existsPosts]);

  if (String(password) === String(existsPosts.password)) {
    await Posts.updateOne({ _id: _postId }, { $set: { content: content } });
    res.send({ success: true, message: "수정이 완료되었습니다" });
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 틀렸습니다요~" });
  }
});

//삭제하기
router.delete("/posts/:_postId", async (req, res) => {
  const { password } = req.body;
  const { _postId } = req.params;

  const [existsPosts] = await Posts.find({ _id: _postId });
  console.log(existsPosts.password);
  if (String(password) === String(existsPosts.password)) {
    await Posts.deleteOne({ _id: _postId });
    res.send({ success: true, message: "게시물을 삭제하였습니다." });
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 틀립니다." });
  }
});

module.exports = router;
