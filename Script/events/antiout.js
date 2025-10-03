module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "Nobita Chat Bot",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`সরি বস ${name} কে আবার এড করতে পারলাম না। 
সম্ভবত উনি বটকে ব্লক করেছে অথবা তার প্রাইভেসি সেটিংসের কারণে এড করা যায় না।⚡
\n✦─꯭─⃝‌‌𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓──✦`, event.threadID)
   } else api.sendMessage(`শোন,${name},এই গ্রুপ হইলো একটা গ্যাং!🧃🔪
এখান থেকে যাইতে হলে এডমিনের পারমিশন লাগে!
তুই পারমিশন ছাড়া লিভ নিছোস – তোকে আবার দেখলে লাত্তি মারবো🐸🫂
\n✦─꯭─⃝‌‌𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓──✦`, event.threadID);
  })
 }
}
