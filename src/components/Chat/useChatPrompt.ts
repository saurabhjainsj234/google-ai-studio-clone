import { useState } from "react";
import { ChatMessage } from "./chatPrompt.types";

export function useChatPrompt() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handlePromptSubmit = async () => {
    if (!input && !selectedFile) return;
    setLoading(true);

    let fileText = "";
    if (selectedFile) {
      try {
        fileText = await selectedFile.text();
      } catch (e) {
        setChatHistory((prev) => [
          ...prev,
          { input, response: "Error reading file." },
        ]);
        setInput("");
        setSelectedFile(null);
        setLoading(false);
        return;
      }
    }

    try {
      const parts = [];
      if (input) parts.push({ text: input });
      if (fileText) parts.push({ text: `File Content:\n${fileText}` });

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts }],
          }),
        }
      );

      const data = await res.json();
      const generated =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      setChatHistory((prev) => [
        ...prev,
        {
          input:
            input ||
            (selectedFile ? `Uploaded file: ${selectedFile.name}` : ""),
          response: generated,
        },
      ]);
      setInput("");
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { input, response: "Error fetching response." },
      ]);
      setInput("");
      setSelectedFile(null);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setChatHistory([]);
    setInput("");
    setSelectedFile(null);
  };

  return {
    input,
    setInput,
    loading,
    chatHistory,
    handlePromptSubmit,
    selectedFile,
    handleFileChange,
    resetChat,
  };
}
