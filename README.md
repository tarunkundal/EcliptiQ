## About

EcliptiQ is a modern team and task management application that streamlines collaboration and boosts productivity. Built using cutting-edge technologies, including Vite, React.js, Chakra UI, TypeScript, and Supabase, EcliptiQ empowers teams to efficiently organize tasks, communicate effectively, and achieve their goals seamlessly.

## Features

- **User Authentication:** Secure user registration and login process with protected routes.
- **Team Creation:** Users can create and manage teams to streamline collaboration.
- **User Invitations:** Invite team members by email to join teams and collaborate.
- **Task Management:** Create, assign, and monitor tasks within your team.
- **Real-time Updates:** Experience real-time task updates and team communication.
  
## Getting Started

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/tarunkundal/ecliptiq.git
   cd ecliptiq

## Install Dependencies:
sh
Copy code
npm install
Set Up Supabase:

## Create a Supabase project: Supabase Quickstart
Set Supabase URL and API key in .env:
env
Copy code
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-api-key
Run the Development Server:

sh
Copy code
npm run dev

## Access the App:
Open your browser and navigate to http://localhost:3000.

## Technologies Used:
-- Vite
-- React.js
-- Chakra UI
-- TypeScript
-- Supabase
-- ESLint

------- Additional --------
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Contributing
We welcome contributions from the community! If you'd like to contribute:

Fork the repository.
Create a new branch: git checkout -b feature-name.
Implement your changes and commit: git commit -m "Add some feature".
Push to your branch: git push origin feature-name.
Create a pull request.
