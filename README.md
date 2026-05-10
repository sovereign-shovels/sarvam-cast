# sarvam-cast

> Subscribe to RSS, get a daily Indic podcast. Bulbul TTS + LLM summary.

**Status:** v0.1 — ready to use.

**Sovereignty:** sovereign-by-construction. Local LLM summarization. BYO TTS.

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

---

## License

Apache 2.0. See [LICENSE](./LICENSE).

## Part of sovereign-shovels

This repo is part of the [sovereign-shovels](https://github.com/sovereign-shovels) portfolio.
