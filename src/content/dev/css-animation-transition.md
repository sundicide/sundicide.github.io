---
title: "Module 08 - CSS Animation"
date: "2022-02-22"
draft: false
path: "/blog/css-animation-transition/"
---

## 0. Preface
본 내용은 [https://css-for-js.dev/](https://css-for-js.dev/)에서 배운 내용을 개인적으로 정리한 것입니다.

기본적인 내용은 제외하고 강의를 들으면서 공유하고 싶었던 부분만 담으려 합니다.
그러므로 Animation에 대해 익숙하지 않으신분들은 내용에 이해가 어려울 수 도 있다는 점 미리 알려 드립니다.

---

## 1. Animation vs Transition
CSS에서 Animation을 사용하는 방법은 2가지가 있다.

1. Transition
2. Animation

<br />
비슷한 듯 하지만 animation은 transition이 할 수 없는 것을 할 수 있다.

1. Loop
2. Multi-Step
3. Pause
4. Page load / Page mount 시 즉시 동작

차례대로 예시를 보자.

### 1-1. Loop Animation

Loop Animation이란 동일한 animation을 `반복`하는 것이다.
아래의 예시는 애니메이션을 무한 반복 시킨 코드이다.

https://codepen.io/sundicide/pen/MWOrMqP

<br />

### 1-2. Multi-Step Animation

Multi-Step Animation이란 아래의 예와 같이 `여러 step`을 두어 animation을 실행하는 것이다.
아래의 예시는 0%, 50%, 100% 3단계의 step으로 구성했다.

https://codepen.io/sundicide/pen/YzEYoBW

<br />

### 1-3. Pause
animation을 `pause` 혹은 `resume`하는 것도 Animation으로만 가능하다.
동적으로 animation 상태를 변경하기 위해 JS를 활용해야 한다.

https://codepen.io/sundicide/pen/abVEeZO

<br />

### 1-4. Page Loads / Components mounts 시 즉시 동작
아래와 같이 없던 element가 `새로 생긴다`던가 `처음 페이지가 로드 됐을 시` 애니메이션을 적용해야할 경우 animation을 써야 한다.
실제로는 Modal에서 쓰일 수 있다.

https://codepen.io/sundicide/pen/ZEavgeg

이외에 경우에는 transition을 써도 무방하다.

## 2. Transition

대부분의 CSS 속성에 애니메이션을 추가해주는 역할을 한다. <br />
여기에서 `대부분`이라고 한 이유는 모든 속성에 애니메이션을 추가할 수는 없기 때문이다. 지원하는 리스트는 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)에서 확인 가능하다.

transition이 많이 쓰이는 곳은 어디일까?
개인적으로는 `hover`시 동작하는 애니메이션들이라 생각한다.

https://codepen.io/sundicide/pen/QWOaeZR

transition에서 지정할 수 있는 속성들에 대한 자세한 내용은 MDN에서 확인할 수 있다. [출처: MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)

다만 여기에서 주의해야할 점은 `all` 사용에 주의해야 한다는 것이다.

많은 모션을 추가할 수록 그만큼 브라우저에 부담을 가하는 것이며 원치 않는 요소에도 모션이 들어갈 수 있기 때문에 `원하는 요소`에만 애니메이션을 transition을 추가할 것을 권한다.

## 3. Animation

animation 역시 transition과 비슷하다.(둘에 대한 차이는 위에 있다.)

이 역시 자세한 설명은 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)에서 확인 할 것을 권한다.

이 속성에 대해 얘기하고 싶은 점은 `direction`과 `fill-mode`이다.
(play-state와 iteration-count는 차이 비교에서 설명했으니 건너뛴다.)

### 3-1. Direction
[MDN - animation-duration](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)을 살펴보면 `normal`, `reverse`, `alternate`, `alternate-reverse` 값이 있다.

normal과 reverse는 예상되는 바인데, alternate와 alternate-reverse는 뭘까? 나름 쉽게 정리를 해보자면 다음과 같다.

