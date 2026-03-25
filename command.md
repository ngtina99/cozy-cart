1. npm create vite@latest mini-ecommerce-vue
CHOOSE:
Vue->framework using UI components, beginner friendly syntax
JavaScript-> web development language

Vite is NOT:

👉 It’s a build tool / development tool
fast tool that creates, runs, and builds your web app
running a development server
2.  npm install (node package manager)
    npm run dev

👉 This starts a local server, like:
http://localhost:5173

Install project dependencies from package.json.
This downloads things like:
- Vue
- Vite
other required packages


App.vue
  -> passes data down as props
  <- receives events up through emits

👉 It looks like two-way… but it’s actually not.

🔑 The key idea

Data only flows DOWN
Events go UP (but don’t carry state)