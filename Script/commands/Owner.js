const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "NOBITA CHAT BOT",
  description: "Show Owner Info with styled box & random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  
  const info = `
╔═════════════════════ ✿
║ ✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨
╠═════════════════════ ✿
║ 👑 𝗡𝗔𝗠𝗘 : 𝗦𝗔𝗟𝗠𝗔𝗡 𝗔𝗛𝗠𝗘𝗗
║ 🧸 𝗡𝗜𝗖𝗞 𝗡𝗔𝗠𝗘 : 𝗡𝗢𝗕𝗜𝗧𝗔
║ 🎂 𝗔𝗚𝗘 : 𝟭𝟴+
║ 💘 𝗥𝗘𝗟𝗔𝗧𝗜𝗢𝗡 : 𝗠𝗔𝗥𝗥𝗜𝗗
║ 🎓 𝗣𝗥𝗢𝗙𝗘𝗦𝗦𝗜𝗢𝗡 : 𝗦𝗧𝗨𝗗𝗘𝗡𝗧
║ 📚 𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡 : 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥
║ 🏡 𝗔𝗗𝗗𝗥𝗘𝗦𝗦 : 𝗝𝗔𝗠𝗔𝗟𝗣𝗨𝗥
╠═════════════════════ ✿
║ 🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
╠═════════════════════ ✿
║ 📘 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 :
║ ✔︎ facebook.com/DEATH.USER1
║ 💬 𝗠𝗘𝗦𝗦𝗘𝗡𝗚𝗘𝗥 :
║ ✔︎ https://m.me/DEATH.USER1
║ 📞 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 :
║ ✔︎ wa.me/+8801941010189
║ ✈️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 :
║ ✔︎ t.me/nobita_150
╚═════════════════════ ✿
`;

  const images = [
    "https://imgur.com/a/YVUjWxK",
    "https://imgur.com/a/3fDST5S",
    "https://imgur.com/a/UIVoAya",
    "https://imgur.com/a/qBLmHLP"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/owner.jpg")
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(__dirname + "/cache/owner.jpg"))
    .on("close", () => callback());
};
