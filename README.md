# ffmpeg example

```javascript
const input = "/Users/liuxichuan/GM/douyin-cocacola-led/public/webp/input.webm";
const output = "/Users/liuxichuan/output.mp4";
const outputOptions = [
  "-c:v libx264",
  "-crf 23",
  "-preset fast",
  "-c:a aac",
  "-b:a 128k",
];
window.__electron_preload__invokeFFmpeg?.({
  input,
  outputOptions,
  onProgress(progress) {
    console.log(progress);
  },
  output,
});
```

# Add component

```
npx shadcn-vue@latest add [package]
```

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
