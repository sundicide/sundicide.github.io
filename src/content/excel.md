---
title: "Excel Functions"
date: "2023-01-30"
draft: false
path: "/blog/excel/"
---

* 23년도 시트에서 C열이 "식비" 라는 텍스트이고, 23년도 시트의 B열이 현재 시트의 I17 보다 작고 I16보다 큰 값들의 총합 <br/>
  `=SUMIFS('23년'!$E:$E, '23년'!$B:$B,"<"&I$17,'23년'!$B:$B,">="&I$16,'23년'!$C:$C,$B11)`