> normal => 순방향 으로 간다.(0% -> 100%) <br/>
reverse => 역방향으로 간다.(100% -> 0%) <br/>
alternate => 순방향 으로 갔다가 역방향으로 간다(0% -> 100% -> 0%) <br/>
alternate-reverse => 역방향 으로 갔다가 순방향으로 간다(100% -> 0% -> 100%)

중요한 점은 여기서 끝이 아니다.<br/>
<br/>
alternate류는 순환을 하기 때문에 normal/reverse 보다 `animation-duration`을 **절반 값** 으로 설정해야 한다는 것이다.<br/>
<br/>
예를 들어 4초 동안 앞으로 갔다 뒤로 갔다 순환을 하기 위해 `animation-direction` 값을 `alternate`로 설정했다면 `animation-duration: 2s`로 설정해야 한다는 것이다.(순방향 2초 + 역방향 2초 = 총 4초)

https://codepen.io/sundicide/pen/yLPvBYe


### 3-2. Fill Mode

[MDN - animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)

이번엔 MDN예시로 먼저 설명을 하겠다.

예시에는 `none`, `forwards`, `backwards`, `both` 총 4개에 대한 예시가 나와있다.<br/>
<br/>
봤을 때 조금씩은 다른거 같은데 어떤 차이가 있는지 설명하기 어려울 수 있다.
이에 대한 설명을 해보자면

1. `none`은 `애니메이션 시작 전의 초기상태로 돌려 놓는다.` 라고 할 수 있다.<br />
    MDN의 예시에서 원이 왼쪽에서 오른쪽으로 움직이는 애니메이션이 동작한다. 시작은 왼쪽, 종료는 오른쪽이기에 animation이 끝난 뒤에는 다시 이 원의 위치를 왼쪽으로 돌려 놓게 되는 것이다.

2. `forwards`는 `애니메이션의 종료 상태로 계속 유지한다.` 라고 할 수 있다.<br />
    MDN 예시에서 animation이 끝난뒤에 계속 종료상태(오른쪽으로 이동한 상태)를 유지해 계속해서 오른쪽에 남아 있는 것이다.

3. `backwards`는 `애니메이션 시작 할 때부터 전의 상태를 유지한다` 라고 할 수 있다. <br />
    MDN 예시에서는 차이를 찾기 힘들기 때문에 아래 예시를 첨부한다.<br/>
    run 버튼을 눌렀을 때 **default 박스**는 애니메이션이 시작될 때에 사라졌다가 다시 나타나지만, **backwards 박스**는 애니메이션이 시작되기 전에(animation-delay 중일 때) 먼저 from 상태가 적용되고 있음을 알 수 있다.

    https://codepen.io/sundicide/pen/bGYLjVp

4. `both`는 forwards와 backwards를 둘 다 적용하는 것을 의미한다.

## 4. Performance

Animation에서의 Performance는 중요하다. <br/>

그렇다면 **좋은 Animation Performance**란 무엇일까?
> target device / browser에서 부드럽게 동작하는 animation이다.

&nbsp;고성능의 device및 browser를 타겟한다면 보다 여유롭게 animation을 쓸 수 있을 것이고 반대로 저성능의 device및 browser 사용까지 고려한다면 엄격하게 animation을 사용해야 할 것이다. <br/>

&nbsp;여기에선 Animation Performance를 2가지 측면에서 알아볼 것이다.
1. CSS property
2. H/W Acceleration

### 4-1. CSS 속성
애니메이션 성능에 유리한 CSS 속성은 무엇이 있을까?

이를 위해서는 먼저 Browser가 화면 내 pixel을 업데이트 하는 프로세스부터 살펴봐야 한다.

