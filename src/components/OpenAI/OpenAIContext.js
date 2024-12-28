import React, { createContext, useContext } from 'react';
import OpenAI from 'openai';

const OpenAIContext = createContext();

export const OpenAIProvider = ({ children }) => {
  const openai = new OpenAI({
    apiKey: "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", dangerouslyAllowBrowser: true
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