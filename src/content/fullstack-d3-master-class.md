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

### area
차트를 그릴 때 Wrapper와 Bounds에 대한 정의가 필요하다. 선택한 단어는 강의에서 편하고자 정의한 것이니 general하지 않을 수 있다. 

* Wrapper: 차트, 축 및 여백을 포함한 모든 영역을 지칭
* Bounds: 축을 제외한 차트가 그려지는 내부만 지칭

이를 정의해야 원하는 크기의 차트와 축을 그리기 쉽다.

```javascript
let dimensions = {
  width: window.innerWidth * 0.9,
  height: 400,
  margin: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60,
  },
}

const { height, width, margin } = dimensions

dimensions.boundedWidth = width - margin.left - margin.right
dimensions.boundedHeight = height - margin.top - margin.bottom

### select

const wrapper = d3.select("#wrapper")

### adding svg

Web API의 createElement와 appendChild를 D3는 한 번에 해결할 수 있다.
const svg = wrapper.append("svg")

`.attr()` 메소드를 이용해 attr을 추가할 수 있다.
svg.attr("width", dimensions.width)
svg.attr("height", dimensions.height)

위의 코드를 한 번에 해결할 수도 있다.

const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)


```