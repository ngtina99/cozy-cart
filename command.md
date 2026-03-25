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


# App.vue
  -> passes data down as props (properties) jellemzőségek/tulajdonságok
  <- receives events up through emits (signal, kibocsát)

szülő → gyerek (props)
gyerek → szülő (emit)

🔑 The key idea

Data only flows DOWN
Events go UP (but don’t carry state)

1. Data goes DOWN
<Child :items="items" />

👉 Parent → Child

2. Events go UP
emit('add-item', newItem)

👉 Child → Parent
👉 Child is just saying:

“Hey, something happened”

3. Parent decides everything
function addItem(newItem) {
  items.value.push(newItem)
}

👉 Only the parent changes the data

🧠 Why this is still ONE-WAY

Because:

❗ The data itself never flows back up automatically

The child:

❌ cannot mutate parent state directly
✅ can only request changes via eve


| v -Event  | When it fires  |
| --------- | -------------- |
| `@input`  | typing         |
| `@change` | select changed |
| `@click`  | button clicked |
