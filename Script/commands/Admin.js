const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "admin",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "NOBITA CHAT BOT",
 description: "Show Owner Info",
 commandCategory: "info",
 usages: "admin",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
┌───────────────⭓
│ 𝗢𝗪𝗡𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦
├───────────────
│ 👤 𝐍𝐀𝐌𝐄 : 𝐒𝐀𝐋𝐌𝐀𝐍 𝐀𝐇𝐌𝐄𝐃
│ 🚹 𝐆𝐄𝐍𝐃𝐄𝐑 : 𝐌𝐀𝐋𝐄
│ ❤️ 𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍 : 𝐌𝐀𝐑𝐑𝐈𝐃
│ 🎂 𝐀𝐆𝐄 : 𝟏𝟖+
│ 🕌 𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍 : 𝐈𝐒𝐋𝐀𝐌
│ 🎓 𝐄𝐃𝐔𝐂𝐀𝐓𝐈𝐎𝐍 : 𝐇𝐒𝐂 (𝟐𝟎𝟐𝟔)
│ 🏡 𝐀𝐃𝐃𝐑𝐄𝐒𝐒 : 𝐉𝐀𝐌𝐀𝐋𝐏𝐔𝐑
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│ 📘 𝗠𝗘𝗦𝗦𝗘𝗡𝗚𝗘𝗥 :
│ ✔︎ https://m.me/DEATH.USER1
│ 💬 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 :
│ ✔︎ https://wa.me/+88019410189
└───────────────⭓

┌───────────────⭓
│ 🕒 𝗨𝗣𝗗𝗔𝗧𝗘𝗗 𝗧𝗜𝗠𝗘 🕒
├───────────────
│ ${time}
└───────────────⭓
 `,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://imgur.com/a/TWPDxHY")
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};
