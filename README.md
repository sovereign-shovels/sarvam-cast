# sarvam-cast

> Subscribe to RSS, get a daily Indic podcast. Bulbul TTS + LLM summary.

**Status:** v0.1 — ready to use.

**Sovereignty:** sovereign-by-construction. Local LLM summarization. BYO TTS.

---

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   RSS feeds     │────▶│   sarvam-    │────▶│   Local LLM     │
│  (HN, blogs)    │     │   cast       │     │   (Ollama)      │
└─────────────────┘     │  (fetch +    │     └─────────────────┘
                        │   summarize) │              │
                        └──────────────┘              ▼
                               │               ┌──────────────┐
                               ▼               │  podcast-    │
                        ┌──────────────┐       │  script.txt  │
                        │  podcast-    │       │  (Indic)     │
                        │  script.txt  │       └──────────────┘
                        └──────────────┘              │
                                                      ▼
                                               ┌──────────────┐
                                               │  bulbul-     │
                                               │  studio TTS  │
                                               └──────────────┘
```

## What this is

Turn any RSS feed into a podcast script in Indian languages. Fetch headlines, summarize with a local LLM, translate to Hindi/Tamil/Telugu/etc., format for TTS. Then pipe through bulbul-studio for audio.

## What this isn't

- Not a TTS engine (see [bulbul-studio](https://github.com/sovereign-shovels/bulbul-studio))
- Not a podcast hosting platform
- Not real-time (batch generation)

---

## Install

```bash
git clone https://github.com/sovereign-shovels/sarvam-cast.git
cd sarvam-cast
npm install
npm run build
```

## Usage

```bash
# Create config
node dist/index.js init

# Generate podcast script from RSS feeds
node dist/index.js generate

# The script is saved to podcast-script.txt
# Use bulbul-studio to convert to audio
```

**Demo output:**
```
$ node dist/index.js init
Created config at ~/.config/sarvam-cast/config.json

$ node dist/index.js generate
Fetching RSS feeds...
Fetched: https://news.ycombinator.com/rss
Script saved to podcast-script.txt
Use bulbul-studio or sarvam TTS to convert to audio.
```

---

## License

Apache 2.0. See [LICENSE](./LICENSE).

## Part of sovereign-shovels

This repo is part of the [sovereign-shovels](https://github.com/sovereign-shovels) portfolio.
