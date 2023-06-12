"use client";
import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo from "../public/foundationLogo.svg";

const Foundation: React.FC = () => {
  const CHARACTER_LIMIT: number = 32;
  const ENDPOINT: string =
    "https://x6w4komxe4.execute-api.us-west-2.amazonaws.com/prod/generate_snippet_and_keywords";
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = () => {
    console.log("Submitting: ", prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
  };

  const onResult = (data: any) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setIsLoading(false);
  };

  const onReset = (data: any) => {
    setPrompt("");
    setSnippet("");
  };

  if (snippet) {
    console.log(`Prompt: ${prompt}, snippet: ${snippet}`);
  }
  let displayedElement = snippet ? (
    <Results
      prompt={prompt}
      snippet={snippet}
      keywords={keywords}
      onBack={onReset}
    />
  ) : (
    <Form
      prompt={prompt}
      setPrompt={setPrompt}
      onSubmit={onSubmit}
      isLoading={isLoading}
      characterLimit={CHARACTER_LIMIT}
    />
  );

  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 w-fit mx-auto";
  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-800 p-6 rounded-md text-white">
          <div className="text-center my-6">
            <Image src={logo} alt="" width={42} height={42} />
            <h1 className={gradientTextStyle + " text-3xl font-light"}>
              Foundation
            </h1>
            <div className={gradientTextStyle}>Your AI branding assistant!</div>
          </div>
          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default Foundation;
