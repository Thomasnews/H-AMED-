const axios = require('axios');

async function fetchFromAI(url, params) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAIResponse(input, userId, messageID) {
  const services = [
    { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
    { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
    { url: 'https://metoushela-rest-api-tp5g.onrender.com/api/gpt4o?', params: { context: input } },
    { url: 'https://jonellccprojectapis10.adaptable.app/api/gpt4o', params: { context: input } }
  ];

  let response = "il semble qu'il y ait un problème veuillez réessayer ❗";
  let currentIndex = 0;

  for (let i = 0; i < services.length; i++) {
    const service = services[currentIndex];
    const data = await fetchFromAI(service.url, service.params);
    if (data && (data.gpt4 || data.reply || data.response)) {
      response = data.gpt4 || data.reply || data.response;
      break;
    }
    currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
  }

  return { response, messageID };
}

module.exports = {
  config: {
    name: 'ai',
    author: 'Arn',
    role: 0,
    category: 'ai',
    shortDescription: 'ai to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage(`𝗔𝗦𝗦𝗜𝗦𝗧𝗔𝗡𝗧 𝗔𝗡𝗦𝗪𝗘𝗥𝗘𝗗✅\n━━━━━━━━━━━━━━━━\nPlease provide a question or statement.\n`, event.threadID, event.messageID);
      return;
    }

    const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
    api.sendMessage(`${response}`, event.threadID, messageID);
  },
  onChat: async function ({ event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ai")) {
      const input = messageContent.replace(/^ai\s*/, "").trim();
      const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
      message.reply(`[📕] 𝗢𝗣𝗧𝗜𝗠𝗨𝗦 𝗣𝗥𝗜𝗠𝗘\n\n${response}\n\n[📚]··········································⬚`, messageID);
    }
  }
};
