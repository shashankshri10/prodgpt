'use client'    
import { useState,useEffect } from 'react';

export default function Page(){
    const [inputText, setInputText] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [clicked,setclicked] = useState(false);
    
    const handleClk = async () => {
        try {
            const res = await fetch('')
            // setGeneratedText(async () => await generateText(inputText))
            setTimeout(()=>console.log("gen text:",generatedText),5000);
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
                {generatedText && (
                    <TextArr inputText={inputText} />
                )}
            </div>
        </>
    );
}
