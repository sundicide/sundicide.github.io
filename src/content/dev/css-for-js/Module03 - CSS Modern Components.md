---
title: "Module 03 - CSS Modern Components"
date: "2022-04-08"
draft: false
path: "/blog/study/css-for-js/module-03-css-modern-components/"
---

CSS의 가장 어려운 문제는 "Global"로 적용된다는 점이다.
이로 인해 다음과 같은 문제가 발생한다.

1. name collision 문제
2. 특정 element에 최종적으로 어떤 속성이 적용될지 확신할 수 없는 문제

이를 해결하기 위한 방법은 여러가지가 있는데 최근에는 CSS를 JS에 작성하는 CSS-in-JS 방식이 선호된다.

그렇다면 몇 가지를 비교 해보자.

### Vanilla CSS

이미 많이 익숙해져있고 build과정이 없기 때문에 별도의 성능고려를 하지 않아도 된다. 하지만 Global Scope가 문제가 되고 vendor prefix를 고려해야 하며 CSS와 JS간 데이터 교환이 쉽지 않다는 단점이 있다.

CSS와 JS간 데이터 교환은 언제 할까? 동적인 효과를 위해 사용한다.

만약 변수에 따라 애니메이션 스타일을 바꾸고 싶다면 Vanilla CSS를 사용한다면 변수를 선언하고 그 변수 값을 계속 변경해줘야 할 것이다. 이는 매우 번거로울 것이다.

### Sass / Less

vanilla css에서 for-loops, mixins, nesting 같은 강력한 툴을 추가적으로 지원해주지만, 여전히 global scope로 인한 문제들을 해결할 수 없으며 최근에는 CSS에 많은 기능들이 추가됨에 따라 keyword가 겹치는 경우도 발생하며 앞으로도 그럴 가능성이 있다. 예를 들면 `min` 키워드가 겹치는 일이 있다.

### CSS-in-JS

CSS의 문제인 global scope를 해결해 줄 뿐만 아니라, React같은 component-driven 아키텍처에 잘 맞는다.

하지만 별도의 build system이 필요할 뿐더러 JS 파일 내 여러 스타일 코드가 들어가 가독성을 해칠 수 있다. 그리고 많이 언급되는 단점은 다음과 같은 2가지 일 것이다.

1. bundle size
2. performance

먼저 bundle size를 보면 [https://bundlephobia.com/package/styled-components@5.3.5](https://bundlephobia.com/package/styled-components@5.3.5) styled-components의 경우 약 33kb이다. 보통 large hero image가 200kb인 것을 감안하면 그리 크지 않은 용량이라고 생각한다.

두 번째로는 성능 인데 저자는 초창기에는 문제가 됐었지만 요즘들어서는 많이 빨라져서 그리 큰 문제가 되지 않을 것이라고 얘기한다. 아래의 사이트를 보면 library 별 benchmark를 해볼 수 있다.

[https://necolas.github.io/react-native-web/benchmarks/](https://necolas.github.io/react-native-web/benchmarks/)

위와 같은 이유로 저자는 styled-components 같은 CSS-in-JS 라이브러리들이 여러 단점들을 극복할 만큼의 장점을 제공해준다고 얘기한다.