1. Recalculating style: 어느 element에 어떤 CSS를 적용해야 하는지를 찾는다.
2. Layout: 해당 element가 page내 얼만큼의 공간을 차지하고 어디에 배치되는지 계산한다.
3. Paint: 모든 픽셀이 어떤 색상으로 표현되어야 하는지를 알아내고, 이를 채운다.
4. Compositing: 이전에 paint된 element들을 순서에 맞게 그린다.

각 내용에 대한 자세한 설명은 [developers.google.com](https://developers.google.com/web/fundamentals/performance/rendering) 에서 확인 가능하다. MDN에서도 해당 내용을 확인할 수 있다. [MDN - CSS Property Cost](https://developer.mozilla.org/en-US/docs/Tools/Performance/Scenarios/Animating_CSS_properties#css_property_cost)

&nbsp;매 애니메이션 프레임 마다 위의 4 스텝을 전부 실행할 필요는 없다. <br/>
layout을 변경하면 `1~4 모든 스텝`이 실행되고 배경 이미지, 텍스트 색상등의 paint관련된 속성을 변경하면 `1,3,4 스텝`이 실행된다. 마지막으로 layout과 paint를 변경하지 않는 속성을 변경하면 `1,4 스텝`만 실행된다.

1,4만 변경하는 프로세스가 가장 빠르게 동작하는데 이렇게 실행되는 CSS 속성은 `transform`과 `opacity` 이다. (크롬에서는 `filter` 속성도 추가적으로 지원한다.)

그렇다면 animation에서 위에서 언급한 3개의 속성만 사용해야 할까?<br/>
&rArr; 아니다.
- 예를 들어 layout의 계산이 필요한 height 속성을 변경하더라도 absolute-positioned element라면 다른 element의 layout 에 영향을 미치지 않으므로 빠른 성능을 보여준다.<br/>
- 그러므로 target device및 browser에서 만족할 만한 성능이 나오는지를 확인하고 애니메이션을 추가하는 것이 좋다.

### 4-2. 하드웨어 가속

GPU는 CPU보다 texture based animation에 좋은 성능을 보인다.<br/>
그렇기에 CPU는 animation을 최적화 하기 위해 GPU에게 이를 맡기는데 이를 `Hardware Acceleration` 이라고 한다.<br/>
CPU와 GPU간 전환하는 과정에서 미세한 오류를 볼 수 있는데 [Joshwcomeau Blog](https://www.joshwcomeau.com/animation/css-transitions/#hardware-acceleration)에서 확인 가능하다.<br/>
이를 해결하기 위해서는 `will-change`속성을 사용하면 된다.

```css
.btn {
  will-change: transform;
}
```

`will-change` 속성은 browser에게 어떤 element를 animate할 것이라고 알려주게 되며, browser는 이를 GPU에게 위임함으로서 GPU와 CPU간 전환이 발생하지 않는다. 또한 `will-change` 속성을 사용함으로써 개발자들에게도 특정 대상이 하드웨어 가속 될 것이라고 알려주는 역할도 한다.

H/W 가속 역시나 항상 옳지만은 않다.
GPU memory가 충반하지 않은 device에서의 H/W가속은 device에 부담을 주게 될 것이다.
그렇기 때문에 모든 animation에 `will-change` 속성을 추가 하기보다 필요한 곳에만 사용하길 권한다.

**참고 자료**

- https://developer.chrome.com/blog/hardware-accelerated-animations/

## 5. Orchestration

애니메이션을 동시에 적용하는 것보다 일정한 간격을 갖는 것이 보다 더 자연스럽다.
예를 들면 Modal을 띄울 때 Backdrop과 Dialog가 같이 뜨는 것보다는 Backdrop이 먼저 나타나고 조금 뒤 Dialog가 떠오르는 것처럼 말이다.

이를 Orchestration이라고 부른다.
[Apple 홈페이지](https://www.apple.com/)에서도 이를 확인할 수 있는데 검색 버튼을 누르면 아래와 같은 과정이 일정한 간격을 두고 일어난다.
1. 메뉴 아이템들이 사라진다.
2. Backdrop이 생긴다.
3. 하얀색의 자동 완성 영역이 나타난다.

이런 과정을 CSS로만 구현하려면 복잡할 수 있는데 `React Spring` 혹은 `GSAP`같은 외부 라이브러리를 쓰면 보다 쉽게 구현할 수 있다.

## 6. Accessibility

Animation은 모든 사용자에게 동일하게 적용되지 않는다.
특히나 복잡한 애니메이션에 어지러움과 고통을 느끼는 사람들이 있는데 이런 증상을 `Vestibular disorders`라고 부른다.

최근들어 OS는 이런 사용자들을 위한 옵션을 제공하는데 Mac의 경우 `Reduce Motion(동작 줄이기)`를 제공한다.
이 옵션을 체크하면 시스템 전반적으로 애니메이션이 줄어들게 된다.

그렇기 때문에 App 개발자들도 이를 존중해야 한다. 즉, 이 옵션을 체크하는 유저를 고려해야 한다는 것이다.

이 설정을 위한 media query가 존재하는데 `prefers-reduce-motion`이다. [MDN - Prefers Reduce Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

```css
.box {
  transform: rotate(45deg);
  transition: transform 500ms;
}
@media (prefers-reduce-motion: reduce) {
  .box {
    transition: none;
  }
}
```

기본 값은 `no-preference`이고 reduce motion을 체크한 사용자들은 해당 값이 `reduce`로 오게 된다.

만약 오래된 OS 혹은 Browser에서 이 미디어 쿼리를 보게 되면 어떻게 될까? <br />
&rArr; 정답은 `알 수 없는 속성이므로 건너 뛴다` 이다.

그렇기 때문에 해당 속성을 추가할 때 주의해야 한다.
1. default: 일반 애니메이션 / media queries: 모션 감소 애니메이션
2. default: 모션 감소 애니메이션 / media queries: 일반 애니메이션

1의 경우에는 `Vestibular disorder`를 겪는 사용자가 오래된 OS 혹은 Browser를 사용할 경우 일반 애니메이션을 보여주게 되어 App을 이용하기 힘들게 할 것이다. **그렇기 때문에 2번의 방법을 따르는 것이 더욱 좋다.**

또한 Javascript에서는 아래와 같이 media query 값을 얻어올 수 있다.

```javascript
function getPrefersReducedMotion() {
  const mediaQueryList = window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  );
  const prefersReducedMotion = !mediaQueryList.matches;
  return prefersReducedMotion;
}
```

이를 이용하면 사용자가 reduce motion을 체크하는 즉시 반응해서 motion을 줄이는 등 dynamic한 변화를 줄 수 있다.

저자가 `Vestibular disorders`를 겪는 사람들을 만나서 인터뷰해본 결과 그들이 겪는 어려움은 대체로 모션이 많이 생겼을 때 일어났다. 예를 들면 element가 급격하게 움직이거나 page 전처에 일어나는 transition 등이 있다. 그 외의 애니메이션(색깔 변경, 작은 px 움직임 등)에 대해서는 괜찮아 보였다.

아래의 예시는 이를 고려한 `help icon`이다. 일반 유저에게는 일반 애니메이션(px의 움직임이 많은 motion)을 보여주고 reduce motion을 체크한 사용자에게는 보다 부담이 덜한 애니메이션을 표현하도록 했다.

https://codepen.io/sundicide/pen/wvPjYjQ


> Accessibility관점에서 animation은 보수적으로, 너무 많은 애니메이션 보다는 목적과 이유가 있는 애니메이션을 추가하길 권한다.

## 7. Ends

이로써 CSS 강의 중 첫 번째로 Animation에 대해 정리해봤다.

강의의 순서대로라면 후반부에 위치하는 부분이지만 개인적으로 관심이 많은 부분이기도 했고 배운것 들도 많아 첫 번째로 애니메이션을 선택 했다.

이 글을 보는 이들에게도 많은 도움이 되길 바란다.