import { spawn } from "child_process";
import { readFile } from "fs/promises";
import { openai } from "./openai";

async function main() {
  console.log("Starting openai app...\n");

  const vim = spawn("vim", ["input.txt"], { stdio: "inherit" });
  vim.on("exit", async () => {
    console.log("Closed Vim");

    const question = await readFile("input.txt", "utf-8");

    console.log("\nCreating chat completion...\n");

    try {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      });
      console.dir("ChatCompletion response:");
      console.dir(res.data, { depth: null, colors: true });

      console.log(res.data.choices[0].message?.content);
    } catch (err) {
      console.error("Error:", err);
    }
  });
}

main();
