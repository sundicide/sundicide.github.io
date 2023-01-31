---
title: "01-Fundamentals"
date: "2023-01-31"
draft: false
path: "/blog/dev/joy-of-react/01-fundamentals/"
---

## Introduce

Facebook team은 phantom message라고 불리우는 문제(새로운 메세지가 왔다고 빨간 Badge가 뜨지만, 클릭해서 보면 아무런 메세지가 없는 버그)가 있었고 이를 해결하면 또 다른 문제가 발생하곤 했다.
<br />
이것을 React로 해결했다. 자세한 내용은 아래에서 확인 가능하다.
[(Youtube)Hacker Way: Rethinking Web App Development at Facebook](https://youtu.be/nYkdrAPrdcw?t=624)
<br />
리액트의 장점은 DOM과 JS간 state sync를 신경쓰지 않아도 된다는 점이다.
<br />
기본 예제는 아래와 같다.
```javascript
// 1. Import dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';

// 2. Create a React element
const element = React.createElement(
  'p',
  { id: 'hello' },
  'Hello World!'
);

// 3. Render the application
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(element);
```
`react`와 `react-dom`은 왜 나눴을까? <br/>
바로 `platform agnostic` 때문이다.

* react-dom for the web
* react-native for mobile (iOS / Android) or desktop (Windows / MacOS) applications
* react-three-fiber for 3D scenes using WebGL and Three.js

> DOM: DOM stands for Document Object Model. <br/>
static 한 HTML을 Browser가 DOM으로 변경해서 사용자에게 보여주게 된다.

`render` function은 React elements를 DOM으로 변경해준다.

아래와 같은 예제도 찾을 수 있는데 이는 React v17 혹은 그 이전 버전 방식이다.
```javascript
import ReactDOM from 'react-dom';

ReactDOM.render(
  element,
  container
);
```