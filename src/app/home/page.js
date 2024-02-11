"use client";
import { useState, useEffect } from "react";
import { InfinitySpin, Triangle } from "react-loader-spinner";
import "./loading.css";

export default function Page() {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [imgData, setimgData] = useState("");
  const [clicked, setclicked] = useState(false);
  const [clicked2, setclicked2] = useState(false);

  const handleClkImage = async () => {
    setimgData("");
    setGeneratedText("");
    setclicked2(true);
    try {
      // Define the input text to be sent in the request
      const it = `logo for a product inspired by ${inputText}`;

      // Make a POST request to the API endpoint
      const response = await fetch("/api/imagen2/", {
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
        // const decodedImg = atob(data.string);
        setimgData(data.string);
      } else {
        // Handle error response here
        console.error("Error:", data);
      }
    } catch (error) {
      // Handle network errors or other errors
      console.error("Error:", error);
    }
    handleClk();
  };
  const handleClk = async () => {
    setclicked(true);
    // setGeneratedText("");
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
      <div className="page-main flex flex-col justify-top items-center h-screen">
        <h2 className="page-heading text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Enter Product Idea
        </h2>
        <div className=" " style={{ margin: "1vh 0px" }}>
          <div className="input-prompt-area">
            {imgData && (
              <img
                src={`data:image/jpeg;base64,${imgData}`}
                style={{ width: "40px", height: "40px" }}
              />
            )}
            <input
              type="text"
              className="dark:bg-gray-800  dark:text-white text-black rounded-md py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Text Here..."
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={(e)=>{if (e.key === 'Enter') handleClkImage();}}
            />
            <button onClick={handleClkImage}>Generate</button>
          </div>
        </div>
        {!imgData && clicked2 && (
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        {imgData && (
          <img
            src={`data:image/jpeg;base64,${imgData}`}
            style={{ width: "100px", height: "100px" }}
          />
        )}
        <div
          className="wrapper mx-10vw white-text overflow-y-scroll"
          //   id="wrapper"
          style={{
            maxHeight: "60vh",
            margin: "0px 10vw",
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
