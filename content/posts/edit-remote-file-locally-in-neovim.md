---
author: "Max Shen"
title: "Edit Remote File Locally In Neovim"
date: 2024-01-01
summary: "This tutorial teach you how to edit remote fiels locally in Neovim with scp command"
tags: ["Neovim"]
draft: true
---

When working on remote machine, its annoying to install Neovim and copy config files. Some machines even don't have the ability to install or run latest version of Neovim. One great way to solve this problem is to edit remote file locally.

## How

Neovim can edit remote file with `scp` command. However Neovim currently only support ssh connection without password. To fix this, you have to [configure ssh login without password](https://www.ibm.com/support/pages/configuring-ssh-login-without-password).

After this, you can run:
```text
nvim scp://{username}@{host}/{directory or file}
```
to edit remote files on your local machine.

Example:
```
nvim scp://m4xshen@123.123.123.123/~/
```

This will open the remote home folder with netrw.

If you use the filename instead of folder. Neovim will open the file directly.

## Common Issues

Sometimes the host don't allow you to log in with public keys and you don't have the permission to change it. Here's an [alternative method](https://github.com/neovim/neovim/issues/8982#issuecomment-868505800).
