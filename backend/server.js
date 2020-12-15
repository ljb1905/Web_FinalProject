const express = require("express");
const app = express();
const cors = require("cors");
//동일 기원이 아니더라도 접근 허용
const session = require("express-session");
const connect = require("./schemas");



connect();
//index.js 실행

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "test",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use(cors(corsOptions));

app.use(express.json());
//데이터 전달 원활
app.use(express.urlencoded({ extended: true }));
//추가적인 배열 데이터도 받아서 쓸 수 있음

app.use("/member", require("./routes/memberRouter"));
app.use("/board", require("./routes/boardRouter"));

app.listen(8080, () => {
  console.log("listening...");
});
