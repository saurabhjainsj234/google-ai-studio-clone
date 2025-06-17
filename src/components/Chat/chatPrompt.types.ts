export type ChatPromptProps = {
  onInputFocus?: () => void;
};

export type ChatMessage = {
  input: string;
  response: string;
};
