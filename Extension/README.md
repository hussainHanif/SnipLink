# sniplink README

SnipLink is a lightweight VS Code extension + web viewer combo that lets you instantly generate a **shareable link** for any code snippet you select. Share your code across Slack, email, or anywhere else — no need to commit or push. Just **copy, paste, and share**.

## Features

SnipLink lets you instantly share selected code snippets from VS Code via a public link. Below are its key features:

Instantly Generate Shareable Links
Select a block of code, run the SnipLink: Copy and Share Code command, and a link is automatically created and copied to your clipboard.

View Snippets in Browser
Anyone with the link can open the snippet in a clean, readable browser page — no login or app required.

Built-in QR Code
Click the QR icon to generate a scannable code — perfect for sharing with teammates on mobile devices.

Clipboard Automation
After sharing, the extension automatically copies the link so you can paste it anywhere (e.g. Slack, email, chat).

Minimal & Private
Snippets are stored in MongoDB and viewable only through the unique link. No need to push code or create accounts.

Screenshots
You can place screenshots or GIFs inside the images/ folder and reference them like this:


Tip: GIFs showing code selection → command palette → QR code popup work great!

## Requirements

To use SnipLink, you'll need the following:

Visual Studio Code – Download the latest version.

Internet connection – Required to upload snippets and generate shareable links.

That’s it — no login, no setup, no configuration needed.

SnipLink works out of the box. Just install the extension, select some code, and run the "SnipLink: Copy and Share Code" command.


## Extension Settings

SnipLink is designed to work out of the box with no setup required. However, future versions may support custom configurations.

Currently, this extension does not contribute any user-configurable settings.

Stay tuned for upcoming features like custom expiration times, auto-delete options, or private sharing modes.

<!-- ## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension. -->

## Release Notes

 First public release of SnipLink

 Generate and copy shareable links from selected code

 View snippets in a clean, browser-based UI

 Auto-copy links to clipboard

 Optional QR code for quick mobile access

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

SnipLink has been built following Visual Studio Code’s Extension Guidelines to ensure a smooth, performant, and secure experience for users.

We adhere to best practices in:

Activation control (only activates when needed)

Accessibility and UX consistency

Secure use of clipboard and APIs

Clean command naming and contribution points


## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
