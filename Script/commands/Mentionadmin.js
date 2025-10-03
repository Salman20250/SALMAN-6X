module.exports.config = {
 name: "adminmention",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "NOBITA CHAT BOT",
 description: "Bot will reply when someone tags any of the admins",
 commandCategory: "Other",
 usages: "@",
 cooldowns: 1
};

module.exports.handleEvent = function({ api, event }) {
 const adminIDs = ["100071130680863", "100008828057322", "61581233800878"].map(String);
 
 if (adminIDs.includes(String(event.senderID))) return;

 const mentionedIDs = event.mentions ? Object.keys(event.mentions).map(String) : [];
 const isMentioningBoss = adminIDs.some(adminID => mentionedIDs.includes(adminID));

 if (isMentioningBoss) {
 const replies = [
 "ডাকাডাকি করিস না বস ব্যস্ত আছে 😒",
 "বস এক আবালে আপনাকে মেনশন দিছে 🌚",
 "যেভাবে মেনশন দিতাছত মনে হয় তোর গার্লফ্রেন্ড টারে আমার বসকে দিয়া দিবি 🫥😒",
 "নবিতা বস এক পাগল ছাগল আপনাকে ডাকতেছে 🐸🫵",
 "বস এক হালায় আপনার নাম ধরছে  আপনি শুধু একবার আদেশ করুন আজকে হালার নানিরে চমলক্ক করে দিমু 😑🥴",
 "মাইয়া হলে বসের ইনবক্সে চলে যাও😗😁",
 "নবিতা বস এখন ব্যস্ত আছে কিছু বলতে হলে ইনবক্স এ গিয়ে বলো📩",
 "বস এখন আমার সাথে মিটিং এ আছে , মেনশন দিস না 🙂",
 "বস এখন ব্যস্ত আছে , কি বলবি আমাকে বল",
 "মেনশন না দিয়া বস বল বস 🥵💋",
 "কিরে তোর এতো সাহস আমার বসের নাম ধরিস😾🫵",
 "এতো মেনশন না দিয়া তোর গার্লফ্রেন্ডটারে দিয়া দে😹🐸",
 "মেনশন দিয়ে লাভ নাই বস নবিতা এখন বিজি আছে😗😘",
 "বস তো এখন চা খাচ্ছে, তুই ততক্ষণ মাথা ঠান্ডা রাখ 😌🍵",
 "বস বলল তোরে রিপ্লাই দিবে কিন্তু আগে তুই গোসল করে আয় 🤢🧼",
 "আবার বসরে মেনশন? মাথা ঠিক আছে তো তোর? 🤨🧠",
 "এই! বসরে মেনশন করা সহজ না, লাইসেন্স লাগে রে বেটা 😎📛",
 "তুই মেনশন দিলি আর বস মুচকি হাসল 😌📲",
 "বস এখন ঘুমাচ্ছে, জেগে উঠলে প্রথমে তোকেই গালি দিবে 😴😈",
 "তুই কি জানিস বসকে মেনশন করা মানেই জীবনের রিস্ক? 😮⚠️",
 "এইভাবে মেনশন করতাস, না জানি তুই প্রেমে পড়ছোস কিনা 😼❤️"
 ];
 return api.sendMessage(replies[Math.floor(Math.random() * replies.length)], event.threadID, event.messageID);
 }
};

module.exports.run = async function() {};
