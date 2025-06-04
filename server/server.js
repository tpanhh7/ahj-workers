const Koa = require("koa");
const slow = require("koa-slow");
const Router = require("koa-router");
const cors = require("@koa/cors")

const app = new Koa();
const router = new Router();

app.use(cors({
  origin: ['https://tpanhh7.github.io', 'http://localhost:8080'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  credentials: true
}));

app.use(
  slow({
    delay: 2000,
  })
);

router.get("/news", async (ctx) => {
  ctx.body = [
    {
      id: 1,
      title: "Новый фильм Marvel",
      content: "Выход новой части 'Мстителей' ожидается в 2024 году.",
    },
    { id: 2, title: "Оскар 2024", content: "Объявлены номинанты на премию Оскар." }
  ];
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
