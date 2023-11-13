import React, { useState, useRef } from 'react';

const TextServicePage = () => {
  // State to keep track of the input and output text
  const [inputText, setInputText] = useState('');
  const [outputHtml, setOutputHtml] = useState('');

  // Ref for the output container to assist with the copy function
  const outputRef = useRef(null);

  // Handler for text area change
  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  // Function to convert input text to bold HTML on button click
  const convertText = () => {
    const modifiedText = inputText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // regex to target text surrounded by **
    setOutputHtml(modifiedText);
  };

  // Function to copy the content of the output container
  const copyToClipboard = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(outputRef.current);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  };

  return (
    <div className="flex h-screen w-screen">
        <div className="bg-red-500 flex-row w-1/2">
        <textarea 
          id="inputText"
          rows="6"
          cols="50"
          value={inputText}
          onChange={handleTextChange}
          className="flex-grow m-5 text-black" // Adjust dimensions as needed
        />
        <button onClick={convertText} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
           Convert
         </button>
        </div>

        <div className="bg-green-500 w-1/2">
        <button onClick={copyToClipboard} className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
           Copy Output
         </button>
       
       <div>
         <p className="mb-2">Copy the HTML below and paste it into Word:</p>
        <div 
          ref={outputRef}
          contentEditable="true"
          className="border border-black p-2 bg-white text-black min-h-[12.5rem] w-72" // Using min-h-[12.5rem] for custom minHeight
          dangerouslySetInnerHTML={{ __html: outputHtml }}
        />
        </div>
        </div>
    </div>
    // <div className="flex justify-between p-12">
    //   <div className="mr-5">
    //     <h1 className="mb-4 font-bold text-lg bg-green-500">Text to Bold Converter</h1>
    //     <textarea 
    //       id="inputText"
    //       rows="6"
    //       cols="50"
    //       value={inputText}
    //       onChange={handleTextChange}
    //       className="w-72 h-48 mb-4 p-2 border border-gray-300" // Adjust dimensions as needed
    //     />
    //     <button onClick={convertText} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //       Convert
    //     </button>
    //     <button onClick={copyToClipboard} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
    //       Copy Output
    //     </button>
    //   </div>
    //   <div>
    //     <p className="mb-2">Copy the HTML below and paste it into Word:</p>
    //     <div 
    //       ref={outputRef}
    //       contentEditable="true"
    //       className="border border-black p-2 bg-white text-black min-h-[12.5rem] w-72" // Using min-h-[12.5rem] for custom minHeight
    //       dangerouslySetInnerHTML={{ __html: outputHtml }}
    //     />
    //   </div>
    // </div>
  );
}

export default TextServicePage;
