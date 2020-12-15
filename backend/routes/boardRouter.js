const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");
const User = require("../schemas/user");

router.post("/delete", async (req, res) => {
  try {
    await Board.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update", async (req, res) => {
  try {
    await Board.update(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          coName: req.body.coName,
          doWhat: req.body.doWhat,
          mylevel: req.body.mylevel,
          colevel: req.body.colevel,
          bpoint: req.body.bpoint,
          mpoint: req.body.mpoint,
          gpoint: req.body.gpoint,
        }
      }
    );
    res.json({ message: "게시글이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/write", async (req, res) => {
  try {
    let obj;

    obj = {
      writer: req.body._id,
      title: req.body.title,
      content: req.body.content,
      coName: req.body.coName,
      doWhat: req.body.doWhat,
      mylevel: req.body.mylevel,
      colevel: req.body.colevel,
      bpoint: req.body.bpoint,
      mpoint: req.body.mpoint,
      gpoint: req.body.gpoint,
    };
    const board = new Board(obj);
    await board.save();
    res.json({ message: "게시글이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getBoardList", async (req, res) => {
  try {
    const board = await Board.find({ }, null, {
      sort: { createdAt: -1 }
    });
    //정렬 & writer: _id삭제, 모든 게시글 불러오기
    const user = await User.find();
    console.log(user);
    res.json({ list: board, user:user });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const _id = req.body._id;
    const board = await Board.find({ _id });
    res.json({ board });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/searchBoardList", async (req, res) => {
  try {
    const searchval = req.body.searchval;
    const board = await Board.find({coName:searchval});
    const user= await User.find();
    res.json({ list: board, user: user});
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
