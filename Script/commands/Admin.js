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
│ 👤 𝐍𝐀𝐌𝐄 : 𝐍𝐎𝐁𝐈𝐓𝐀
│ 🚹 𝐆𝐄𝐍𝐃𝐄𝐑 : 𝐌𝐀𝐋𝐄
│ 🎂 𝐀𝐆𝐄 : 𝟏𝟖+
│ 🕌 𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍 : 𝐈𝐒𝐋𝐀𝐌
│ 🎓 𝐄𝐃𝐔𝐂𝐀𝐓𝐈𝐎𝐍 : 𝐇𝐒𝐂
│ 🏡 𝐀𝐃𝐃𝐑𝐄𝐒𝐒 : 𝐃𝐇𝐀𝐊𝐀
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│ 📘 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 :
│✔︎ fb.com/DEATH.USER1
│ 💬 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 :
│✔︎ wa.me/01941010189
└───────────────⭓

┌───────────────⭓
│ 🕒 𝗨𝗣𝗗𝗔𝗧𝗘𝗗 𝗧𝗜𝗠𝗘
├───────────────
│ ${time}
└───────────────⭓
 `,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://i.imgur.com/idyXtoO.jpeg")
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};
