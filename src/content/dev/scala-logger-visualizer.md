---
title: "Scala Log Visualizer"
date: "2022-05-09"
draft: false
path: "/blog/dev/scala-log-visualizer/"
---

## Results

https://codepen.io/sundicide/pen/VwQvrLe

## Introduction
사내에서 운영중인 Web Service가 있는데 log를 수집하고 있었다.
2022년 1월 1일 부터 모아온 log 파일들을 scala-spark로 통계를 내고 이를 Visualize 해보기 위한 Personal Project이다.

## Description

### Scala, Spark

spark를 이용한 로그 분석에서 가장 키가 되는 코드들은 아래 코드이다.
모든 로그 파일들에서 text들을 분석 한 뒤 필터링 하고 이를 `groupBy`와 `mapValues + foldLeft`로 count를 생성했다.

마지막에 `Row`로 변환을 해 준 것은 DataFrame 형태로 변환해 결과를 CSV로 만들기 위함이다.
```scala
val filteredLines: RDD[Row] = logLines.map(line => parseLog(line))
  .filter(loggerData => loggerData != null)
  .filter(loggerData => isValidLog(loggerData))
  .map((loggerData) => (loggerData.getUser(), loggerData))
  .groupBy(d => d._1)
  .mapValues(d => d.foldLeft(0)((acc, _) => acc + 1))
  .sortBy(logPair => logPair._2)
  .map(logPair => Row(logPair._1, logPair._2))
```