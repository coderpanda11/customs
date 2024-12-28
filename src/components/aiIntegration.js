import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));