---
title: "Fullstack D3 Master Class"
date: "2023-01-25"
draft: false
path: "/blog/education/fullstack-d3-master-class/"
---

https://codesandbox.io/s/d3-practice-7zs7i7?file=/src/index.js


데이터를 불러오는 방법에는 여러가지가 있다.

d3.csv(), d3.json(), and d3.xml(). Since we're working with a JSON file, we want to pass our file path to d3.json().


### Accessor
getter와 같은 용도로 쓰인다.

```javascript
const xAccessor = d => d.date
const yAccessor = d => d.temperatureMax
```

근데 데이터의 형태가 date는 string으로 들어있기 때문에 축으로써 사용하기를 힘들다. 왜? string으로는 대소비교를 할 수 없기 때문이다. <br />
그렇기에 d3의 `timeparse`를 이용해 string을 date obj로 변환해서 쓴다.

```javascript
const dateParser = d3.timeParse("%Y-%m-%d")
const xAccessor = d => dateParser(d.date)
```