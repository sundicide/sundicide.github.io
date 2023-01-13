---
title: "Module 09 - CSS Little Big Details"
date: "2022-03-26"
draft: false
path: "/blog/study/css-for-js/module-09-css-little-big-details/"
---

## CSS Filters
SVG Filter를 CSS에서 사용할 수 있도록 해주는 속성.

SVG의 강력한 점은 많은 filter API를 갖는다는 점인데 CSS도 여러 filter를 제공한다. 자세한 예는 [MDN-Filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) 에서 확인 가능하다.

Filter를 하나씩도 적용할 수 있지만 아래와 같이 여러 개를 한 번에 적용할 수도 있다.

```css
filter: drop-shadow(16px 16px 20px red) invert(75%);
```

### blur
Blur는 Gaussian Filter를 적용해 주는데 H/W가속을 사용하더라도 비싼 계산이므로 low end device에서 선 테스트 후 적용하기를 바란다.

아래의 예는 wrapper에 overflow를 사용/미사용에 따른 차이를 보여준다.

https://codepen.io/sundicide/pen/YzEJoaV

### Backdrop Filter
이 filter는 요소 뒤쪽에 filter를 추가해주는데 [MDN - backdrop filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)에서 확인 가능하다.

## Gradients

CSS에서 지원하는 Gradients는 여러 종류가 있다. [MDN - Gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient)

이 중에서 몇 가지만 알아 보자

### Linear Gradients
선형 그라데이션을 만드는 함수이다.
[MDN - linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient())

MDN 문서에 자세하게 나와 있어서 더 이상 설명할 것은 없는 것 같기에 정리만 좀 해보자.

linear-gradients는 기본적으로 위에서 아래로 그려진다.
그려지는 방향을 수정할 수 있는데 `turn`, `deg`, `cardinal directions` 유닛을 지원한다.

또한 색깔을 넣는 대로 gradients를 만들어 주는데 균등하게 그려준다.

https://codepen.io/sundicide/pen/vYWwmKx

위의 예시를 보면 색깔을 3개를 추가했기에 0은 red, 50은 white, 100은 blue로 잡은 뒤 gradients를 적용하는 것이다.

각 위치들(25, 50, 100)을 `linear-color-stop`이라고 하는데 이 역시 변경 가능하다.
아래의 예시는 color-stop을 변경한 예시이다.

```css
background: linear-gradient(red 0%, orange 10% 30%, yellow 50% 70%, green 90% 100%);
```

마지막으로 `color-hint`가 있다. gradients 색깔 사이에는 `midpoint`가 존재하는데 이를 변경하는 것이다.

https://codepen.io/sundicide/pen/PoOvmRe

위의 예시를 보면 `Default` 박스는 color-hint를 설정하지 않아서 midpoint가 중앙에 위치하는 반면 아래의 `Color Hint Changed` 박스는 midpoint를 변경했기 때문에 해당 위치(20%)를 기준으로 gradients를 그리는 것을 알 수 있다.

그렇다면 아래의 코드를 보고 어떻게 그려질지를 예상 할 수 있겠는가?
```css
background: linear-gradient(to right, red, 20%, blue); /* 1 */
background: linear-gradient(to right, red 0% 20%, blue); /* 2 */
```
위 코드의 결과를 바로 예상할 수 있다면 `color-stop`과 `color-hint`에 대해서는 다 배운 것이라 생각한다.

### Radial Gradients
한 점에서 바깥쪽으로 퍼져나가는 형태이다. [MDN 문서 - radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient())를 보면 알겠지만 원으로 그려진다는 것을 제외하면 linear-gradients와 달라보이지 않는다.

하지만 차이점이 존재하는데 optional parameter로 `position`을 지정할 수 있다는 것이다.

https://codepen.io/sundicide/pen/XWzwgWj

```css
background: radial-gradient(50% 100%, gold, grey);
```

위의 예시를 보면 gradients가 중앙에서 부터 시작한다는 것을 알 수 있는데 코드에서 첫 번째 parameter에 50%(수평에서의 위치) 100%(수직계에서의 위치)를 지정해줬기 때문이다.

