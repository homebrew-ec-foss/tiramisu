---
title: Modal Editors
date: "2025-09-10"
tags: ["FOSS", "events", "nvim", "emacs", "devtools"]
collections: [announcements]
description: "Make your editor truly yours, supercharge your coding session with the power of 'hjkl"
previewimage: /static/images/gallery/modal-editors/modal-editors.png
authors: ["HSP"]
layout: post
---

Modal editors are a unique class of text editors that let you work with text through different modes, making editing, navigation, and command execution faster and more efficient. Popular examples like Vim and Neovim are used by developers worldwide for their productivity, minimal keystrokes, and ability to adapt to individual workflows.

This hands-on workshop is designed to give you a strong foundation in modal editing. You’ll explore the core principles that make these editors powerful and see how their workflows can dramatically improve your coding speed and precision.


By the end, you’ll not only understand how modal editors work but also have the confidence to start using them in real-world projects. Whether you’re completely 
new or looking to sharpen your skills, this session will help you unlock a faster, smarter way to code.

<br>

<div class="video-container">
<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube-nocookie.com/embed/21_o11RJH4M" frameborder="0"></iframe>
</div>

<br>

> For more details, check out the blog post here: [$homebrew/modal-editors](https://homebrew.hsp-ec.xyz/posts/modal-editors/)

If you have any questions or need help, reach out on our [Discord](https://discord.gg/M4C9bm9Y) forum for this event.


---

## Prerequisites:

Just bring along your laptop — that’s all you need to get started. **Please install Neovim before the workshop to save time and get started quickly.**

#### Windows

1. Download the installer: [Neovim v0.11.4 for Windows (.msi)](https://github.com/neovim/neovim/releases/download/v0.11.4/nvim-win64.msi)
2. Run the downloaded `.msi` file and follow the installation instructions. 
3. Open **Command Prompt** or **PowerShell**.
4. After installation, verify Neovim by running:
     ```sh
     nvim --version
     ```

---

#### macOS

1. Open **Terminal**.
2. If you don’t have Homebrew, [install it first](https://docs.brew.sh/Installation).

3. Install Neovim:
    ```sh
    brew install neovim
    ```
4. Launch Neovim:
    ```sh
    nvim --version
    ```

---

#### Linux/ChromeOS

1. Open **Terminal**.
2. Download the Neovim AppImage:

    Copy, paste the following into your terminal

    ```sh
    curl -LO https://github.com/neovim/neovim-releases/releases/download/v0.11.4/nvim-linux-x86_64.appimage;
    chmod u+x nvim-linux-x86_64.appimage;
    ./nvim-linux-x86_64.appimage --version;
    ```

    <details>
    <summary>Any error?</summary>

    Should you get an error, your system does not support FUSE, so extract the AppImage and run Neovim directly:

    ```sh
    ./nvim-linux-x86_64.appimage --appimage-extract
    ./squashfs-root/usr/bin/nvim --version
    ```
    </details>

<br>

3. Launch Neovim:
    ```sh
    ./nvim-linux-x86_64.appimage --version
    ```

---

> TLDR: You should see something like this

```sh
[blob@hsp:~]$ nvim --version 
NVIM v0.11.4
Build type: Release
LuaJIT 2.1.1753364724
Run "nvim -V1 -v" for more info
```


> You are all set for the workshop, see you wednesday!


If you have any questions or need help, reach out on our [Discord](https://discord.gg/M4C9bm9Y) forum for this event.
