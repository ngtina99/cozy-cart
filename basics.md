1. I do a very basic structure and later I design deeper
2. Really basic styling
3. Behaviour, if everything works:
4. Final design

Your HTML:
```html
<body>
  <h1>Hello</h1>
  <p>Welcome</p>
</body>
```

The browser turns it into a structure like:

```bash
body
 ├── h1 ("Hello")
 └── p ("Welcome")
```
👉 This structure = DOM - Document Object Model
Tree-like structur of the webpage

# Basic structure:
```bash
my-shop-app/
  index.html
  package.json
  vite.config.js
  src/
    main.js
    App.vue
    components/
```

# index.html

This is the base HTML page.

It usually contains a root element like:
```html
<div id="app"></div>
```
This is where the Vue app gets mounted.

the empty container in the browser
Vue will take control inside this box

# package.json

| Term         | Meaning                                    |
| ------------ | ------------------------------------------ |
| Scripts      | Commands you run (`npm start`)             |
| Dependencies | Libraries your app uses (`react`, `axios`) |

This describes the project to Node/npm.

It contains things like:
- project name
- scripts
- dependencies

Example:
Vue is a dependency
Vite is a dev dependency
npm run dev is a script

This file is important, but at the beginning you don’t “code” in it much.

# src/main.js

This is the entry point of your Vue app.

Its job is usually:
- import Vue
- import App.vue
- mount the app into #app

Conceptually:
```bash
createApp(App).mount('#app')
```

Meaning:
- create the application using App
- put it inside the HTML element with id app

Before mounting:
```bash
<div id="app"></div>
```

After mounting:
```bash
<div id="app">
  <h1>Hello world</h1>
</div>
```

# src/App.vue

This is the root component.

In our project, this will be the main coordinator.

It will likely:
- hold products
- hold cart
- hold filter state
- pass data to children
- receive events from children

This is the “brain” of our small app.

# src/components/

This folder contains smaller UI pieces.

For this task:
- FiltersBar.vue
- ProductList.vue
- ProductCard.vue
- CartSummary.vue

Each one should do one job well.

# .vue file looks like

A Vue single-file component usually has 3 parts:

<script setup>
</script>
-> This is where the logic goes.

<template>
</template>
-> structure, HTML with Vue superpowers, HTML that can think (react to data and logic)

<style scoped>
</style>
-> style, This is CSS for that component.

1. State

The data your UI depends on.

In our app:
- products
- cart
- search text
- selected category
- sort option

2. Reactive state

State that Vue watches.

- If it changes, UI updates.

3. Derived state

Data computed from other data.

Example:
- visible products
- cart total
- cart item count

We usually use computed for this.

4. Props

Data passed from parent to child.

Example:
- App.vue passes products to ProductList.vue

5. Emits

Messages sent from child to parent.

Example:
- ProductCard.vue emits “add-to-cart”

6. One-way data flow

Data goes down with props, events go up with emits.

This creates predictable architecture.

That is professional frontend thinking.



# A list of products
What kind of data structure fits a list of products?

An array.

- order matters
- we have multiple items
- we want to loop over them

What should each item in the array be?

An object.

Because a product has multiple properties:

- id
- name
- price
- category
- inStock
- rating

🔹 1. v-model

👉 Two-way data binding

<input v-model="name" />

🔹 2. v-bind (or :)

👉 Bind attributes dynamically

<img :src="image" />

🔹 3. v-on (or @)

👉 Listen to events

<button @click="handleClick">Click</button>

🔹 4. v-if

👉 Conditional rendering

<p v-if="isLoggedIn">Welcome</p>

🔹 5. v-else / v-else-if
<p v-if="ok">Yes</p>
<p v-else>No</p>

🔹 6. v-for

👉 Loop through data

<li v-for="item in items" :key="item.id">
  {{ item }}
</li>

🔹 7. v-show

👉 Show/hide (CSS-based)

<p v-show="visible">Hello</p>

🔹 8. v-text

👉 Insert text

<p v-text="message"></p>

(same as {{ message }})

🔹 9. v-html

👉 Render HTML (careful ⚠️)

<div v-html="htmlContent"></div>

| Situation          | Use     |
| ------------------ | ------- |
| Value won’t change | `const` |
| Value will change  | `let`   |
