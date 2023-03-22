import { openai } from "./openai";

async function main() {
  console.log("Starting openai app...");
  try {
    const res = await openai.listModels();
    console.log("ListModels response:");
    console.dir(res.data, { depth: null, colors: true });
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
