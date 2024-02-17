const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ apikey: "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" });
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAi(message) {
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,  // Corrected parameter name
        frequency_penalty: 0,
        presence_penalty: 0
    });

    return res.data.choices[0].text;
}

