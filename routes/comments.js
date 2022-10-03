const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");
const Comments = require("../schemas/comment");
const dayjs = require("dayjs");

// router.get("/comments", async (req, res) => {
//   const comments = await Comments.find();
//   res.json({ comments });
// });

router.get("/comments/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const comments = await Comments.find({ _postId: _postId });
  const commentdata = comments.map((select) => {
    return {
      commentid: select._id,
      user: select.user,
      content: select.content,
      createdAt: select.time,
    };
  });
  res.json({ commentdata });
});

router.post("/comments/:_postId", async (req, res) => {
  const { user, password, content } = req.body;
  var now = dayjs();
  var time = now.format();
  time = time.slice(0, 16).split("T").join(" ");

  const { _postId } = req.params;
  const postId = await Posts.find({ _id: _postId });
  console.log(postId)

  try {
    const createdComments = await Comments.create({
      _postId,
      user,
      password,
      content,
      time,
    });
    res.status(200).json({ comments: createdComments, Message: "댓글 등록완료!" });
  } catch(error) {
    res.status(400).send(error)
  }
  
});


router.put("/comments/:_commentId", async (req, res) => {
  const { content } = req.body;
  const { password } = req.body;
  const { _commentId } = req.params;

  const [existsComments] = await Comments.find({ _id: _commentId });
  console.log([existsComments]);

  if (String(password) === String(existsComments.password)) {
    await Comments.updateOne(
      { _id: _commentId },
      { $set: { content: content } }
    );
    res.send({ success: true, message: "수정이 완료되었습니다" });
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 틀렸습니다요~!" });
  }
});

router.delete("/comments/:_commentId", async (req, res) => {
  const { password } = req.body;
  const { _commentId } = req.params;

  const [existsComments] = await Comments.find({ _id: _commentId });
  console.log([existsComments]);
  if (String(password) === String(existsComments.password)) {
    await Comments.deleteOne({ _id: _commentId });
    res.send({ success: true, message: "댓글을 삭제하였습니다." });
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 틀렸지롱~!" });
  }
});

module.exports = router;
