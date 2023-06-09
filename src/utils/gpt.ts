import { Configuration, OpenAIApi } from 'openai';

const openAiConfig = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

delete openAiConfig.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(openAiConfig);

export const createCompletion = async (promt?: string, temperature?: number) => {
    if (!promt) {
        return;
    }
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: promt }],
        temperature: temperature,
    });
    return completion.data.choices[0].message?.content || '';
};
