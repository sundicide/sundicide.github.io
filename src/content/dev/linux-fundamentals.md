---
title: "Oreilly - Linux Fundamentals"
date: "2022-03-15"
draft: false
path: "/blog/dev/oreilly-linux-fundamentals/"
---

## Basics

`CTRL + L` => Clean terminal

```bash
whoami # 로그인 정보

hostname --help | less # less를 써서 page by page로 볼 수 있다.
hostname -I # all addresses for the host

date # 현재 날짜와 시간, 타임존

passwd # change password
su - # su는 switch user인데 뒤에 user name을 넣어야 하는데 이처럼 아무것도 안넣으면 root account로 접속을 시도한다
# - 는 open login shell을 의미한다.
# target user에 full environment가 set된다.
# 그래서 su와 - 는 같이 자주 쓰인다.
sudo -i # 우분투에서는 이렇게 써야 한다.
sudo passwd # root password를 변경할 수 있다.
# sudo는 이번에만 admin권한을 얻는 것

touch hello # write 권한이 있는지를 체크하기 위해 자주 쓰인다.

cd # home dir로 이동

last # 시스템에 마지막으로 로그인한 기록들을 보여준다.
```

## Man

man page에서
- `[]`: 안에 있는 것은 optional이라는 것이다
- `a|b`: a와 b 둘 중 하나를 써야 한다는 것이다.
- `...`:  여러 옵션을 사용 할 수 있다는 것이다
- 타이틀에 여러 섹션이 있는데 자주 쓰이는 것은 다음과 같다.
  - 1은 end-user commands
  - 8은 administrator(root) commands
  - 5: configuration file

```bash
man whoami

man lvcreate # 8번 command를 보기 위한 예시.

man -k user # 어떤 man page를 봐야 할지 모르겠다면 키워드 검색을 할 수 있다. -k 옵션으로
man -k user | wc # wc는 word count를 의미한다. 그래서 결과 리스트가 몇 개 인지 볼 수 있다.
# 결과는 221 2230 15109 같이 표시되는데
# 221 line, 2230 words, 15109 characters를 의미한다.
man man # man 사용 법 보는 법
man -k user | grep 8 # 결과 리스트에서 8 섹션만 filtering하고 싶을 때
# grep은 filtering utility이다.
man -k user | grep 8 | grep create # 두 번 필터링 적용

sudo mandb # man에는 db가 있는데 이를 업데이트하기 위한 커맨드

apropos man # apropos는 man -k를 한 번에 쓰는 효과이다.
```

man 페이지에서 **bold**로 그려지는 것들은 man page에 항목이 존재한다는 의미이다.

## info, pinfo

`man whoami`를 쳐보면 맨 아래에 전체 정보를 얻기 위해서는 아래와 같은 명령어를 수행하라고 나와 있다.
```bash
info '(coreutils) whoami invocation'
```

역사적으로 일부 명령어들은 man에 또 일부는 info에 document 되었다.
그래서 이런 일이 생긴 것이다.

근데 info 보다는 pinfo 사용을 권한다.

pinfo에서 페이지를 볼 때 단축키가 있는데  `U`는 go up, `N`은 next, `P`는 previous이다

`pinfo -a whomi`를 치면 바로 whoami 페이지로 들어간다.

하지만 대부분의 커맨드들은 `man` 페이지에 있어서 info류를 쓸 일은 잘 없다.

```bash
man --help # short info
```

/usr/share/doc에는 커맨드들에 대한 추가 정보가 있다.
해당 폴더에 들어가면 여러 패키지들이 있는데 해당 패키지 폴더에 들어가면 여러 파일이 있고 추가적인 정보를 얻을 수 있다.

## Overview: Help Systems in Linux
1. man
2. info, pinfo
3. {command} —help
4. /usr/share/doc