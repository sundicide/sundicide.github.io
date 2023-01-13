---
title: "Module 00 - CSS Fundamentals"
date: "2022-03-23"
draft: false
path: "/blog/study/css-for-js/module-09-css-little-big-details/"
---

## Media Queries
여러 device들은 각각의 size를 갖는데 이에 대응하기 위해 media queries `@media`를 쓴다.
이는 Javascript의 `if`문과 비슷한 의미이다.

```javascript
if (condition) { /** */ }
```

```css
@media (condition) { /** */ }
```

예시를 보자.

```css
.box {
  background: violet;
  width: 100%;
  height: 200px;
}
@media (max-width: 400px) {
  .box {
    background: yellowgreen;
  }
}
```

`@media` 뒤 괄호 안에는 `font-size: 16px;`같은 css declaration은 올 수 없고 `min-width` 같은 `media feature`만 올 수 있다.

## Pseudo

`pseudo`란 단어의 의미를 알아보자.

> not genuine; spurious or sham: we are talking about real journalists and not the pseudo kind.
> 한글로는 가짜의, 가상의 란 의미로 해석된다.

그렇기에 `pseudo-class` `pseudo-elements` 는 각각 가상의 클래스, 가상의 elements라고 볼 수 있다.

먼저 `pseudo-class`를 알아보자.

### Pseudo class

선택된 element에 special state를 나타내며 [MDN - Pseudo classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) 문서를 보면 전체 리스트를 볼 수 있다.

예를 들면 마우스를 element에 올렸을 때 style을 지정할 수 있는 `:focus`가 있다.

```css
button:hover {
  color: blue;
}
```

Javascript로 이를 구현하면 event를 `onMouseEnter/onMouseLeave`를 등록해야 하지만 CSS로는 한 줄로 처리 가능하다.

### Pseudo elements

`pseudo-classes`와 비슷하게 element내 specific part를 선택할 수 있게 해주는 keyword로써 [MDN - Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) 에서 확인 가능하다.

예를 들면 `::before`, `::after`가 있다.

```css
p::before {
  content: '=';
  color: deeppink;
}
```

Accessibility 관점에서 주의해야 할 점이 하나 있다. 바로 `pseudo-elements`내 `content` 속성에는 값을 넣지 않는 것이 좋다는 점이다. 예를 들어 screen-reader를 사용하는 경우 `content`에 값을 넣으면 해당 내용을 소리내어 읽어 주기 때문이다.

이와 관련해서는 [W3.org](https://www.w3.org/TR/css-content-3/#accessibility)에서 확인 가능하다

* [MDN - Pseudo-classes and pseudo-elements](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#what_is_a_pseudo-element) 에서 이 둘을 같이 다룬 내용들이 있다.

## Color

CSS에는 색상을 다양한 방식으로 표현할 수 있다.

1. keywords: red
2. HEX codes: #FF000
3. color: rgb(255, 0, 0)
4. HSL: hsl(0deg, 100%, 50%)

위의 방식 중에서 가장 직관 적인 것은 `keywords` 일 것이다. [MDN - color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)를 보면 여러 색상 값들이 존재함을 알 수 있다. 하지만 보통 디자인 시스템에서 요구하는 색깔들은 여러 색상을 정한 뒤 좀 더 밝거나 어둡게 만들어서 여러 color palette를 만들기 때문에 이런 값들만을 이용해서는 표현하기 힘들다.

그렇다면 1번 방식(keywords)을 제외하고 2,3,4 방식 중에 어떤 것을 선호하는가?

저자는 4번 HSL 방식을 선호한다. 예를 들어 `#abcdef` 라는 색상 값을 줬을 때 어떤 색상이 올지 알 수 있겠는가? 이를 RGB로 표현하면 `rgb(171, 205, 239)`가 된다. 이 역시 알기 힘들다. 그렇다면 HSL로 해보면 어떨까? `hsl(210, 68%, 80%)` 을 의미한다. 좀 더 알기 쉬워졌는가? 그렇지 않을 것이다. 이번엔 아래 예시를 봐보자.

<p class="codepen" data-height="420" data-default-tab="html,result" data-slug-hash="oNpYwBz" data-user="sundicide" style="height: 420px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sundicide/pen/oNpYwBz">
  CSS - HSL Degrees</a> by sundicide (<a href="https://codepen.io/sundicide">@sundicide</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

HSL은 위 예제에서 보듯이 앞에서부터 (hue, saturation, lightness)를 의미한다([MDN - hsl](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)).
그래서 위의 그림을 익혀둔다면 보다 쉽게 색상을 예측할 수 있을 것이다. 또한 saturation과 lightness를 *hex*, *color* 에 비해 쉽게 변경할 수 있다는 장점도 있다.

또한 hsl은 `hsl(210, 68%, 80%, 0.5)` 같이 opacity도 설정할 수 있는데 IE에서는 **hsla**로 써줘야 한다. `hsla(210, 68%, 80%, 0.5)

## Units

CSS 에는 여러 Unit이 있는데 그 중 가장 유명한 것은 `px` 일 것이다.

참고로 `em`은 현재 element의 font size를 기준으로 상대적인 값을 가지며, `rem`은 root element(즉 `html` 태그)의 font-size를 기준으로 상대적인 값을 갖는다.

그렇기 때문에 `em`을 쓰는 일은 많이 없고 `rem`을 더 많이 쓴다.

여기에서 주의해야 할 점은 `rem`의 값을 바꾸기 위해 html 내 font-size를 덮어 씌우는 일은 안된다는 점이다.

```css
html {
  font-size: 24px;
}
```

위와 같이 설정 시 사용자가 browser에서 폰트 크기를 조절 했을 때 전혀 반영되지 않을 것이다.(20px로 고정 시켜놨기 때문)

이를 해결하기 위해서는 아래와 같이 할 수 있다.

```css
html {
  font-size: 1.5em;
}
```

이로써 유저가 browser 폰트 사이즈를 키웠을 때 사이트의 전체 폰트 크기가 커질 것이다.

> "'px'은 Accessibility 관점에서 좋지 않다"
라는 말을 들어본 적이 있는가?

이에 대해 저자는 **그렇지 않다**라고 생각한다.

typography는 browser font-size에 맞춰 변하는 것이 맞다고 생각하지만, 그 외에 padding이나 margin 같은 곳에서는 font-size가 커진다고 변하면 안된다고 생각하기 때문이다.(font-size가 커질 수록 padding이 커진다고 상상해봐라)

그래서 저자는 typography를 제외한 곳에서는 `px`을 주로 사용한다.