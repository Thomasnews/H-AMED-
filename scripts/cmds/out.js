const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
module.exports = {
	config: {
		name: "out",
		aliases: ["go"],
		version: "1.0",
		author: "Sandy",
		countDown: 5,
		role: 2,
		shortDescription: "bot will leave gc",
		longDescription: "",
		category: "admin",
		guide: {
			vi: "{pn} [tid,blank]",
			en: "{pn} [tid,blank]"
		}
	},

	onStart: async function ({ api,event,args, message }) {
 var id;
 if (!args.join(" ")) {
 id = event.threadID;
 } else {
 id = parseInt(args.join(" "));
 }
 return api.sendMessage('𝐚̀ 𝐩𝐥𝐮𝐬 𝐦𝐨𝐢 𝐣𝐞 𝐦𝐞 𝐜𝐚𝐬𝐬𝐞 𝐝𝐞 𝐜𝐞 𝐬𝐚𝐭𝐚𝐧𝐞́ 𝐠𝐫𝐨𝐮𝐩𝐞..🖕', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
		}
	};