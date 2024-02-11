const url = 'https://api.together.xyz/v1/chat/completions';
const apiKey = process.env.TAI_API_KEY;

// feed inputText to LLM
async function llmFetch(inputText){
    // console.log("headers in textgen/api llmFetch:",headers);
    try {
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
                    content: `Based on the provided input text, find at least three commercially available products that share similarities. Then, provide three points for each product regarding features, functionalities, and target audience.Here is the text:${inputText}`
                }
            ]
        };
        const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
        }); 
        
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };
        
        const response = await fetch(url, options);
        const result = await response.json();

        // console.log(result);
        // console.log(result.choices[0].message.content);
        console.log("res code",response.status);
        const res = result.choices[0].message.content;
        return {
            response: res,
            code: response.status
        };
    } catch(err) {
        console.error('Error llmFetch:', err);
        // console.log(apiKey);
        return {
            response:err.message,
            code: err.code
        };
    }
}

export async function POST(req2){
    const req = await req2.json(); 
    const inputText = req.inputText;

    try {
        const obj = await llmFetch(inputText);
        console.log(obj);

        // Construct the response
        const responseBody = JSON.stringify(obj);
        const responseHeaders = {
            'Content-Type': 'application/json'
            // Add more headers if needed
        };

        // Return the response object
        return new Response(responseBody, {
            status: obj.code,
            headers: responseHeaders
        });
    } catch (error) {
        console.error('Error in POST:', error);
        
        // Construct error response
        const errorMessage = {
            error: error.message || 'Internal Server Error',
            code: error.code || 500
        };
        const errorBody = JSON.stringify(errorMessage);

        // Return the error response
        return new Response(errorBody, {
            status: 500, // Internal Server Error
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}