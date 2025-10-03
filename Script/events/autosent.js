module.exports.config = {
 name: "autosend",
 eventType: [],
 version: "0.0.1",
 credits: "NOBITA CHAT BOT",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
const moment = require("moment-timezone");
time = moment.tz('Asia/Dhaka').format('HH:mm:ss');
var cantsend = [];
    var allThread = global.data.allThreadID || [];
    if (time == "17:22:00") {
    for (const idThread of allThread) {
        if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
        else {
            api.sendMessage("test" + args.join(" ") , idThread, (error, info) => {
                if (error) cantsend.push(idThread);
            });
        }
      }
    for (var id of global.config.ADMINBOT) {
          api.sendMessage(`𝐄𝐑𝐑𝐎𝐑 𝐖𝐡𝐞𝐧 𝐀𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐜𝐚𝐥𝐥𝐲 𝐒𝐞𝐧𝐝𝐢𝐧𝐠 𝐌𝐚𝐬𝐬𝐚𝐠𝐞𝐬 𝐓𝐨 𝐓𝐡𝐫𝐞𝐚𝐝𝐬 :\n${cantsend.join("\n")}`,id);
    }
  }
                                                                                          }
