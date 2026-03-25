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

import Vue
import App.vue
mount the app into #app

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

