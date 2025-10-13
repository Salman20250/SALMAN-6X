const axios = require("axios");

module.exports = {
  config: {
    name: "ai",
    version: "1.0.1",
    credit: "—͟͟͞͞NOBITA CHAT BOT",
    description: "google ai",
    cooldowns: 0,
    hasPermssion: 0,
    commandCategory: "google",
    usages: {
      en: "{pn} message | photo reply"
    }
  },

  run: async ({ api, args, event }) => {
    const input = args.join(" ");
    const encodedApi = "aHR0cHM6Ly9hcGlzLWtlaXRoLnZlcmNlbC5hcHAvYWkvZGVlcHNlZWtWMz9xPQ==";
    const apiUrl = Buffer.from(encodedApi, "base64").toString("utf-8");

    if (event.type === "message_reply") {
      try {
        const imageUrl = event.messageReply.attachments[0]?.url;
        if (!imageUrl)
          return api.sendMessage("ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀɴ ɪᴍᴀɢᴇ...⚡🔥", event.threadID, event.messageID);

        const res = await axios.post(`${apiUrl}${encodeURIComponent(input || "ᴅᴇsᴄʀɪʙᴇ ᴛʜɪs ɪᴍᴀɢᴇ.")}`, {
          image: imageUrl
        });

        const result = res.data.result || res.data.response || res.data.message || "ɴᴏ ʀᴇsᴘᴏɴsᴇ ғᴏʀᴍ ᴀɪ.";
        api.sendMessage(result, event.threadID, event.messageID);
      } catch (err) {
        console.error("Error:", err.message);
        api.sendMessage("ᴘʀᴏᴄᴇssɪɴɢ....♻️", event.threadID, event.messageID);
      }
    } else {
      if (!input) {
        return api.sendMessage(
          "𝐇𝐞𝐲 𝐈'𝐦 𝐀𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭\n𝐇𝐨𝐰 𝐂𝐚𝐧 𝐈 𝐀𝐬𝐬𝐢𝐬𝐭 𝐘𝐨𝐮 𝐓𝐨𝐝𝐚𝐲..?",
          event.threadID,
          event.messageID
        );
      }

      try {
        const res = await axios.get(`${apiUrl}${encodeURIComponent(input)}`);
        const result = res.data.result || res.data.response || res.data.message || "ɴᴏ ʀᴇsᴘᴏɴsᴇ ғᴏʀᴍ ᴀɪ.";
        api.sendMessage(result, event.threadID, event.messageID);
      } catch (err) {
        console.error("Error:", err.message);
        api.sendMessage("ʙᴏss ɴᴏʙɪᴛᴀ ʀᴇ ᴅᴀᴋʜ ᴇɪɪ ғɪʟᴇ ɢᴀᴄᴇ 😑", event.threadID, event.messageID);
      }
    }
  }
};
