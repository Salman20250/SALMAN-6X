const axios = require('axios');
const fs = require('fs');

const xyz = "ArYANAHMEDRUDRO";

module.exports = {
 config: {
 name: "4k",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "—͟͟͞͞NOBITA CHAT BOT",
 premium: false,
 description: "Enhance Photo - Image Generator",
 commandCategory: "Image Editing Tools",
 usages: "Reply to an image or provide image URL",
 cooldowns: 5,
 dependencies: {
 path: "",
 'fs-extra': ""
 }
 },

 run: async function({ api, event, args }) {
 const tempImagePath = __dirname + '/cache/enhanced_image.jpg';
 const { threadID, messageID } = event;

 const imageUrl = event.messageReply ? 
 event.messageReply.attachments[0].url : 
 args.join(' ');

 if (!imageUrl) {
 api.sendMessage("ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀɴ ɪᴍᴀɢᴇ ᴏʀ ᴘʀᴏᴠɪᴅᴇ ɪᴍᴀɢᴇ ᴜʀʟ..🌸", threadID, messageID);
 return;
 }

 try {
 const processingMsg = await api.sendMessage("ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ ʙᴀʙᴇ...💚", threadID);

 const apiUrl = `https://aryan-xyz-upscale-api-phi.vercel.app/api/upscale-image?imageUrl=${encodeURIComponent(imageUrl)}&apikey=${xyz}`;

 const enhancementResponse = await axios.get(apiUrl);
 const enhancedImageUrl = enhancementResponse.data?.resultImageUrl;

 if (!enhancedImageUrl) {
 throw new Error("ғᴀɪʟᴇᴅ ᴛᴏ ɢᴇᴛ ᴇɴʜᴀɴᴄᴇᴅ ɪᴍᴀɢᴇ ᴜʀʟ..");
 }

 const enhancedImage = (await axios.get(enhancedImageUrl, { responseType: 'arraybuffer' })).data;

 fs.writeFileSync(tempImagePath, Buffer.from(enhancedImage, 'binary'));

 api.sendMessage({
 body: "𝐈𝐦𝐚𝐠𝐞 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐃𝐨𝐧𝐞 💙",
 attachment: fs.createReadStream(tempImagePath)
 }, threadID, () => fs.unlinkSync(tempImagePath), messageID);

 api.unsendMessage(processingMsg.messageID);

 } catch (error) {
 api.sendMessage(`❌ Error`, threadID, messageID);
 }
 }
};
