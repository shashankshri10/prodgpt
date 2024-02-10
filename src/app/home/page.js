'use client'    
import { useState,useEffect } from 'react';

export default function Page(){
    const [inputText, setInputText] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [clicked,setclicked] = useState(false);
    
    const handleClk = async () => {
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
            setGeneratedText(result.choices[0].message.content)

        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return(
        <>
            <div className="flex flex-col justify-around justify-center items-center h-screen">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Home page</h2>
                
                <input 
                    type="text" 
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter Text Here..."
                    value={inputText}
                    onChange={handleInputChange}
                />    
                <button 
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-800"
                    onClick={handleClk}// Call handleClk when the button is clicked
                    id="clk-button"
                >
                    Generate
                </button>
                <div className='white-text'>
                    <p>{generatedText}</p>
                </div>
            </div>
        </>
    );
}
