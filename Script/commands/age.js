module.exports = {
  config: {
    name: "age",
    version: "2.1",
    author: "NOBITA CHAT BOT",
    hasPermission: 0,
    commandCategory: "utility",
    cooldowns: 5,
    description: "Calculate age from birth date",
    usage: "[DD/MM/YYYY]",
    dependencies: {
      "moment-timezone": "",
      "fs-extra": "",
      "axios": ""
    }
  },

  run: async function ({ api, event, args }) {
    const fs = require("fs-extra");
    const moment = require("moment-timezone");
    const axios = require("axios");

    try {
      
      if (!args[0]) {
        return api.sendMessage("⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐘𝐨𝐮𝐫 𝐁𝐢𝐫𝐭𝐡 𝐃𝐚𝐭𝐞 𝐈𝐧 [ 𝐃𝐃 / 𝐌𝐌 / 𝐘𝐘𝐘𝐘 ⚠️ \n\n 𝐄𝐱𝐚𝐦𝐩𝐥𝐞 𝐀𝐠𝐞 10/07/2000 𝐒𝐨𝐦𝐞𝐭𝐡𝐢𝐧𝐠⚡", event.threadID);
      }

      const input = args[0];
      const dateParts = input.split('/');
      
      if (dateParts.length !== 3) {
        return api.sendMessage("𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐃𝐚𝐭𝐞 𝐅𝐨𝐫𝐦𝐚𝐭 𝐏𝐥𝐞𝐚𝐬𝐞 𝐔𝐬𝐞 𝐃𝐃 /𝐌𝐌 / 𝐘𝐘..❌ ", event.threadID);
      }

      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);

      
      if (isNaN(day) || day < 1 || day > 31) {
        return api.sendMessage("𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐃𝐚𝐲 [ 1-31 ] ❌", event.threadID);
      }
      if (isNaN(month) || month < 1 || month > 12) {
        return api.sendMessage("𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐌𝐨𝐧𝐭𝐡 [ 1-12 ] ❌ ", event.threadID);
      }
      if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
        return api.sendMessage("𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐘𝐞𝐚𝐫 ❌", event.threadID);
      }

      
      const birthDate = moment.tz(`${year}-${month}-${day}`, "YYYY-MM-DD", "Asia/Dhaka");
      const now = moment.tz("Asia/Dhaka");
      
      if (birthDate.isAfter(now)) {
        return api.sendMessage(" 𝐘𝐨𝐮 𝐂𝐚𝐧'𝐭 𝐁𝐞 𝐁𝐨𝐫𝐧 𝐈𝐧 𝐓𝐡𝐞 𝐅𝐮𝐭𝐮𝐫𝐞....💥", event.threadID);
      }

      const duration = moment.duration(now.diff(birthDate));
      
      
      const years = duration.years();
      const months = duration.months();
      const days = duration.days();
      const totalMonths = years * 12 + months;
      const totalDays = Math.floor(duration.asDays());
      const totalHours = Math.floor(duration.asHours());
      const totalMinutes = Math.floor(duration.asMinutes());
      const totalSeconds = Math.floor(duration.asSeconds());

      
      const avatarPath = `${__dirname}/cache/${event.senderID}.jpg`;
      const avatarUrl = `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      
      const response = await axios.get(avatarUrl, { responseType: 'stream' });
      const writer = fs.createWriteStream(avatarPath);
      response.data.pipe(writer);
      
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      
      const message = {
        body: `┏━━━━━━━━━━━━━━━━❂
┃ 🎂𝗔𝗚𝗘 𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗢𝗥🎂
┣━━━━━━━━━━━━━━━━❂
┃✦ 𝐃𝐚𝐭𝐞 𝐎𝐟 𝐁𝐢𝐫𝐭𝐡 : ${day}/${month}/${year}
┃✦ 𝐂𝐓 𝐀𝐠𝐞 : ${years} years ${months} months
┣━━━━[ 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 ]━━━━❂
┃❖ ${totalMonths} Months
┃❖ ${totalDays} Days
┃❖ ${totalHours} Hours
┣━━━━━━━━━━━━━━━━❂
┃🤖 𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓 🤖
┗━━━━━━━━━━━━━━━━❂`,
        attachment: fs.createReadStream(avatarPath)
      };

      await api.sendMessage(message, event.threadID);
      fs.unlinkSync(avatarPath);

    } catch (error) {
      console.error("𝐄𝐫𝐫𝐨𝐫 𝐈𝐧 𝐀𝐠𝐞 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 :", error);
      api.sendMessage("❌ 𝐀𝐧 𝐄𝐫𝐫𝐨𝐫 𝐎𝐜𝐜𝐮𝐫𝐫𝐞𝐝 𝐖𝐡𝐢𝐥𝐞 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠 𝐘𝐨𝐮𝐫 𝐑𝐞𝐪𝐮𝐞𝐬𝐭💫", event.threadID);
    }
  }
};
