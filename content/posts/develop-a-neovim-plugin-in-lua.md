---
author: "Max Shen"
title: "Develop a Neovim plugin in Lua"
date: 2023-09-15
summary: "Learn how to develop a Neovim plugin in Lua. Understand the structure of Neovim plugin, Lua module, and create a simple plugin."
tags: ["Neovim", "Lua"]
---

## Setup project

Before developing the plugin, we need to set it up. There are two different approaches:

1. setup with GitHub repository
2. setup locally

### Setup with GitHub repository

1. Create a new repository on GitHub (e.g.: example.nvim)
2. Install it with a plugin manager

```lua
-- lazy.nvim
{
   "m4xshen/example.nvim" -- replace this with your {user_name}/{repo_name}
}
```

3. `cd` to the directory where the plugin is installed

```bash
cd ~/.local/share/nvim/lazy/example.nvim
```

### Setup locally

1. Create a new directory on your local machine

```bash
mkdir ~/example.nvim
```

2. Install it with a plugin manager

```lua
-- lazy.nvim
{
   dir = "~/example.nvim"
}
```

3. `cd` to the directory

```bash
cd ~/example.nvim
```

## Plugin structure

Now the plugin is setup and installed. Let's learn about its folder structure.

At the root of your plugin, create a structure like this (replace the `example` with your plugin name):

```text
example.nvim/
├── lua
│   └── example
│       └── init.lua
└── plugin
    └── example.lua
```

### `plugin/`

The files inside `plugin/` folder will be executed when Neovim starts. Try to add the following line to `example.lua`:

```lua
print("plugin/example.lua is executed!")
```

Open a new Neovim instance after that, you'll see the string printed because Neovim runs the Lua code of the file.

### `lua/`

Most of the time you don't want the plugin to execute everything at startup. You want it to run some functions when events happened, command called, etc. and organize the code in a structured way. That's where Lua module comes into play.

A Lua module is a regular Lua table that is used to contain functions and data. The table is declared local not to pollute the global scope. For example:

```lua
local M = {} -- M stands for module, a naming convention

function M.setup()
   print("hello")
end

return M
```

If you want to load Lua module on demand, you can place them inside the `lua/` directory in your `'runtimepath'` and load them with `require`.

Here are the rules when `require` finding files:
- Any `.` in the module name is treated as a directory separator when searching.
- When the file with module name is not searched, it then searches for `init.lua` inside the folder with module name.
- You don't need to type the `.lua` extension.

Example: For a module `foo.bar`, each directory inside `'runtimepath'` is searched for `lua/foo/bar.lua`, then `lua/foo/bar/init.lua`.

So if you put the code above into `lua/example/init.lua`, you can run `:lua require("example").setup()` to print hello. That is because the plugin manager added the folder of the plugins into `'runtimepath'` for you. Therefore the `require` can find this file.

## Example

After understanding the structure of Neovim plugin, let's finish the example.nvim! This plugin does 2 simple things:
- It maps the `<Leader>h` to print `hello` to the user.
- If user specify their name when setting up plugins, it prints `hello, {user_name}` instead.

Here's the `lua/example/init.lua`:

```lua
local M = {}

function M.setup(opts)
   opts = opts or {}

   vim.keymap.set("n", "<Leader>h", function()
      if opts.name then
         print("hello, " .. opts.name)
      else
         print("hello")
      end
   end)
end

return M
```

You need to call `setup` after installing plugin:

```lua
require("example").setup()
```

Or if you are using lazy.nvim:

```lua
{
   "m4xshen/example.nvim",
   opts = {}
}
```

Notice that we use `vim.keymap.set` which is only available after Neovim 0.7.0. We need to add a version checker and it should be executed automatically at startup, so it should be put inside `plugin/` folder.

Here's the `plugin/example.lua`:

```lua
if vim.fn.has("nvim-0.7.0") ~= 1 then
   vim.api.nvim_err_writeln("Example.nvim requires at least nvim-0.7.0.")
end
```

After that this simple plugin is finished. Now try pressing `<Leader>h` and the greeting message should be printed! You can also set your name inside `setup` function so that it prints greeting message with name:


```lua
require("example").setup({
   name = "Max",
})
```

Or if you are using lazy.nvim:

```lua
{
   "m4xshen/example.nvim",
   opts = {
      name = "Max",
   }
}
```

Check out the [complete source code](https://github.com/m4xshen/example.nvim).

## Final Words

Getting started is the hardest part when developing a Neovim plugin first time. I hope this tutorial helps you out. If you have any questions, feel free to ask in the comment section.
