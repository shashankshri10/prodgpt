"use client";
import { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function Page() {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [clicked, setclicked] = useState(false);

  const handleClk = async () => {
    setclicked(true);
    setGeneratedText("");
    try {
      // Define the input text to be sent in the request
      const it = inputText;

      // Make a POST request to the API endpoint
      const response = await fetch("/api/textgen/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText: it }),
      });

      // Parse the JSON response
      const data = await response.json();

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Handle successful response here
        // console.log("Response:", data.response);
        const nt = data.response.replace(/\n/g, "<br>");
        setGeneratedText(nt);
      } else {
        // Handle error response here
        console.error("Error:", data);
      }
    } catch (error) {
      // Handle network errors or other errors
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col justify-top items-center h-screen">
        <div className="h-1/4 min-h-1/4 flex flex-col justify-around" style={{margin : '5vh 0px'}}>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Enter Product Idea
          </h2>

          <input
            type="text"
            className="dark:bg-gray-800 dark:border-gray-600 dark:text-white text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Text Here..."
            value={inputText}
            onChange={handleInputChange}
          />
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-800"
            onClick={handleClk} // Call handleClk when the button is clicked
            id="clk-button"
          >
            Generate
          </button>
        </div>
        <div
          className="mx-10vw white-text overflow-y-scroll"
          style={{
            maxHeight: "60vh",
            margin: "0px 10vw",
            scrollbarWidth: "thin" /* For Firefox */,
            scrollbarColor: "grey black" /* For Firefox */,
            WebkitOverflowScrolling: "touch" /* For smooth scrolling on iOS */,
            scrollbarTrackColor: "red" /* For IE and Edge */,
            scrollbarFaceColor: "red" /* For IE and Edge */,
          }}
        >
          <div>
            {!generatedText && clicked && (
              <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: generatedText }} />
          </div>
        </div>
      </div>
    </>
  );
}
