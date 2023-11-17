---
author: "Max Shen"
title: "Build your modern Neovim config in Lua"
date: 2023-02-26
summary: "Learn how to build a modern Neovim configuration in Lua with options, mappings, autocmds, and plugins. Follow a structured approach to enhance your Neovim experience."
tags: ["Neovim"]
---

🚀 Before we dive into the main topic, I want to share a recent project of mine: [repohistory](https://github.com/repohistory/repohistory). Designed for GitHub users, it extends repo traffic history tracking well beyond the usual 14-day period, offering deeper project insights. Now, let’s delve into today’s focus…

In this tutorial you'll learn how to build and structure a modern Neovim config in Lua. I'll go through options, mappings, autocmds and plugins. You can read along with [my configuration](https://github.com/m4xshen/dotfiles/tree/main/nvim/nvim).

To learn more about what each option does, use `:h 'option name'` in Neovim.

## How Neovim loads config

Neovim supports using `init.lua` as the configuration file. This should be placed in your config directory:
- Linux, BSD or macOS: `~/.config/nvim` 
- Windows: `~/AppData/Local/nvim/` 

Although you can put all the settings inside `init.lua`, you probably don't want to because the file will become large and difficult to manage.

To avoid this, separate files to multiple modules and then load them in the `init.lua` using `require`. You can place those modules in the `lua/` directory in your `runtimepath` (a list of directories to be searched on startup).

My Neovim config structure:

```text
~/.config/nvim
|-- init.lua
|-- lua/
|  |-- config/
|  |  |-- options.lua
|  |  |-- mappings.lua
|  |  |-- autocmds.lua
|  |  |-- lazy.lua
|  |-- plugins/
|     |-- autoclose.lua
|     |-- lsp.lua
|       :
```

The first line of `init.lua`:
```lua
require("config.options")
```

When Neovim reads this line on startup, it goes through the `runtimepath`, search for `lua/` and load `/config/options.lua`. The default `runtimepath` includes includes `~/.config/nvim`. This is why we put the `lua/` inside it.

### Notes

- `.` in the module name is treated as a directory separator when searching.
- You don't need to type the `.lua` extension.

Now we understand how Neovim finds our files. We can start configuring it! Note that all the directories specified below start from the Neovim config directory.

## Options

You can set options via Lua in two ways: `vim.opt` and `vim.o` series. I recommend using `vim.opt` series because it is more Lua-style, you can:
- use `:append()`, `:prepend()` and `:remove()` to manipulate options
- set its value to Lua table

(see the differences between them with `:h lua-guide-options`)

You can set options with `vim.opt.option-name = value`.

Part of my [lua/config/option.lua](https://github.com/m4xshen/dotfiles/blob/main/nvim/nvim/lua/config/options.lua):

```lua
-- enable line number and relative line number
vim.opt.number = true
vim.opt.relativenumber = true

-- width of a tab
vim.opt.shiftwidth = 2
vim.opt.tabstop = 2
vim.opt.softtabstop = 2

-- use number of spaces to insert a <Tab>
vim.opt.expandtab = true
```

Remember to `require("config.options")` in `init.lua`.

## Keymap

Define your leader key: (I use space. Change this to whatever you like.)
```lua
vim.g.mapleader = " "
```

Add a new mapping:

```lua
vim.keymap.set({mode}, {lhs}, {rhs}, {opts})
```

- `{mode}` (string or table) mode short-name
  - `""`: Normal, Visual, Select, Operator-pending mode
  - `"n"`: Normal mode
  - `"v"`: Visual and Select mode
  - `"s"`: Select mode
  - `"x"`: Visual mode
  - `"o"`: Operator-pending mode
  - `"i"`: Insert mode
  - `"t"`: Terminal mode
  - `"!"`: Insert Insert and Command-line mode
- `{lhs}`: (string) left-hand side of the mapping, the keys we want to map
- `{rhs}`: (string or function) right-hand side of the mapping, the keys or function we want to execute after pressing `{lhs}`
- `{opts}`: (table) optional parameters
  - silent: define a mapping that will not be echoed on the command line
  - noremap: disable recursive mapping

See all available options with `:h map-arguments`.

Part of my [lua/config/mappings.lua](https://github.com/m4xshen/dotfiles/blob/main/nvim/nvim/lua/config/mappings.lua):

```lua
-- map leader+w to save current file in normal mode
vim.keymap.set("n", "<Leader>w", ":write<CR>", { noremap = true, silent = true })

-- map leader+y to copy to system clipboard in normal and visual mode
vim.keymap.set({ "n", "v" }, "<Leader>y", '"+y', { noremap = true, silent = true })
```

Remember to `require("config.mappings")` in `init.lua`.

## Auto commands

Create an autocommand event handler:

```lua
nvim_create_autocmd({event}, {*opts})
```

{event}: (string or array) events that will trigger the handler
- BufEnter: after entering a buffer
- CmdlineLeave: before leaving the command-line

See all available events with `:h autocmd-events`.

{opts}: options
- pattern (string or array): pattern to match
- callback (function or string): Lua function called when the event is triggered

See all available options with `:h nvim_create_autocmd`.

Part of my [lua/config/autocmds.lua](https://github.com/m4xshen/dotfiles/blob/main/nvim/nvim/lua/config/autocmds.lua):

```lua
-- set tab to 3 space when entering a buffer with .lua file
vim.api.nvim_create_autocmd("BufEnter", {
   pattern = { "*.lua" },
   callback = function()
      vim.opt.shiftwidth = 3
      vim.opt.tabstop = 3
      vim.opt.softtabstop = 3
   end
})
```

Remember to `require("config.autocmds")` in `init.lua`.

## Plugins

At this point, you should already have a basic Neovim setup. However you can install plugins to make it even better!

I use [lazy.nvim](https://github.com/folke/lazy.nvim) to manage my plugins. We need to install it first. Remember to `require("config.lazy")` in `init.lua`.

Here's my [lua/config/lazy.lua](https://github.com/m4xshen/dotfiles/blob/main/nvim/nvim/lua/config/lazy.lua):

```lua
-- install lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
   vim.fn.system({
      "git",
      "clone",
      "--filter=blob:none",
      "https://github.com/folke/lazy.nvim.git",
      "--branch=stable", -- latest stable release
      lazypath,
   })
end
vim.opt.rtp:prepend(lazypath)

-- load plugins
require("lazy").setup("plugins")
```

The command on the last line loads all the `.lua` file under `lua/plugins/` and the returned table will be merged and passed to `setup()`.

Example (my [lua/plugins/autoclose.lua](https://github.com/m4xshen/dotfiles/blob/main/nvim/nvim/lua/plugins/autoclose.lua)):

```lua
return {
   {
      "m4xshen/autoclose.nvim",
      opts = {
         options = {
            disabled_filetypes = { "text" },
            disable_when_touch = true,
            pair_spaces = true,
         },
      },
   },
   "windwp/nvim-ts-autotag",
   {
      "kylechui/nvim-surround",
      version = "*",
      event = "VeryLazy",
      config = function()
         require("nvim-surround").setup({
            keymaps = {
               normal = "gs",
               normal_cur = "gss",
            },
         })
      end,
   },
}
```

In the returned table, the first line is the plugin's short url and the rest are arguments(optional) to set plugins up:

- `config`: Function that is executed when the plugin loads. The default implementation will run `require("plugin").setup(opts)`.
- `opts`: Passing options to the `config` function.
- `init`: Functions that is executed during startup.

Check out all available option on lazy.nvim's [README.md](https://github.com/folke/lazy.nvim#-plugin-spec).

Follow this pattern to install and set other plugins up. You can also see my [plugins config files](https://github.com/m4xshen/dotfiles/tree/main/nvim/nvim/lua/plugins) to get some ideas.

## Final Words

Now you have a modern Neovim configuration file written in Lua! If you want to explore more, you can install plugins like [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) and [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig). These plugins can give you better experience when coding.

Discover more plugins on:
- [Awesome Neovim](https://github.com/rockerBOO/awesome-neovim)
- [This Week in Neovim](https://dotfyle.com/this-week-in-neovim)
