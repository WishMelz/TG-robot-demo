const TelegramBot = require('node-telegram-bot-api');

const token = "xxxxx" // 换成你的Token

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome");
});

// 发送图片
bot.onText(/\/img/, (msg) => {
    var url = getImgUrl();
    bot.sendPhoto(msg.chat.id, url);
});
// 发送视频
// bot.onText(/\/video/, (msg) => {
//     var url = getVideoUrl();
//     bot.sendMessage(msg.chat.id, url);
// });

bot.onText(/\/video/, (msg) => {
    var url = getVideoUrl();
    bot.sendVideo(msg.chat.id, url);
});
// 发送图片 加上文字
bot.onText(/\/imgs/, (msg) => {
    var url = 'https://cdn.jsdelivr.net/gh/WishMelz/file/image/53b0ffcc91ac04c56ab9d5b27a6383eb.jpg'
    bot.sendPhoto(msg.chat.id, url, { caption: "图片来之GitHub！\n使用imgurl" });
});

// 使用键盘 -- 让用户发送自己设定的列表ITEM
bot.onText(/\/keyboards/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            // 二维数组结构 
            "keyboard": [["第一行第一个", "第一行第二个"], ["第二行"], ["第三行"]]
        }
    });
});

// 解析模式有html和Markdown两种
bot.onText(/\/parsemode/, (msg) => {
    let str = '<i>Welcome</i> \n <span style="color:red;">Welcome</span> \n <a href=\"http://itsse.cn/\">inline URL</a>'
    bot.sendMessage(msg.chat.id, str, { parse_mode: "HTML" });
});


bot.on('message', (msg) => {
    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Have a nice day " + msg.from.first_name);
    }
});