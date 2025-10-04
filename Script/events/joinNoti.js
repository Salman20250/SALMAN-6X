module.exports.config = {
  name: "joinnoti",
  eventType: ["log:subscribe"],
  version: "1.0.2",
  credits: "Nobita Chat Bot",
  description: "Welcome message with optional image/video",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.onLoad = function () {
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const paths = [
    join(__dirname, "cache", "joinGif"),
    join(__dirname, "cache", "randomgif")
  ];
  for (const path of paths) {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
  }
};

module.exports.run = async function({ api, event }) {
  const fs = require("fs");
  const path = require("path");
  const { threadID } = event;
  
  const botPrefix = global.config.PREFIX || "/";
  const botName = global.config.BOTNAME || "𝗦𝗵𝗮𝗵𝗮𝗱𝗮𝘁 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁";

 
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    await api.changeNickname(`[ ${botPrefix} ] • ${botName}`, threadID, api.getCurrentUserID());

    api.sendMessage("চলে এসেছি আমি নবিতা রোবট তোমাদের সাথে আড্ডা দিতে...🤖🔥", threadID, () => {
      const randomGifPath = path.join(__dirname, "cache", "randomgif");
      const allFiles = fs.readdirSync(randomGifPath).filter(file =>
        [".mp4", ".jpg", ".png", ".jpeg", ".gif", ".mp3"].some(ext => file.endsWith(ext))
      );

      const selected = allFiles.length > 0 
        ? fs.createReadStream(path.join(randomGifPath, allFiles[Math.floor(Math.random() * allFiles.length)])) 
        : null;

      const messageBody = `╭•┄┅═══❁🌺❁═══┅┄•╮
     আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ
╰•┄┅═══❁🌺❁═══┅┄•╯

𝐓𝐡𝐚𝐧𝐤 𝐘𝐨𝐮 𝐒𝐨 𝐌𝐮𝐜𝐡 𝐅𝐨𝐫 𝐀𝐝𝐝𝐢𝐧𝐠 𝐌𝐞 𝐓𝐨 𝐘𝐨𝐮𝐫 𝐆𝐫𝐨𝐮𝐩 🔥
 𝐈 𝐖𝐢𝐥𝐥 𝐀𝐥𝐰𝐚𝐲𝐬 𝐒𝐚𝐟𝐞 𝐲𝐨𝐮 𝐢𝐧𝐬𝐡𝐚𝐥𝐥𝐚𝐡 🌺❤️

𝐓𝐎 𝐕𝐈𝐄𝐖 𝐀𝐍𝐘 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ⬇️
${botPrefix}Help
${botPrefix}Info
${botPrefix}Admin

★ যেকোনো অভিযোগ অথবা হেল্প এর জন্য এডমিন নবিতাকে নক করতে পারেন ★
   
   𝐁𝐎𝐓 𝐎𝐍𝐖𝐄𝐑 : 𝐍𝐎𝐁𝐈𝐓𝐀🔥
        
 ➤𝐌𝐞𝐬𝐬𝐞𝐧𝐠𝐞𝐫: DEATH.USER1
➤𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩: +8801941010189
    
❖⋆═════════════⋆❖`;

      if (selected) {
        api.sendMessage({ body: messageBody, attachment: selected }, threadID);
      } else {
        api.sendMessage(messageBody, threadID);
      }
    });

    return;
  }

 
  try {
    const { createReadStream, readdirSync } = global.nodemodule["fs-extra"];
    let { threadName, participantIDs } = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};
    let mentions = [], nameArray = [], memLength = [], i = 0;

    for (let id in event.logMessageData.addedParticipants) {
      const userName = event.logMessageData.addedParticipants[id].fullName;
      nameArray.push(userName);
      mentions.push({ tag: userName, id });
      memLength.push(participantIDs.length - i++);
    }
    memLength.sort((a, b) => a - b);

    let msg = (typeof threadData.customJoin === "undefined") ? `╭•┄┅═══❁🌺❁═══┅┄•╮
     আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ
╰•┄┅═══❁🌺❁═══┅┄•╯
হাসি, মজা, ঠাট্টায় গড়ে উঠুক  
চিরস্থায়ী বন্ধুত্বের বন্ধন।🥰
ভালোবাসা ও সম্পর্ক থাকুক আজীবন।💝

➤ আশা করি আপনি এখানে হাসি-মজা করে 
আড্ডা দিতে ভালোবাসবেন।😍
➤ সবার সাথে মিলেমিশে থাকবেন।😉
➤ উস্কানিমূলক কথা বা খারাপ ব্যবহার করবেন না।🚫
➤ গ্রুপ এডমিনের কথা শুনবেন ও রুলস মেনে চলবেন।✅

›› প্রিয় {name},  
আপনি এই গ্রুপের {soThanhVien} নাম্বার মেম্বার!⚡

›› গ্রুপ: {threadName}

💌 🌺 𝐖 𝐄 𝐋 𝐂 𝐎 𝐌 𝐄 🌺 💌
╭─╼╾─╼🌸╾─╼╾───╮
─꯭─⃝‌‌𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓🌺
╰───╼╾─╼🌸╾─╼╾─╯

❖⋆═════════════⋆❖` : threadData.customJoin;

    msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

    const joinGifPath = path.join(__dirname, "cache", "joinGif");
    const files = readdirSync(joinGifPath).filter(file =>
      [".mp4", ".jpg", ".png", ".jpeg", ".gif", ".mp3"].some(ext => file.endsWith(ext))
    );
    const randomFile = files.length > 0 
      ? createReadStream(path.join(joinGifPath, files[Math.floor(Math.random() * files.length)])) 
      : null;

    return api.sendMessage(
      randomFile ? { body: msg, attachment: randomFile, mentions } : { body: msg, mentions },
      threadID
    );
  } catch (e) {
    console.error(e);
  }
};
