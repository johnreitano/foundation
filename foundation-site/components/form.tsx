interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid = props.prompt.length <= props.characterLimit;
  const isPromptPresent = props.prompt.length > 0;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  let statusText = null;
  let statusColor = "text-slate-500";
  if (!isPromptValid) {
    statusColor = "text-red-400";
    statusText = `Input must be less than ${props.characterLimit} characters.`;
  }
  return (
    <>
      <div className="mb-6 text-slate-400">
        <p>
          Tell me what your brand is about and I will generate copy and keywords
          for you.
        </p>
      </div>
      <input
        className="p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700"
        type="text"
        placeholder="coffee"
        value={props.prompt}
        onChange={(e) => props.setPrompt(e.currentTarget.value)}
      />
      <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
        <div>{statusText}</div>
        <div className="text-right">{props.prompt.length}/32</div>
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptPresent || !isPromptValid}
      >
        Submit
      </button>
    </>
  );
};

export default Form;