이를 이용하면 sunset 효과를 만들어낼 수 있다.
[https://codepen.io/msaetre/pen/JjqPby](https://codepen.io/msaetre/pen/JjqPby)


### Conic Gradients

[MDN - Conic Gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient())

다른 gradients에 비해 비교적 최근에 추가된 gradients여서 IE를 제외한 모든 Major browser에서 지원한다.
쉽게 생각하자면 lienear gradients를 원형으로 만든 것이다.

Conic Gradients의 예시를 보면 시작과 끝 색깔의 경계가 명확한 것을 볼 수 있는데 이 부분에는 gradients가 적용되지 않기 때문이다. 이를 해결하기 위해서는 시작 색깔과 끝 색깔을 동일하게 주면 된다.

또한 color stop을 이용하면 pie chart 모양을 만들 수 있다.

https://codepen.io/sundicide/pen/yLpyNvX

linear에서는 angle을 받고 radial은 position을 받는데 conic은 둘 다 받는다.
이를 이용하면 아래와 같은 효과도 가능하다.

https://codepen.io/sundicide/pen/qBpEdxQ

위의 그림과 아래 그림의 차이를 알겠는가?
위에서 angle과 position만 변경한 것인데 전혀 다른 효과처럼 보인다.

원리의 첫 번째는 `angle`을 90도를 돌림으로써 빨간색 영역이 0 deg -> 90deg 부터 시작하게 되고 파란색 영역은 270deg -> 360(= 0deg)에서 시작하게 되는 것이다.
그리고 두 번째로는 `position`을 50% 100%로 지정함으로써 아래쪽에 위치한 gradients들 *(0deg ~ 90deg ~ 180deg)*는 안보이고 위쪽 영역*(180deg ~ 270deg ~ 0deg)*만 보이도록 한 것이다.

### Easing Gradients
gradients를 바로 쓰는 것은 가끔 부자연스러워 보인다.

그래서 animation에서의 timing function 처럼 easing 효과를 적용할 수 있다.

이와 관련한 것들은 [https://larsenwork.com/easing-gradients/#editor](https://larsenwork.com/easing-gradients/#editor)에서 자세하게 볼 수 있다.

하지만 이 기능은 아직 CSS에서 사용할 수 없기에 아래와 같이 써야 한다.

```css
.forNow {
  background-image: linear-gradient(
    to bottom,
    hsl(330, 100%, 45.1%) 0%,
    hsl(331, 89.25%, 47.36%) 8.1%,
    hsl(330.53, 79.69%, 48.96%) 15.5%,
    hsl(328.56, 70.89%, 49.96%) 22.5%,
    hsl(324.94, 63.52%, 50.4%) 29%,
    hsl(319.21, 54.99%, 50.3%) 35.3%,
    hsl(310.39, 46.14%, 49.68%) 41.2%,
    hsl(296.53, 39.12%, 49.7%) 47.1%,
    hsl(280.63, 42.91%, 53.43%) 52.9%,
    hsl(265.14, 47.59%, 56.84%) 58.8%,
    hsl(250.13, 52.52%, 59.88%) 64.7%,
    hsl(235.88, 59.2%, 60.91%) 71%,
    hsl(225.81, 68.23%, 57.85%) 77.5%,
    hsl(218.93, 74.97%, 54.21%) 84.5%,
    hsl(213.89, 79.63%, 49.97%) 91.9%,
    hsl(210, 100%, 45.1%) 100%
  );
};
```

### Gradients Dead Zones

Gradients를 사용하면 midpoint를 자동으로 계산해준다.

예를 들어 `rgb(200, 0, 0)` 과 `rgb(0, 200, 0)`을 각각 시작과 끝으로 Gradients를 적용하면 어떻게 될까?

브라우저가 자동적으로 `rgb(100, 100, 0)`을 중간 값으로 잡을 것이다. 이 색깔은 어두워서 회색처럼 보이는데 이를 `Gradients Dead Zone` 이라고 한다.

https://codepen.io/sundicide/pen/wvpazJX

위 예시에서 `Defaults` 항목은 위에서 얘기한 대로 시작과 끝 색상을 지정한 후 이외의 설정을 하지 않은 것이고 아래의 `revised`는 midpoint를 지정한 것이다.

이렇게 Dead Zone을 없애기 위해서는 midpoint가 필요하다.

하지만 매번 이를 설정하기 힘드니 이전에 소개했었던 툴을 사용해 Gradients를 만드는 것이 쉬운 방법이다.

---
> 컨텐츠 추가 중