import { FileAdapter } from "@grammyjs/storage-file";
import { Bot, Context, session, SessionFlavor } from "grammy";
import { MainContext, SessionData } from "./context";

const bot = new Bot<MainContext>(process.env.BOT_TOKEN!);

// Pasang middleware session, kemudian tentukan nilai awal session.
function initial(): SessionData {
  return { page: 0 };
}

// Middleware untuk mengatur session pada bot.
bot.use(session({
  initial,
  storage: new FileAdapter()
}));

// Command untuk menampilkan level UwU.
bot.command("meong", async (ctx) => {
  const count = ctx.session.page;
  await ctx.reply(`Tingkat UwU kamu berada di level ${count}!`);
});

// Middleware untuk menambah level UwU ketika ada pesan yang mengandung emoji 🐱.
bot.hears(/.*🐱.*/, (ctx) => ctx.session.page!++);

// Menjalankan bot.
bot.start();