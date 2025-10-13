const axios = require("axios");

module.exports.config = {
 name: "bkashf",
 version: "1.0",
 hasPermssion: 0,
 credits: "NOBITA CHAT BOT",
 description: "Create a fake Bkash screenshot",
 usePrefix: true,
 prefix: true,
 commandCategory: "Fun",
 usages: "<number> - <transaction ID> - <amount>",
 cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
 const input = args.join(" ");
 if (!input.includes("-")) {
 return api.sendMessage(
 `𝐖𝐫𝐨𝐧𝐠 𝐅𝐨𝐫𝐦𝐚𝐭 🌸\n𝐔𝐬𝐞 : ${global.config.PREFIX}bkashf 017xxxxxxxx - TXN12345 - 1000`,
 event.threadID,
 event.messageID
 );
 }

 const [numberRaw, transactionRaw, amountRaw] = input.split("-");
 const number = numberRaw.trim();
 const transaction = transactionRaw.trim();
 const amount = amountRaw.trim();

 const url = `https://masterapi.site/api/bkashf.php?number=${encodeURIComponent(number)}&transaction=${encodeURIComponent(transaction)}&amount=${encodeURIComponent(amount)}`;

 api.sendMessage(
 `📤 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗜𝗡𝗚 𝗙𝗔𝗞𝗘 𝗕𝗞𝗔𝗦𝗛 𝗦𝗦 𝗣𝗟𝗘𝗔𝗦𝗘 𝗪𝗔𝗜𝗧...🕐`,
 event.threadID,
 (err, info) =>
 setTimeout(() => {
 api.unsendMessage(info.messageID);
 }, 4000)
 );

 try {
 const response = await axios.get(url, { responseType: "stream" });
 const attachment = response.data;

 api.sendMessage(
 {
 body: `━━━━━━━━━━━━━━━━━━\n📸 𝗙𝗔𝗞𝗘 𝗕𝗞𝗔𝗦𝗛 𝗦𝗖𝗥𝗘𝗘𝗡𝗦𝗛𝗢𝗧 ✅\n━━━━━━━━━━━━━━━━━━\n\n📱 𝗠𝗢𝗕𝗜𝗟𝗘 𝗡𝗨𝗠𝗕𝗘𝗥 : ${number}\n🧾 𝗧𝗫𝗡 𝗜𝗗 : ${transaction}\n💵 𝗔𝗠𝗢𝗨𝗡𝗧 : ৳${amount}\n\n📤 𝗬𝗢𝗥𝗥 𝗙𝗔𝗞𝗘 𝗕𝗞𝗔𝗦𝗛 𝗥𝗘𝗖𝗘𝗜𝗣𝗧 𝗥𝗘𝗔𝗗𝗬🌸\n\n━━━━━━━━━━━━━━━━━━\n\n🛠 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 : ─꯭─⃝‌‌𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓\n━━━━━━━━━━━━━━━━━━`,
 attachment,
 },
 event.threadID,
 event.messageID
 );
 } catch (err) {
 console.error(err);
 api.sendMessage(
 "𝐀𝐧 𝐄𝐫𝐫𝐨𝐫 𝐎𝐜𝐜𝐮𝐫𝐫𝐞𝐝 𝐖𝐡𝐢𝐥𝐞 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐧𝐠 𝐓𝐡𝐞 𝐒𝐜𝐫𝐞𝐞𝐧𝐬𝐡𝐨𝐭💥",
 event.threadID,
 event.messageID
 );
 }
};
