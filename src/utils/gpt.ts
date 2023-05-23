import { Configuration, OpenAIApi } from 'openai';

const openAiConfig = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    //apiKey: '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'
});

delete openAiConfig.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(openAiConfig);

export const createCompletion = async (promt?: string) => {
    if (!promt) {
        return;
    }
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: promt }],
    });
    return completion.data.choices[0].message?.content || '';
};
