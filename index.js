const express = require("express");
const path = require("path");
const { startJsonServer } = require("./server"); // Импортируем функцию запуска JSON Server

const PORT = process.env.PORT || 5001;

const app = express();

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    startJsonServer(); // Запускаем JSON Server при старте основного сервера
  });
