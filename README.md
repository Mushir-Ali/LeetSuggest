# LeetSuggest

A tiny Chrome extension that adds identifier autocomplete to LeetCode's code editor.

Declare `vector<int> multipleBits;`, type `mul` on the next line, and a suggestion popup appears. Press Tab or Enter to insert the full name. Works for every language LeetCode supports.

## Why

LeetCode's editor is built on Monaco (the same engine as VS Code), but word-based suggestions are turned off. So you end up retyping long variable names over and over. This extension turns them back on and keeps them on.

## Install

Not on the Chrome Web Store yet. To run it locally:

1. Clone or download this repo.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.
5. Open any LeetCode problem. Suggestions should appear as you type.

## How it works

The whole thing is one content script, about 20 lines.

- It runs in the page's **main world** (`"world": "MAIN"` in the manifest) so it can reach `window.monaco`, which is invisible to ordinary content scripts.
- It polls until LeetCode has created its editor, then picks the editor whose language isn't `plaintext` (the other one is the testcase input box).
- It calls `editor.updateOptions({ wordBasedSuggestions: "currentDocument", quickSuggestions: true })`.
- LeetCode resets editor options when you switch problems, so the script listens to `onDidChangeConfiguration` and re-applies the settings whenever they get wiped.

No permissions beyond running on `leetcode.com/problems/*`. No data is collected or sent anywhere.

## Limitations

- Suggestions are word-based: any word already in the editor can be suggested, including words from comments and strings. That's the same behaviour VS Code has for plain-text files.
- No STL or standard-library completions (`vec.push_back`, etc.) — only identifiers you've already typed.
- LeetCode has no public API for its editor, so this relies on page internals. If LeetCode changes how it loads Monaco, this may need updating.

## Roadmap

- [ ] Custom completion provider that only suggests declared identifiers, with proper variable/function icons
- [ ] Optional standard-library method suggestions per language
- [ ] Chrome Web Store listing

## Files

```
manifest.json   extension config
index.js        the content script
icon128.png     icon
```
