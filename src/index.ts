#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";

interface Config {
  feeds: string[];
  language: string;
  speaker: string;
  endpoint: string;
  apiKeyEnvVar?: string;
  model: string;
}

function configPath(): string {
  const base = process.env.XDG_CONFIG_HOME || join(homedir(), ".config");
  return join(base, "sarvam-cast", "config.json");
}

function loadConfig(): Config {
  const path = configPath();
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, "utf-8")) as Config;
  }
  return {
    feeds: ["https://news.ycombinator.com/rss"],
    language: "hi-IN",
    speaker: "meera",
    endpoint: "http://localhost:11434/v1/chat/completions",
    model: "llama3.2",
  };
}

async function fetchRSS(url: string): Promise<string> {
  const res = await fetch(url);
  const xml = await res.text();
  const titles: string[] = [];
  const titleMatches = xml.matchAll(/<title>([^<]+)<\/title>/g);
  for (const m of titleMatches) {
    const t = m[1].trim();
    if (t && t !== "RSS Feed") titles.push(t);
  }
  return titles.slice(0, 5).join(". ");
}

async function summarize(text: string, cfg: Config): Promise<string> {
  const res = await fetch(cfg.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: cfg.model,
      messages: [
        { role: "system", content: `You are a podcast host. Summarize the following news in ${cfg.language} in 2 paragraphs.` },
        { role: "user", content: text },
      ],
      stream: false,
    }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || text;
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (cmd === "init") {
    const dir = join(configPath(), "..");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(configPath(), JSON.stringify(loadConfig(), null, 2));
    console.log("Created config at", configPath());
    return;
  }

  if (cmd === "generate") {
    const cfg = loadConfig();
    console.log("Fetching RSS feeds...");
    const summaries: string[] = [];
    for (const feed of cfg.feeds) {
      try {
        const text = await fetchRSS(feed);
        const summary = await summarize(text, cfg);
        summaries.push(summary);
        console.log(`Fetched: ${feed}`);
      } catch (e: any) {
        console.error(`Failed ${feed}: ${e.message}`);
      }
    }

    const script = summaries.join("\n\n");
    const outPath = join(process.cwd(), "podcast-script.txt");
    writeFileSync(outPath, script);
    console.log(`Script saved to ${outPath}`);
    console.log("Use bulbul-studio or sarvam TTS to convert to audio.");
    return;
  }

  console.log(`Usage:
  sarvam-cast init       Create sample config
  sarvam-cast generate   Fetch RSS, summarize, write script
`);
}

main().catch(console.error);
