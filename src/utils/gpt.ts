import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

// const options = {
//     method: 'POST',
//     url: 'https://openai80.p.rapidapi.com/completions',
//     timeout: 30000,
//     headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': 'c61239d461msh98a0878d9a51a12p1e4444jsna07dee972227',
//         'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
//     },
//     data: {
//         model: 'text-davinci-003',
//         prompt: '',
//         max_tokens: 1024,
//         temperature: 0,
//         top_p: 1,
//         n: 1,
//         stream: false,
//         logprobs: null,
//         stop: '',
//     },
// };

const axiosConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
};

export const createCompletion = async (
    prompt: string,
    temperature: number,
    numSeq: number,
    length: number,
) => {
    axios
        .post(
            'https://api.aicloud.sbercloud.ru/public/v2/summarizator/predict',
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
        )
        .then(data => {
            return data.data.predictions;
        });
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
