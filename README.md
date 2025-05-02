# Dragon Ball Explorer

A Nuxt 3 application for exploring Dragon Ball characters and registering planets.

## Features

- **Character List Page**: Browse Dragon Ball characters with pagination, grid and list views
- **Character Detail Page**: View detailed information about a specific character
- **Planet Registration**: Register new planets with name, description, and image URL

## Technologies Used

- **Nuxt 3**: Vue.js framework for building the application
- **Vue 3 Composition API**: For reactive state management
- **Local Storage**: For storing registered planets
- **Responsive Design**: Mobile-friendly UI that works on all devices

## Pages

1. **Home Page (`/`)**: Lists Dragon Ball characters with pagination
2. **Character Detail Page (`/characters/[id]`)**: Shows details for a specific character
3. **Planet Registration Page (`/planets/register`)**: Form to register new planets

## API Integration

The application integrates with the Dragon Ball API:

- Character list: `dragonball-api.com/api/characters?page=2&limit=5`
- Character details: `https://dragonball-api.com/api/characters/1`

## Setup

Make sure to install dependencies:

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
pnpm dev

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
pnpm build

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
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
