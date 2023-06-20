import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

const axiosConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
};

export const rephrase = async (prompt: string, temperature: number) => {
    const data = await axios.post(
        'https://framed-knowledge-somewhere-treatments.trycloudflare.com/https://api.aicloud.sbercloud.ru/public/v2/rewriter/predict',
        {
            instances: [
                {
                    text: prompt,
                    temperature: temperature,
                    top_k: 50,
                    top_p: 0.7,
                    range_mode: 'bertscore',
                },
            ],
        },
        axiosConfig,
    );
    return data.data.predictions_all;
};

export const summarize = async (
    prompt: string,
    temperature: number,
    numSeq: number,
    length: number,
) => {
    const data = await axios.post(
        'https://framed-knowledge-somewhere-treatments.trycloudflare.com/https://api.aicloud.sbercloud.ru/public/v2/summarizator/predict',
        {
            instances: [
                {
                    text: prompt,
                    num_beams: 5,
                    num_return_sequences: numSeq,
                    length_penalty: length,
                    temperature: temperature,
                },
            ],
        },
        axiosConfig,
    );
    return data.data.predictions;
};

// const openAiConfig = new Configuration({
//     apiKey: import.meta.env.VITE_OPENAI_API_KEY,
// });

//delete openAiConfig.baseOptions.headers['User-Agent'];

//const openai = new OpenAIApi(openAiConfig);

// export const createCompletion = async (promt?: string, temperature?: number) => {
//     if (!promt) {
//         return;
//     }
//     const completion = await openai.createChatCompletion({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: promt }],
//         temperature: temperature,
//     });
//     return completion.data.choices[0].message?.content || '';
// };
