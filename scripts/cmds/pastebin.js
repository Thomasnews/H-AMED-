const PastebinAPI = require('pastebin-js');
const fs = require('fs');
const path = require('path');

module.exports = {
 config: {
 name: "paste",
 aliases: ['bin','share', 'pastebin'],
 version: "1.0",
 author: "hamed",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "Upload files and text to pastebin and send link"
 },
 longDescription: {
 en: "This command allows you to upload files and text to pastebin and send the link to the file."
 },
 category: "Utility",
 guide: {
 en: "To use this command, type !paste file <name> or paste text <text>."
 }
 },
 
 onStart: async function ({ api, event, args, content }) {
 const pastebin = new PastebinAPI({
 api_dev_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
 api_user_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9'
 });

 const permission = ["61563485781052"];
 if (!permission.includes(event.senderID)) {
 return api.sendMessage("𝘃𝗶𝗹𝗮𝗶𝗻, 𝘀𝗮𝗹𝘂𝘁 𝗛𝗔𝗠𝗘𝗗 𝗮̀ 𝗹𝗲 𝗱𝗿𝗼𝗶𝘁 𝗱'𝘂𝘁𝗶𝗹𝗶𝘀𝗲𝗿 𝗰𝗲𝘁𝘁𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲  (￢‸￢) ?", event.threadID, event.messageID);
 }
 if (!args[0]) {
 return api.sendMessage('Please learn how to use $paste text (words) or paste file (filename)', event.threadID);
 }

 if (args[0] === "text") {
 const text = args.slice(1).join(" ");
 const paste = await pastebin
 .createPaste({
 text: text,
 title: "Text Paste",
 format: null,
 privacy: 1,
 })
 .catch((error) => {
 console.error(error);
 });

 const rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");

 api.sendMessage(`Text created ✅ \n🔗 Text Link: ${rawPaste}`, event.threadID);
 } else if (args[0] === "file") {
 const fileName = args[1];
 const filePathWithoutExtension = path.join(__dirname, '..', 'cmds', fileName);
 const filePathWithExtension = path.join(__dirname, '..', 'cmds', fileName + '.js');

 if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)){
 return api.sendMessage('File not found!', event.threadID);
 }

 const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;

 fs.readFile(filePath, 'utf8', async (err, data) => {
 if (err) throw err;

 const paste = await pastebin
 .createPaste({
 text: data,
 title: fileName,
 format: null,
 privacy: 1
 })
 .catch((error) => {
 console.error(error);
 });

 const rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");

 api.sendMessage(`
File created ✅\nfile name: ${fileName}.js\n🔗 Link: ${rawPaste}`, event.threadID);
 });
 } else {
 api.sendMessage('Please learn how to use $paste text (words) or paste file (filename)', event.threadID);
 }
 },
};



