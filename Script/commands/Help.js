const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports.config = {
    name: "help",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "NOBITA CHAT BOT",
    description: "Shows all commands with details",
    commandCategory: "system",
    usages: "[command name/page number]",
    cooldowns: 5,
    envConfig: {
        autoUnsend: true,
        delayUnsend: 20
    }
};

module.exports.languages = {
    "en": {
        "moduleInfo": `╭━━━━━━━━━━━━━━━━╮
┃ ✨ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐈𝐍𝐅𝐎 ✨
┣━━━━━━━━━━━┫
┃ 🔖 𝐍𝐀𝐌𝐄 : %1
┃ 📄 𝐔𝐒𝐀𝐆𝐄 : %2
┃ 📜 𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍 : %3
┃ 🔑 𝐏𝐄𝐑𝐌𝐈𝐒𝐒𝐈𝐎𝐍 : %4
┃ 👨‍💻 𝐂𝐑𝐄𝐃𝐈𝐓 : %5
┃ 📂 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐘 : %6
┃ ⏳ 𝐂𝐎𝐎𝐋𝐃𝐎𝐖𝐍 : %7s
┣━━━━━━━━━━━━━━━━┫
┃ ⚙  𝐏𝐑𝐄𝐅𝐈𝐗 : %8
┃ 🤖 𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : %9
┃ 👑 𝐀𝐃𝐌𝐈𝐍 : 𝐒𝐀𝐋𝐌𝐀𝐍 💛
╰━━━━━━━━━━━━━━━━╯`,
        "𝐇𝐞𝐥𝐩 𝐋𝐢𝐬𝐭": "[ 𝐓𝐡𝐞𝐫𝐞 𝐀𝐫𝐞 %1 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬. 𝐔𝐬𝐞 : \"%2𝐇𝐞𝐥𝐩 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐍𝐚𝐦𝐞\" 𝐓𝐨 𝐕𝐢𝐞𝐰 𝐌𝐨𝐫𝐞. ]",
        "𝐔𝐒𝐄𝐑": "𝐔𝐒𝐄𝐑",
        "𝐀𝐝𝐦𝐢𝐧𝐆𝐫𝐨𝐮𝐩": "𝐀𝐝𝐦𝐢𝐧 𝐆𝐫𝐨𝐮𝐩",
        "𝐀𝐝𝐦𝐢𝐧𝐛𝐨𝐭": "𝐀𝐝𝐦𝐢𝐧 𝐁𝐨𝐭"
    }
};

// এখানে আপনার ফোটো Imgur লিংক করে বসাবেন✅

const helpImages = [
    "https://i.imgur.com/7lGfx7x.jpeg",
];

function downloadImages(callback) {
    let files = [];
    let completed = 0;

    helpImages.forEach((url, i) => {  
        let filePath = path.join(__dirname, "cache", `help${i}.jpg`);  
        files.push(filePath);  
        request(url).pipe(fs.createWriteStream(filePath)).on("close", () => {  
            completed++;  
            if (completed === helpImages.length) callback(files);  
        });  
    });
}

module.exports.handleEvent = function ({ api, event, getText }) {
    const { commands } = global.client;
    const { threadID, messageID, body } = event;

    if (!body || typeof body === "undefined" || body.indexOf("help") != 0) return;  
    const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);  
    if (splitBody.length < 2 || !commands.has(splitBody[1].toLowerCase())) return;  

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};  
    const command = commands.get(splitBody[1].toLowerCase());  
    const prefix = threadSetting.PREFIX || global.config.PREFIX;  

    const detail = getText("moduleInfo",  
        command.config.name,  
        command.config.usages || "Not Provided",  
        command.config.description || "Not Provided",  
        command.config.hasPermssion,  
        command.config.credits || "Unknown",  
        command.config.commandCategory || "Unknown",  
        command.config.cooldowns || 0,  
        prefix,  
        global.config.BOTNAME || "𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓"  
    );  

    downloadImages(files => {  
        const attachments = files.map(f => fs.createReadStream(f));  
        api.sendMessage({ body: detail, attachment: attachments }, threadID, () => {  
            files.forEach(f => fs.unlinkSync(f));  
        }, messageID);  
    });
};

module.exports.run = function ({ api, event, args, getText }) {
    const { commands } = global.client;
    const { threadID, messageID } = event;

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};  
    const prefix = threadSetting.PREFIX || global.config.PREFIX;  

    if (args[0] && commands.has(args[0].toLowerCase())) {  
        const command = commands.get(args[0].toLowerCase());  

        const detailText = getText("moduleInfo",  
            command.config.name,  
            command.config.usages || "Not Provided",  
            command.config.description || "Not Provided",  
            command.config.hasPermssion,  
            command.config.credits || "Unknown",  
            command.config.commandCategory || "Unknown",  
            command.config.cooldowns || 0,  
            prefix,  
            global.config.BOTNAME || "𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓"  
        );  

        downloadImages(files => {  
            const attachments = files.map(f => fs.createReadStream(f));  
            api.sendMessage({ body: detailText, attachment: attachments }, threadID, () => {  
                files.forEach(f => fs.unlinkSync(f));  
            }, messageID);  
        });  
        return;  
    }  

    const arrayInfo = Array.from(commands.keys())
        .filter(cmdName => cmdName && cmdName.trim() !== "")
        .sort();  

    const page = Math.max(parseInt(args[0]) || 1, 1);  
    const numberOfOnePage = 20;  
    const totalPages = Math.ceil(arrayInfo.length / numberOfOnePage);  
    const start = numberOfOnePage * (page - 1);  
    const helpView = arrayInfo.slice(start, start + numberOfOnePage);  

    let msg = helpView.map(cmdName => `┃ ✪ ${cmdName}`).join("\n");

    const text = `╭━━━━━━━━━━━━━━━━╮
┃ 📜 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 📜
┣━━━━━━━━━━━━━━━┫
┃ 📄 𝐏𝐀𝐆𝐄 : ${page}/${totalPages}
┃ 🧮 𝐓𝐎𝐓𝐀𝐋 : ${arrayInfo.length}
┣━━━━━━━━━━━━━━━━┫
${msg}
┣━━━━━━━━━━━━━━━━┫
┃ ⚙  𝐏𝐑𝐄𝐅𝐈𝐗 : ${prefix}
┃ 🤖 𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : ${global.config.BOTNAME || "𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓"}
┃ 👑 𝐀𝐃𝐌𝐈𝐍 : 𝐒𝐀𝐋𝐌𝐀𝐍 💛
╰━━━━━━━━━━━━━━━━╯`;

    downloadImages(files => {  
        const attachments = files.map(f => fs.createReadStream(f));  
        api.sendMessage({ body: text, attachment: attachments }, threadID, () => {  
            files.forEach(f => fs.unlinkSync(f));  
        }, messageID);  
    });  
};
