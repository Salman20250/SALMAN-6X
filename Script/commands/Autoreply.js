const fs = global.nodemodule["fs-extra"];
const path = global.nodemodule["path"];

module.exports.config = {
  name: "autoreplybot",
  version: "6.0.2",
  hasPermssion: 0,
  credits: "NOBITA CHAT BOT",
  description: "Auto-response bot with specified triggers",
  commandCategory: "No Prefix",
  usages: "[any trigger]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return; 
  const name = await Users.getNameUser(senderID);
  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "আরেক বেডারে Miss না করে Xan মেয়ে হলে বস নবিতা রে হাঙ্গা করো😶",
    "kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣⛏️",
    "help": "𝐏𝐫𝐞𝐟𝐢𝐱 𝐃𝐞 𝐒𝐚𝐥𝐚 [ / ]",
    "hi": "এত হাই-হ্যালো করো কেনো প্রিয়..!😜🫵",
    "bc": "SAME TO YOU😊",
    "good morning": "GOOD MORNING দাঁত ব্রাশ করে খেয়ে নাও সোনা🥰",
    "tor bal": "~ এতো বাল বাল করস তোর বাল বেশি হয়েছে নাকি..🐸🫂",
    "nobita": "বস এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😺",
    "owner": "‎☞ আমাকে তৈরি করেছে আমার বস নবিতা আমি নবিতা চৌধুরী বলুন আপনাকে আমি কিভাবে সাহায্য করতে পারি!!😒",
    "admin": " আমার বস নবিতার সাথে কথা বলতে বা যোগাযোগ করতে চাইলে তার ফেসবুকে নক করুন〽️😊",
    "chup": "তুই চুপ কর পাগল ছাগল😠",
    "assalamualaikum": "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ 💖",
    "kiss me": "তুমি দুষ্টু অনেক তোমাকে কিস দিবো না 🤭",
    "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস নবিতা কে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵",
    "i love you": " I Love You Tooo 😻 মেয়ে হলে আমার বস নবিতার ইনবক্সে এখনি গুঁতা  দাও🫢😻",
    "by": "কিরে তুই কই যাস চিপায় যাবি নাকি..!🌚🌶️",
    "ami nobita": "হ্যাঁ বস কেমন আছেন আপনি..?☺️",
    "bot er baccha": "আমার বাচ্চা তো আমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "𝐀𝐌𝐀𝐑 𝐍𝐀𝐌𝐄 ─꯭─⃝‌‌𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓💖",
    "pic de": "এখান থেকে সর দুরে গিয়া মর😒",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌚",
    "bal": "রাগ করে না সোনা পাখি আমাল 🙈😽",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "boda": "ভাই তুই এত হাসিস না..!🌚🤣",
    "kire ki koros": " তোমার কথা মনে মনে ভাবতেছি জান পাখি💖",
    "kire bot": " হুম বলেন কেমন আছেন 🥳"
    "ওকে বায়": "ওগো সোনা কোথায় যাও তুমি🤭"
    "😅": "কি হয়েছে জান তোমার মন খারাপ কেনো🙃"
    "😘": "ইসসস জান আসো কিস করি তোমার কপালে😘"
  };

  if (responses[msg]) {
    return api.sendMessage(responses[msg], threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  return this.handleEvent({ api, event, Users });
};
