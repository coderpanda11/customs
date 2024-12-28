import React, { createContext, useContext } from 'react';
import OpenAI from 'openai';

const OpenAIContext = createContext();

export const OpenAIProvider = ({ children }) => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true
  });

  const generateResponse = async (userInput) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant specializing in evidence collection, report generation, and training for law enforcement and security professionals. Provide clear, concise, and accurate information."
          },
          {
            role: "user",
            content: userInput
          }
        ]
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw error;
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