---
title: "SDKMAN setting guide"
date: "2022-06-22"
draft: false
path: "/blog/dev/sdkman-setting-guide/"
---

sdkman [https://sdkman.io/](https://sdkman.io/)

sdkman을 이용하면 java와 sbt 버전을 관리할 수 있다.
[https://mungingdata.com/java/sdkman-multiple-versions-java-sbt-scala/](https://mungingdata.com/java/sdkman-multiple-versions-java-sbt-scala/)

```language-bash
sdk list java / sdk list sbt / sdk list spark
sdk install java 11.0.13-ms
sdk use java 11.0.13-ms
sdk default java 11.0.13-ms
echo $JAVA_HOME
```