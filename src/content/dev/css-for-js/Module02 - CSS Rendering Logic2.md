---
title: "Module 02 - CSS Rendering Logic 2"
date: "2022-03-28"
draft: false
path: "/blog/study/css-for-js/module-02-css-rendering-logic-2/"
---

## Centering Trick

특정한 조건내에서 horizontal, vertical centering을 할 수 있다.

1. Absolute position
2. 각 방향 별 equl distance
3. 지정된 사이즈
4. margin: auto

https://codepen.io/sundicide/pen/xxpdpQR

## Stacking Context

z-index를 사용할 때 유의해야할 것으로 `stacking context`라는 개념이 있다. 그 전에 z-index에 대한 기본 logic을 살펴보자.

Flow Layout에서는 기본적으로 DOM Order대로 그려진다.
여기에 Positioned Layout 속성을 갖는 element가 생긴다면 이는 항상 non-positioned element보다 위에 그려지게 된다.
그리고 만약 positioned layout을 갖는 element가 여러 개 있다면 이들 사이에서의 z-index 순위는 DOM order를 따른다.
마지막으로 이들 사이의 z-index를 설정할 수 있도록 하는 값이 `z-index` 속성이다.

그리고 z-index는 `같은 stacking context`내에서 동작하는데 그 말은 `상이한 stacking context`내에서는 `z-index`의 차이가 소용 없다는 뜻이다.

[MDN - stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)내에서 예시를 보면 알 수 있다.


### isolation

isolation은 new stacking context를 항상 만들어주기 때문에 요긴하게 쓸 수 있다.
예를 들어 공통 컴포넌트를 만들려고 할 때 항상 부모 컴포넌트에 `z-index` 값을 지정하는 것이 문제가 됐었다. (z-index를 )
하지만 이 속성을 이용해 stacking-context를 만들면 부모 컴포넌트에서는 별도의 z-index 없이 stacking context를 만들 수 있는 것이다.


## Fixed Positioning

fixed positioning은 absolute와 비슷한데 다른 점이 containing block에 상관 없이 'viewport'에만 contained된다는 점이다. 여기에서 viewport란 화면에서 보이는 영역을 얘기하는데 보통 주소 바와 탭 바 등을 포함하ㅡㄴ window와는 약간 다르다. 이를 주로 사용하는 곳은 scroll을 해도 계속 보이게 하는 `Icon` 혹은 `Header`, `Modal`등이다.

```html
<style>
  .help-btn {
    position: fixed;
    right: 32px;
    bottom: 32px;
  }
</style>

<button class="help-btn">
  Help
</button>
```

### 예외

보통 fixed elements는 viewport에 고정되는데 단 한 가지 예외가 있다.

바로 부모 혹은 조상이 `transform` 혹은 `wil-change` 속성을 사용할 때이다. `transform` 혹은 `will-change: transform`를 사용한 부모 내 자식 중 fixed elements가 있으면 이를 absolutely-positioned element로 바꿔 버린다.

https://codepen.io/sundicide/pen/GRyxjGz


## Overflow
Overflow는 contents가 넘쳤을 때 이를 어떻게 관리할 것인지에 대한 속성이다.

주의 해야할 점 중 하나는 `overflow: scroll`을 지정 시 **Window, Linux 에서는 항상 스크롤바가 보인다는 점이다**. 그렇기 때문에 Mac OS로 개발을 하면서 overflow를 따로 설정하지 않은 개발자는 이에 유의해야 한다.

Mac OS에서도 `overflow: scroll` 시 항상 스크롤바를 보려면 스크롤 막대 보기를 `항상` 으로 변경해주면 된다.

### auto vs scroll

`overflow: auto`는 필요할 때 자동적으로 scrollbar를 만들어 준다. 그렇다면 왜 `overflow: scroll`을 써야 할까?

그 이유는 Layout Shift, 렌더링 과정에서 scroll로 인한 layout 변경을 방지하기 위함이다. 이에 대한 내용은 아래의 블로그에서 확인 가능하다.

