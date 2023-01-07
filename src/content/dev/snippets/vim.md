---
title: "Vim"
date: "2021-08-06"
draft: false
path: "/blog/snippets/vim/"
---

# Find

## char & current line

```
  f -> forward

  e.g.
    fe, f)

  F -> backward

  ; -> 마지막 검색 명령을 정방향으로 반복
  , -> 마지막 검색 명령을 역방향으로 반복
```

## word & entire page

find next or prev word positioned at cursor

```
  # -> find next

  * -> find prev
```

# Macro
변수를 생성할 수 있다.

```
:let i=0
:echo i
< 0


:let i += 1
:echo i
< 1
```

이를 이용하면 숫자 목록을 만들 수 있다.

먼저 첫 줄에 `1)`을 삽입하고 이를 매크로로 만든다.
```bash
:let i=1
qa
I<C-r>=i<CR>) <Esc> # 1) My Sentence
:let i += 1
q
```

아래 스크립트를 이용해 나머지 행에 적용한다.
```bash
jVG
:'<,'>normal @a
```

## 매크로 확인하기

```bash
:put a
# "ap 명령으로도 붙일 수 있는데 put을 쓴 이유는 뭘까?
# put 명령은 항상 현재 행 아래에 붙여넣기 때문이다.
```

## 매크로 수정하기
만약 a 레지스터에 있는 매크로를 수정하고 싶다면
기존 매크로를 `:put a` 명령어로 붙여넣기 한 뒤
내용을 수정하고
`"ay$` 같이 해당 레지스터에 새로운 매크로를 넣는다.

# 삭제

> From Practical Vim

|키 입력|선택 범위|키 입력|선택 범위|
|---|---|---|---|
| iw | 단어(word) | aw | 단어(word)와 공백
|iW|Word|aw|단어(WORD)와 공백
|is|문장|aw|문장과 공백
|ip|문단|aw|문단과 빈행

# 마커

> From Practical Vim

|키 입력|버퍼 내용|
|---|---|
|``|현재 파일에서 마지막으로 이동하기 전 위치|
|`.|마지막 변경 위치|
|`^|마지막 삽입 위치|
|`[|마지막 변경 또는 복사의 시작 위치|
|`]|마지막 변경 또는 복사의 끝 위치|
|`<|마지막 선택 영역의 시작 위치|
|`>|마지막 선택 영역의 끝 위치|