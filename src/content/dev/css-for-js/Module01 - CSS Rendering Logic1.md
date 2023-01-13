---
title: "Module 01 - CSS Rendering Logic 1"
date: "2022-03-26"
draft: false
path: "/blog/study/css-for-js/module-01-css-rendering-logic-1/"
---

## 기본 설정

CSS는 contnet의 외관을 제어하는 것이다.
그렇다면 아무런 CSS를 삽입하지 않아도 스타일이 기본으로 적용되는 이유는 뭘까?
바로 브라우저마다 기본 CSS를 제공하기 때문이다.

브라우저에 기본 CSS를 살펴본 적이 없다면 [Chrome 기본 CSS](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/resources/html.css)를 살펴보도록 하자.

많은 개발자들은 기본으로 정의된 CSS를 재정의 하기 위해 본인들만의 css파일을 만들어서 적용하는데 예시로 아래와 같은 코드를 포함한다.

```css
* {
  box-sizing: border-box;
}
```

## 상속

CSS는 부모로부터 상속 받을 수 있다. 하지만 모든 속성은 아니고 [MDN - 상속](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance) 에서 확인할 수 있다.

참고 링크
- [https://www.sitepoint.com/css-inheritance-introduction/#list-css-properties-inherit](https://www.sitepoint.com/css-inheritance-introduction/#list-css-properties-inherit)
- [https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)

## Cascade

CSS는 Cascading Style Sheets의 줄임말이다. 그렇다면 cascade는 무슨 의미일까? [MDN - CSS Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade)를 살펴보면 이에 대한 설명이 나와있다.

> different sources로부터 오는 property values를 어떻게 combine 할지에 대한 알고리즘이다.

단순히 cascade란 단어를 사전에서 검색해보면 *작은 폭포, 폭포가 되어 떨어지다* 정도의 의미인데 보통은 CSS가 폭포처럼 아래쪽 레벨(높은 우선 순위 scope)에서 추가된 스타일일 수록 우선순위가 높기에 이런 이름을 지은것이 아닐까 싶다.

위의 MDN 문서내 **Cascading order** 항목을 살펴 보면 origin에 따라 레벨이 다른 것을 볼 수 있는데 여기에서 왜 `!important`를 쓰면 우선순위가 올라가는지를 알 수 있다. 또한 author origin(사이트에 정의된 style)은 !important 내에서 우선순위가 제일 낮고, user agent origin(browser가 정의한 style)의 !important가 가장 높음을 알 수 있다.

## 방향

margin에서 `margin-block-start` 속성을 본 적이 있는가? 이 속성은 왜 있을까?

이에 대한 답은 언어마다 `방향`이 다르기 때문이다. 한국인은 좌 -> 우, 상 -> 하 로의 흐름이 기본이지만 Arabic 언어는 우 -> 좌 로 글을 쓴다. 그렇기에 이런 호환성을 고려해 `margin-block-start`, `margin-inline-start` 등의 속성이 있는 것이다.

한글에서의 `inline`은 `좌 -> 우` 이기 때문에 `inline-start => 좌`, `inline-end => 우`를 의미한다. 또한 `block`은 `상 -> 하` 이므로 `block-start => 상`,  `block-end => 하`를 의미하게 된다.

이러한 속성들을 logical properties 라고 하는데 [MDN - logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)에서 볼 수 있다.

## Border vs Outline

outline은 border와 비슷하지만 layout에 영향을 미치지 않는다.

https://codepen.io/sundicide/pen/YzYNORO

위의 codepen 예시를 살펴보면 파란색 테두리인 Border와 빨간색 테두리인 Outline의 크기가 다른 것을 알 수 있다. 개발자 도구로 보면 좀 더 명확하게 차이를 구별할 수 있는데 이것이 바로 layout에 영향을 미치냐 안미치느냐의 차이이다.

다만 outline 사용에 주의해야 할 점은 아래와 같이 `interactive`한 element에 `outline: none`을 선언하는 것이다.

```css
button {
  outline: none;
}
```

대게 이 속성을 사용하는 이유는 focus가 갔을 때 기본으로 설정된 파란색 테두리를 없애기 위함인데, focus는 Accessibility에서 매우 중요한 역할을 하기 때문에 이를 없애면 좋지 않다.

다만 아래와 같이 대안(새로운 focus style)을 사용하기 위해 outline을 없애는 것은 괜찮다.


```css
button {
  outline: none;
}
button:focus {
  background: gold;
  color: black;
}
```

## Margin

`margin`은 `padding`, `border`와 달리 음수 값 설정이 가능하다.
음수 값을 이용하면 element가 겹쳐 보이게 할 수 있다.

https://codepen.io/sundicide/pen/eYygLav

### Auto margin

element를 가운데에 배치하고 싶을 때 Flexbox 혹은 Grid를 이용해서 설정해본 경험이 많을 것이다. 하지만 `margin: auto`로도 이를 해결할 수 있다.

https://codepen.io/sundicide/pen/yLpgxmV

위의 예제를 보면 `Hello Block`은 가운데로 위치했음을 알 수 있다.그 이유는 `margin: auto`는 `width: 100%`와 비슷하게 가능한 영역을 전부 차지하려고 하기 때문이다. 그리고 좌/우 양쪽에 이를 추가했기 때문에 남은 영역이 균등하게 분배되어 가운데 정렬이 일어나는 것이다.

다만 `vertical`에서는 가운데 정렬이 일어나지 않음에 유의해야 한다. `height`는 `width`와 달리 가능한한 작게 유지하려 하기 때문에 `margin: auto`를 적용해도 영역을 차지하지 않기 때문이다.

반면 `Hello Inline`은 그대로 왼쪽에 있음을 알 수 있는데, inline element는 block element와 달리 확장 가능한 빈 영역이 없기 때문이다.

## Magic Space of Replaced elements

Replaced elements([MDN - replaced elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element))는 typography처럼 취급하기에 추가되는 magic space가 존재 한다.

https://codepen.io/sundicide/pen/PoEWyzY

첫 번째 그림을 살펴보면 아래쪽에 약간의 여백이 있는 것을 알 수 있다. 이는 `<image>`를 내부적으로 typography처럼 inline-element 처럼 취급하기 때문이다. 이를 없애기 위해서는 부모 태그에 `line-height: 0` 혹은 해당 `img`태그를 `display: block`으로 변경해주면 된다.

두 번째 그림을 보면 위에서 얘기했던 `line-height: 0`을 선언해 아래쪽 여백은 제거 했지만 img 사이에 여백이 생긴 것을 볼 수 있다. 이는 whitespace 때문에 생기는 문제인데, HTML은 태그간 구별을 위한 indent인지 단어 간 indent인지 구별할 수 없어서 생기는 문제이다. 이를 해결하기 위해서는 `img`태그 간 space를 삭제하면 된다.

## Inline-block은 line-wrap 되지 않는다.

https://codepen.io/sundicide/pen/KKZarPQ

위의 예시를 보면 `inline-block 입니다` 요소는 새로운 라인에 그려진 반면 `inline-block`은 2개의 라인에 걸쳐서 그려진 것을 볼 수 있다.

이는 `inline-block`이 `line-wrap`을 허용하지 않는 다는 것을 의미한다. 그렇기 때문에 미적인 효과를 위해 paragraph내에서 `inline-block`을 선언해야 한다면(예. 문단 내 특정 텍스트에 효과) 조심해서 사용해야 한다.

## Height 100vh vs 100%

App의  높이를  화면에  꽉  채우기  위해 `height: 100vh;`를 써본 경험이 있을 것이다. 그렇다면 왜 `height: 100%;`는 안될까?

그 이유는 width와 달리 `height`는 가능한 작은 영역을 차지하려 하기 때문이다.

```html
<html>
  <body>
    <div style="height: 100%">
    </div>
  </body>
</html>
```

위와 같은 구조에서 `div`에 height: 100%를 선언해봐야 `body`와`html`에 정의된 height 값이 없기 때문에 높이를 얼마나 차지해야 할지 알 수 없는 것이다.

이를 해결하기 위해서는 `html`과 `body`에 각각 `height: 100%;`를 추가해주면 된다. html의 부모는 viewport가 되기에 viewport 사이즈를 받아올 수 있는 구조이다.

`100vh`역시 viewport의 100%를 차지한다는 의미로 동일하지만 모바일에서는 조금 다르게 동작한다. 모바일에서는 스크롤 시 위쪽의 주소바와 아래쪽 버튼바가 사라지게 되는데, `100vh` 는 이렇게 위,아래 아무것도 없을 때의 크기를 산정하게 되고 그 결과 페이지를 처음으로 보게 되면 위, 아래 영역이 각각 주소바와 버튼바가 차지하고 있는 상태이기 때문에 화면이 잘려 보이게 되는 것이다.

이에 대한 예시는 아래에 있는 저자의 예시 링크에서 확인할 수 있다.

**참고자료**

- [https://courses.joshwcomeau.com/demos/full-height-vh](https://courses.joshwcomeau.com/demos/full-height-vh)
- [https://courses.joshwcomeau.com/demos/full-height-percentage](https://courses.joshwcomeau.com/demos/full-height-percentage)

## Margin Collapse

margin collapse에 대해 들어본 적이 있는가?

margin collapse란 말 그대로 margin이 겹치는 경우를 얘기한다.

https://codepen.io/sundicide/pen/XWVMMMX

위의 예시를 보면 `<p>`의 기본 padding과 margin 값을 0으로 초기화 시킨다음에 첫 번째 `<p>`에는 `margin-bottom: 10px;` 두 번째에는 `margin-top: 10px;`을 선언했다. 하지만 두 element 사이의 영역은 `10px`만 차이가나는 상황인 것이다. 왜 그럴까?

margin collapse가 일어났기 때문이다. margin collapse가 생기는 원인으로 저자는 *"CSS 초기에는 margin이 layout을 위해 고안되지 않았기 때문이다."* 라고 설명하고 있다.

이번엔 다른 예시를 보자.

https://codepen.io/sundicide/pen/ExoWWXy

이번엔 첫 번째 element의 `우측`과 두 번째 element의 `좌측`에 각각 margin을 추가했는데 이번엔 margin collapse가 일어나지 않았다.(두 element 사이의 거리가 20px이다.)

margin-collapse가 일어나기 위한 조건들이 있는데 이 중 하나가 위에서 봤듯이 `상/하` 정확히 말하자면 `bolck-start/block-end`에서만 일어난다. 또한 margin collapse는 `Flow layout`에서만 발생하기 때문에 다른 layout을 쓰는 경우라면 이에 대해 걱정하지 않아도 된다.

margin-collapse를 이해했다면 아래의 예시에서 왜 `p`에 `margin`을 추가 했는데 **색깔이 칠해지는 영역이 margin을 포함해서 20px + line-height 값이 아닌지** 이해가 될 것이다.

https://codepen.io/sundicide/pen/LYeWWej

마지막으로 저자는 `margin`이 위험하기에 `margin`을 사용하지 말고 가능한한 `padding` 혹은 Design System의 `stack` 같은 컴포넌트를 활용하는 것이 좋다고 얘기하고 있다.

margin collapse에 대한 더 자세한 사항은 아래의 MDN링크를 참고하길 바란다.

**참고 자료**

- [MDN - Margin Collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
- [max stoiber - margin considered harmful](https://mxstbr.com/thoughts/margin/)