import { spawn } from "child_process";
import { readFile } from "fs/promises";
import { openai } from "./openai";
import wrap from "word-wrap";

async function main() {
  console.log("Starting openai app...\n");

  const vim = spawn("vim", ["./src/data/input.txt"], { stdio: "inherit" });
  vim.on("exit", async () => {
    console.log("Closed Vim");

    const question = await readFile("./src/data/input.txt", "utf-8");

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

      console.log(
        wrap(res.data.choices[0].message?.content || "", { width: 120 })
      );
    } catch (err) {
      console.error("Error:", err);
    }
  });
}

main();
