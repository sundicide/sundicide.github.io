---
title: "JSConf 22 - Typed Javascript"
date: "2022-07-21"
draft: false
path: "/blog/dev/jsconf22-typed-javascript/"
---

## URL
[https://www.youtube.com/watch?v=SdV9Xy0E4CM](https://www.youtube.com/watch?v=SdV9Xy0E4CM)

## Contents

- 3 Biggest JS Trends
  1. Modern UI Framework: Angular, React, Vue, ....
  2. JS Tooling: transpilers, bundlers, linters, ...
  3. TypeScript
- 22년 3월 TC 39에 Type System이 proposal 됐다.
  - [https://github.com/tc39/proposal-type-annotations](https://github.com/tc39/proposal-type-annotations)
  - TC39란 ECMAScript(=JavaScript) 를 general, cross platform, vendor neutral 하게 표준화를 담당하는 위원회
  - [https://tc39.es/](https://tc39.es/)
  - proposal 된 아이템들은 여러 stage를 거쳐 최종 accept 된다.
    - Stage 0: Proposal
    - Stage 1: Considerable Accept
    - Stage 2: Spec Definition
    - Stage 3: Implimentation
    - Stage 4: Accept
- 왜 Type을 제안 했을까?
  - JS Community에서는 이미 이를 활발히 사용 중이다.
    - Github PR 작성 수, stateofjs.com 에서 진행한 2020 survey에서 이를 볼 수 있다.
- JS에서의 type은 comment처럼 취급될 것이다. 그리고 IDE(VSCode, WebStorm 등)에서 이를 체크하도록 할 것이다.
- 반대의견이 있을 수 있다.
  - 비기너에게 어렵다
    - 이미 많은 프로그래밍 언어에서 Type을 사용하고 있다. 문제 될 것 없다.
  - Payload가 증가할 것이다.
    - Comment, WhiteSpace들도 그렇다면 문제가 될 수 있다.
    - production build 시 이를 제거할 수 있기 때문에 문제될 것 없다.
- 우린 이미 TS가 있다. 근데 왜 JS에 이 기능을 넣으려고 할까?
  - 우린 Tooling에 중독 되고 있다. TS를 이용하기 위해 많은 tooling 작업이 필요하다.
  - JS에서 이를 지원하면 이러한 Tooling들을 안할 수 있다.
  - 또한 TS는 결국 JS로 실행된다. 하지만 JS는 항상 JS로 실행된다.
- TS는 수 많은 라이브러리들을 대응하려다보니 복잡해졌다. JS에서의 Proposal은 TS 의 모든 것 혹은 Flow의 모든 것을 포함하진 않지만 호환 가능한 정도일 것이다. 하지만 아직 stage 1 단계 정도이니 많은 부분이 변경될 수 있다.
- 이번 Proposal이 Accept되면 TS 혹은 Flow는 더 이상 사용하지 않아도 될 것이다.
- 물론 한 번에 다 끝나는 것은 아니고 안정화 까지 많은 시간이 필요할 것이다.
