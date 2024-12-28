import { createContext, useContext } from 'react';
import OpenAI from 'openai';

const OpenAIContext = createContext();

export const OpenAIProvider = ({ children }) => {
  const openai = new OpenAI({
    apiKey: "openai-api-key",
    dangerouslyAllowBrowser: true
  });

  const generateResponse = async (userInput) => {
    try {
      console.log("Sending request to OpenAI...");
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant specializing in evidence collection, report generation, and training for law enforcement and security professionals. Provide clear, concise, and accurate information."
          },
          {
            role: "user",
            content: userInput
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      console.log("Response received:", completion);
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI Error Details:', error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  };

  return (
    <OpenAIContext.Provider value={{ generateResponse }}>
      {children}
    </OpenAIContext.Provider>
  );
};

export const useOpenAI = () => {
  const context = useContext(OpenAIContext);
  if (!context) {
    throw new Error('useOpenAI must be used within an OpenAIProvider');
  }
  return context;
}; 