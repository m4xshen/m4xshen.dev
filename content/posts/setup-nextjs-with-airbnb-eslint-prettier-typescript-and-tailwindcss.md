---
author: "Max Shen"
title: "Setup Next.js with Airbnb ESLint, Prettier, TypeScript and Tailwind CSS"
date: 2023-09-10
summary: "Set up Next.js with Airbnb ESLint, Prettier, TypeScript, and Tailwind CSS for efficient development. A step-by-step guide for a seamless environment."
tags: ["web", "frontend"]
---

🚀 Before we dive into the main topic, I want to share a recent project of mine: [repohistory](https://github.com/repohistory/repohistory). Designed for GitHub users, it extends repo traffic history tracking well beyond the usual 14-day period, offering deeper project insights. Now, let’s delve into today’s focus…

In this tutorial you'll learn how to setup a Next.js project with Airbnb ESLint, Prettier, Typescript and Tailwind CSS in a correct way so that you don't need to turn off a lot of rules inside `.eslintrc.json` anymore.

## Create Project

I recommend starting a new Next.js app using `create-next-app`, which sets up everything automatically for you.

```
npx create-next-app@latest
```

Remember to select `Yes` for these 3 prompts to have a basic setup for TypeScript, ESLint and Tailwind CSS:

```
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
```

## Prettier

Prettier is an code formatter. You can install it with your package manager:

```
yarn add --dev --exact prettier
```

```
npm install --save-dev --save-exact prettier
```

Then, create a config file named `.prettierrc.json`.

Check out all possible config [options](https://prettier.io/docs/en/options). If you don't need to set any options, just leave a `{}`.

Example:

```json
{
  "singleQuote": true,
}
```

At this point you can run the Prettier and it should works!

```
yarn prettier . --write
```

```
npx prettier . --write
```

You can also setup Prettier for your editor so that you can run Prettier efficiently with keymap. See [docs](https://prettier.io/docs/en/editors).

## Tailwind CSS

There's an official Prettier plugin for Tailwind CSS that scans your files for class attributes containing Tailwind CSS classes, and then sorts those classes automatically following the [recommended class order](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted).

Install the plugin:

```
yarn add --dev prettier prettier-plugin-tailwindcss
```

```
npm install --save-dev prettier prettier-plugin-tailwindcss
```

Add the following line into the prettier config:

```
"plugins": ["prettier-plugin-tailwindcss"]
```

Now the example config becomes:

```json
{
  "singleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

If you run Prettier now, the Tailwind CSS classes name will be sorted!

## ESLint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript code, with the goal of making code more consistent and avoiding bugs.

You can add community plugins, configurations, and parsers to extend the functionality of ESLint.

1. Airbnb's rules for ECMAScript 6+ and React

```
npx install-peerdeps --dev eslint-config-airbnb
```

Add `airbnb` and `airbnb/hooks` to `.eslintrc.json`:

```json
{
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "next/core-web-vitals"
  ]
}
```

(`next/core-web-vitals` is the default rule set by `create-next-app`)

If you run lint now:

```
yarn run lint
```

```
npm run lint
```

You'll see error like:

```
JSX not allowed in files with extension '.tsx'
```

which means that we don't have the TypeScript support in our setting now.

2. Airbnb's rules for TypeScript

Install:

```
yarn add eslint-config-airbnb-typescript \
            @typescript-eslint/eslint-plugin@^6.0.0 \
            @typescript-eslint/parser@^6.0.0 \
            --dev
```

```
npm install eslint-config-airbnb-typescript \
            @typescript-eslint/eslint-plugin@^6.0.0 \
            @typescript-eslint/parser@^6.0.0 \
            --save-dev
```

Add `airbnb-typescript` and `parserOptions` to `.eslintrc.json`:

```json
{
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "next/core-web-vitals"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

3. Integrate Prettier with ESLint

Finally, we need to turn off all rules that are unnecessary or might conflict with Prettier, which can be done with the following package:

```
yarn add --dev eslint-config-prettier
```

```
npm install --save-dev eslint-config-prettier
```

Add it to `.eslintrc.json`:

```json
{
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "next/core-web-vitals",
    "prettier"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

Each rule will extend or overwrite the previous ones, and in this situation we want to turn off the rules that might conflict with Prettier, so we should put it at the end of the list.

## Final Words

After following this tutorial, you should setup an awesome environment for developing Next.js project. All of the installation and setup commands are taken from the following official docs. You can check them out for more detail explanation:

- [Next.js](https://nextjs.org/docs/getting-started/installation)
- [Prettier](https://prettier.io/docs/en/install)
- [Tailwind CSS Plugin](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript)
- [Integrating Prettier with Linters](https://prettier.io/docs/en/integrating-with-linters.html)
