# code-sandbox-proxy

**code-sandbox-proxy** is a lightweight service that allows sending data directly to the CodeSandbox app via a proxy. The proxy encodes the payload into a query string and performs a redirect to CodeSandbox. This is useful for generating sandboxes dynamically with predefined content or configurations.

## Features

- Dynamically create and configure a CodeSandbox environment.
- Send project data to CodeSandbox as JSON payload.
- Redirect users directly to the sandbox with a pre-configured setup.
- Ideal for creating quick demo projects, tutorials, or live code environments.

## Demo

Create a new CodeSandbox by clicking the link below:

[Hello World Sandbox](https://soul-master.github.io/code-sandbox-proxy/?parameters=%7B%22files%22%3A%7B%22index.html%22%3A%7B%22content%22%3A%22%3Chtml%3E%3Cbody%3E%3Ch1%3EHello%2C%20CodeSandbox!%3C%2Fh1%3E%3C%2Fbody%3E%3C%2Fhtml%3E%22%7D%2C%22index.js%22%3A%7B%22content%22%3A%22console.log(%27Hello%2C%20World!%27)%3B%22%7D%7D%7D)

This URL contains a `parameters` query string, which is an encoded URI component representing the following JSON:

### Request Definition

```json
{
  "files": {
    "index.html": {
      "content": "<html><body><h1>Hello, CodeSandbox!</h1></body></html>"
    },
    "index.js": {
      "content": "console.log('Hello, World!');"
    }
  }
}
```

The JSON payload is generated from the following files:

### index.html

```html
<html>
  <body>
    <h1>Hello, CodeSandbox!</h1>
  </body>
</html>
```

### index.js

```js
console.log('Hello, World!');
```

---

For more information, please visit [Define API](https://codesandbox.io/docs/learn/sandboxes/cli-api#define-api).

