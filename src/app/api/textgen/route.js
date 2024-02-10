const url = 'https://api.together.xyz/v1/chat/completions';
// const api key
const apiKey2 = process.env.TAI_KEY;
const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
});

export async function GET(req){
    try {
        const { searchParams } = new URL(req.url);
        const inputText = searchParams.get('inputText');
        const data = {
            model: 'openchat/openchat-3.5-1210',
            max_tokens: 512,
            top: ['</s>', '[/INST]'],
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            n: 1,
            messages: [
                {
                    role: 'user',
                    content: inputText
                }
            ]
        };
        
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };
        
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);
        console.log(result.choices[0].message.content);
        console.log("input text",inputText);
        
        const res = result.choices[0].message.content;

        return {
            status: response.status,
            body: JSON.stringify({
                content: res
            })
        };
    } catch(error) {
        console.error('Error:', error);
        console.log(apiKey);
        return {
            status: 500, // Internal Server Error
            body: JSON.stringify({
                error: error.message
            })
        };
    }
}
