import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "./env";

const configuration = new Configuration({
  organization: "org-tjQzWNMLtDmKGRI4PdoM9JKs",
  apiKey: OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);