[https://www.bram.us/2021/07/23/prevent-unwanted-layout-shifts-caused-by-scrollbars-with-the-scrollbar-gutter-css-property/](https://www.bram.us/2021/07/23/prevent-unwanted-layout-shifts-caused-by-scrollbars-with-the-scrollbar-gutter-css-property/)


### hidden

`overflow: hidden`은 넘치는 요소를 사라지게 하는 속성인데 보통은 text ellipsis(...) 혹은 미적인 효과를 위해 사용한다.

hidden 속성을 지정하면 당시에는 어떤 이유로 이 속성을 지정했는지 기억하겠지만 시간이 지나면 왜 hidden 속성을 썼는지 이해하기 힘든 경우가 많다. 그래서 저자는 `overflow: hidden`을 써야 할 때면 그 위에 코멘트로 왜 이 속성을 썼는지에 대해 명시하는 것을 선호한다.

### Scroll Container

우리가 overflow 값을 설정하게 되면 해당 elements는 `scroll container`가 되는데 이 때 scroll이 `x축과 y축 모두에 생긴다`는 것에 유념해야 한다.

https://codepen.io/sundicide/pen/xxpWENW

위의 예시를 보면 y축 넘침은 `scroll`을 설정하고 x축 넘침 `visible`을 하려고 설정 했지만 **x와 y축 모두에 scroll이 생겼음**을 볼 수 있다.

이는 scroll container 때문인데, overflow가 설정되는 순간 자식 elements들이 scroll container를 벗어나게 그려질 수 없도록 x축과 y축 모두 scroll을 만들고 자식이 `hidden` 혹은 `scroll` 될지만 선택할 수 있게 한다.

한 마디로 overflow를 설정하는 순간 해당 element에는 `hidden` 혹은 `scroll`만 선택할 수 있게 된다는 것이다.

### Positioned Child

overflow를 사용할 때 자식이 positioned 된 element라면 overflow가 동작할까?

답은 **contained 된 child만 overflow가 동작한다** 이다.

자식이 `position: absolute;`를 선언하면 부모에 overflow를 설정해도 보이게 되는데 이는 absolute 선언된 child element가 closest positioned ancestor를 containing block으로 잡기 때문이다. 이를 동작하게 하기 위해서는 부모에 `position: relative`를 선언하면 된다.

이와 같은 원리로 `position: fixed`를 선언한 element는 부모에 contained되지 않기 때문에 overflow가 적용되지 않는다.(위에서 fixed positioning - 예외에서 살펴 본 것처럼 부모가 `tranform` 혹은 `will-change: transform` 속성을 사용하게 되면 overflow가 적용된다.)

### Sticky position

sticky position은 relative와 fixed positioning이 합쳐진 것으로 생각할 수 있다. relative element 처럼 취급이 되면서(documnet에서 normal flow를 따르고 offset을 사용할 수 있다.) fixed 처럼 parent boundary에 속하기 때문이다. 주로 alphabetized list에서 heading에 이를 많이 쓰는데 아래 MDN 문서에 example이 잘 되어있어 이를 첨부한다.

[https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky_positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky_positioning)


sticky position을 사용할 때 주의해야 할 점이 있는데 그 중 하나는 overflow를 설정한 조상이 있다면 그 조상에 stick된다는 점이다. sticky position은 nearest "scrolling mechanism" ancestor(overflow를 hidden, scroll, auto, overlay로 설정한 element)에 붙게되어 sticky가 원하는대로 동작하지 않을 수 있다는 것이다.

또한 Flexbox 혹은 Grid에 의해 sticky element가 늘어났다면 sticky가 원하는 대로 동작하지 않는다.


## Hidden Content

element를 어떤 목적으로 안보이게 하는 방법은 여러 가지가 있다.

1. display: none
2. visible: hidden
3. opacity: 0

결과는 비슷하지만 다른 점이 있다.

먼저 `display: none;`의 특징은

- 차지하는 영역이 없다.
- keyboary navigation을 이용한 Focus가 불가능하다.

이다. 이는 주로 mobile 과 desktop 전환 시 다른 쪽의 header를 숨기고자 할 때 쓴다.

은 차지하는 영역을 없애 버린다.

`visibility: hidden`의 특징은 다음과 같다.

- keyboary navigation을 이용한 Focus가 가능하다.
- 부모 요소에서 `visibility: hidden`을 적용한 뒤 특정 자식 요소에서 `visibility: visible`을 설정하면 해당 요소만 보이도록 구성할 수 있다.

`opacity: 0`은 영역은 차지하지만 보이지는 않는다.

- keyboard navigation을 이용한 Focus 뿐만 아니라 click, text일 경우엔 select도 가능하다.

그렇기 이 속성은 주로 투명효과를 주기 위해 주로 사용한다.

Accessibility에서 주의를 해야 할 점은 display: none을 제외하면 Focus가 가능하기 때문에 keyboard navigation등을 이용하는 유저에게 노출되서는 안되는 요소를 노출시켜 혼란을 줄 수 있다는 점이다.

help text 같이 keyboard navigattion 등을 이용하는 유저에게는 노출이 되지만 일반 유저에겐 보이지도, focus되지도 않도록 하려면 어떻게 해야 할까? 이를 위해서 저자는 아래와 같이 `clip`속성을 사용한 숨김을 선호한다.

```css
.visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
```

반대로 미적 효과를 위해 keyboard navigation등을 이용하는 유저에게는 숨기고 일반 유저에게만 보이도록 하고 싶을 땐 `aria-hidden="true"` 속성을 사용하면 된다.

여기에서 또 주의해야 할 점이 있는데 `aria-hidden="true"`를 설정한 요소 내에 `a` 태그 같이 focusable한 element를 넣으면 안된다는 점이다. 이렇게 할 경우 aria-hidden을 설정해도 focus가 갈수 있기 때문이다.
