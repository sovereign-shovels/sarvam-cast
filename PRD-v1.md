---
repo: sarvam-cast
rank: 14
score: 0.42
sprint: deferred (most speculative; validate demand before commit)
substrate_anchor: Sarvam
build_estimate: "2–3 weeks for v0.1"
status: planned
---

# PRD v1.0 — sarvam-cast

> **One-liner:** Subscribe to RSS, get a daily Hindi/Tamil/Telugu podcast. Bulbul TTS + LLM summary. Fully sovereign.
>
> **Substrate:** Indian commute / vernacular news consumers, content creators auto-generating podcasts
> **Launch channels:** Indian podcast Twitter, LinkedIn India creator economy, r/India, vernacular content forums
> **Build estimate (v0.1):** 2–3 weeks for v0.1

---

## What problem does this solve

India's commute culture is enormous. Vernacular news consumption is voice-first and growing. Existing podcast platforms don't auto-generate Indic content from English RSS. sarvam-cast does: subscribe to feeds, configure language and voice, get a daily Hindi/Tamil/Telugu podcast in your inbox or RSS reader.

## Why this is a shovel and not a product

Most speculative shovel in the portfolio — validate demand before commit. If demand validates, scope-evolves into a personal podcast platform.

---

## v0.1 — what ships

CLI + minimal UI. Add RSS feeds. Config: target language, voice, length. Daily run produces a podcast episode (single MP3 with ID3 metadata) per feed.

### Acceptance criteria for v0.1

A v0.1 release is publishable to GitHub when ALL of these are true:

- [ ] Core functionality described above works on the primary developer machine.
- [ ] At least one local-only configuration is documented and tested (no cloud required).
- [ ] BYO endpoint / BYO key configuration is documented.
- [ ] README explains: what it is, who it's for, how to install, how to configure, what it doesn't do.
- [ ] LICENSE present (Apache 2.0 unless overridden).
- [ ] No hardcoded keys or vendor URLs anywhere.
- [ ] No telemetry / phone-home.
- [ ] At least one passing test for the main code path.
- [ ] CI green.
- [ ] AGENTS.md compliance reviewed.

## v0.5 — first major evolution

Personal RSS-to-podcast hosting (publishable feed URL). Multiple voices for multi-source briefings.

## v1.0 — fuller scope

Personalized briefings (based on user-defined interests). Delivery to podcast apps. Audio bookmarks.

---

## Architecture sketch

### Stack

TS CLI. RSS parser. LLM for summarization (any provider). Bulbul TTS primary. ID3 tag library. Optional: minimal hosting layer for a personal podcast feed.

### Provider abstraction

The shovel MUST expose a provider abstraction even if v0.1 only uses one
provider. Suggested shape:

```
interface Provider {
  name: string;
  endpoint: URL;
  apiKeyEnvVar: string;
  call(input: ProviderInput): Promise<ProviderOutput>;
}
```

The default config in v0.1 must point to a free, local provider where
applicable, and document how to swap in any other.

### Configuration

Configuration order of precedence (highest to lowest):

1. Command-line flags
2. Environment variables (prefix: `SARVAM_CAST_*`)
3. User config file (`~/.config/sarvam-cast/config.toml` on Linux/Mac, equivalent on Windows)
4. Default config (shipped, but never with secrets)

---

## Anti-scope (do NOT build)

Not a full podcast hosting platform. Not a content discovery tool. Not a news aggregator beyond user-supplied RSS.

---

## Tombstone risk and mitigation

**Risk:** Spotify or Apple shipping AI-generated podcasts in Indic. Possible but Indic isn't priority. Medium probability over 12 months.

**Mitigation:** Ship fast (v0.1 in 2–3 weeks for v0.1). Build community early
(launch on Indian podcast Twitter, LinkedIn India creator economy, r/India, vernacular content forums). Even if upstream absorbs the feature, accumulated
stars and the community are the audience-build payoff.

**Kill signal:** Spotify ships personalized AI briefings for India.

If the kill signal triggers, the maintainer must announce within one week and
either (a) refocus on a remaining gap, (b) merge gracefully into upstream if
they're receptive, or (c) mark the repo as archived with a clear pointer to the
replacement.

---

## Launch plan

### Pre-launch checklist

- [ ] Repo on GitHub at `github.com/sovereign-shovels/sarvam-cast`
- [ ] README polished (see template in `_templates/`)
- [ ] At least 3 issues / discussions seeded (real ones, not placeholder)
- [ ] LICENSE, CODE_OF_CONDUCT, CONTRIBUTING present
- [ ] Demo asset (gif, screenshot, or short video — depending on category)
- [ ] First-launch post drafted for primary launch channel

### Day-1 launch

Post to: Indian podcast Twitter, LinkedIn India creator economy, r/India, vernacular content forums

Subject template (adjust per channel):
- Show HN: `Show HN: sarvam-cast – Subscribe to RSS, get a daily Hindi/Tamil/Telugu podcast. Bulbul TTS + LLM summary. Fully sovereign.`
- Reddit: `[OSS] Subscribe to RSS, get a daily Hindi/Tamil/Telugu podcast. Bulbul TTS + LLM summary. Fully sovereign.` with full post explaining the gap and the build
- Twitter/X: thread leading with the demo gif

### Week-1 follow-up

- Respond to every issue and comment within 24h.
- Ship at least one bugfix release based on launch feedback.
- Cross-post to secondary channels.

### Month-1 review

- Assess star velocity and community formation.
- If kill signal triggered, follow tombstone protocol above.
- If trajectory is healthy, plan v0.5.

---

## Cross-references

- Constitution: [[AGENTS]]
- Public README: [[README]]
- Progress frontmatter: [[progress]]
- Internal knowledge graph: [[knowledge-graph]]
