interface ResultsProps {
  prompt: string;
  snippet: string;
  keywords: string[];
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  const keywordElements = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = (
      <div
        key={i}
        className="bg-teal-200 px-2 text-teal-700 text-small rounded-md"
      >
        #{props.keywords[i]}
      </div>
    );
    keywordElements.push(element);
  }

  const keywordElementsHolder = (
    <div className="flex flex-wrap gap-1">{keywordElements}</div>
  );

  const resultSection = (label: string, body: any) => {
    return (
      <div className="bg-slate-700 p-6 my-2 rounded-md">
        <div className="text-slate-500 text-sm font-bold mb-1">{label}</div>
        <div>{body}</div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-6">
        {resultSection(
          "Prompt",
          <div className="text-xl font-bold">{props.prompt}</div>
        )}
        {resultSection("Snippet", props.snippet)}
        {resultSection("Keywords", keywordElementsHolder)}
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onBack}
      >
        Back
      </button>
    </>
  );
};

export default Results;
