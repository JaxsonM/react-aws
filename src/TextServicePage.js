import React, { useState, useRef } from 'react';

const TextServicePage = () => {
  const [inputText, setInputText] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const outputRef = useRef(null);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const convertText = () => {
    const modifiedText = inputText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    setOutputHtml(modifiedText);
  };

  const copyToClipboard = () => {
    const range = document.createRange();
    range.selectNodeContents(outputRef.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  };
  
  

  return (
    <div className="big flex flex-col">
      <div className="text-center mb-8">
        <p>Enter your text below using **double asterisks** to denote bold text. Click "Convert" to see the HTML output.</p>
      </div>

      <div className="flex flex-col bg-gray-100 shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-xl font-bold text-left pl-2">Text Formatter</h1>
      <div className="flex">
        <div className="flex flex-col w-1/2 p-5">
          <textarea 
            id="inputText"
            rows="6"
            className="p-2 border border-gray-300 mb-4"
            value={inputText}
            onChange={handleTextChange}
          />
          <button onClick={convertText} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
             Convert
          </button>
        </div>

        <div className="flex flex-col w-1/2 p-5">
          <button onClick={copyToClipboard} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
             Copy Output
          </button>
          <div className="border border-gray-300 p-2 bg-white">
            <div 
              ref={outputRef}
              contentEditable="true"
              dangerouslySetInnerHTML={{ __html: outputHtml }}
              className="min-h-[12.5rem]"
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default TextServicePage;
