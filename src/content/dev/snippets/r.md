---
title: "R snippets"
date: "2021-07-31"
draft: false
path: "/blog/snippets/r/"
---

```r
x <- c(1,2,3,4,5,6,7,8,9,10)
# 중앙 값
median(x)
# 최소 최대 값
min(x)
max(x)

# 평균
mean(x)
# 표준편차
sd(weight)

# parseInt
as.integer(val)

# for
for(i in 1 : nrow(my_list)) {
  ...
}

# tryCatch
tryCatch({
  ...
}, error = function(e) {
  warning(paste0("Error in ...", name))
})

# sleep
Sys.sleep(2)

# add comma every 3 digits
format(number_value ,big.mark=",", trim=TRUE)
```

# string 관련
```r
str_detect("ABCD", "A") # true
str_detect(c("ABCD", "BD"), "A") # [true false]

table <- data.table(id=c("apple", "banana", "cherry", "durian"), count=c(1,2,3,4))
# str_which(string, pattern) : 문자열(string)에서 pattern을 비교하여 TRUE인 인덱스를 알려준다
str_which(string$id, "ur")
# [1] 4
```

# CSV 관련
- read csv
```r
dat <- read.csv(file = "data/inflammation-01.csv", header = FALSE)

value = read.csv('data/KOR_value.csv', row.names = 1, stringsAsFactors = FALSE)
```

- write csv
https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/write.table
```r
write.csv(df, 'data/total.csv')
write.table(df, 'data/total.csv', row.names = FALSE) # print without rownames
```

# dataframe 관련
- 컬럼 순서 변경 방법
```r
df = df[, c('원하는', '순서', '대로')]
```

- sorting
```r
newdata <- leadership[order(gender, age),] # ASC
newdata <- leadership[order(gender, -age),] # DESC
```

# date 관련
lubridate: date 관련 유용한 라이브러리 [cheatsheet](https://rawgit.com/rstudio/cheatsheets/master/lubridate.pdf)

```r
library(lubridate)
```

```r
# 기본
as.Date("2021-04-27")
# lubidrate
ymd("2021/04/27")
mdy("04/27/2021")
```

## 날짜 + 시간 정보 넣고 싶을 경우
```r
# 기본
as.POSIXct("2021-04-27 04:30:22")
# lubidrate
ymd_hms("2021-04-27 04:30:22")
```

## 시간까지만 넣고 싶을 경우
```r
# 기본
as.POSIXct("2021-04-27 04:00:00")
# lubidrate
ymd_h("2021-04-27 04")
```

## 현재 날짜 구하기
```r
# 현재날짜: 2021-04-27

lubridate::year(Sys.Date())
# 2021
lubridate::month(Sys.Date())
# 4
lubridate::day(Sys.Date())
# 27
```


# manipulating
출처:
https://swcarpentry.github.io/r-novice-inflammation/01-starting-with-data/index.html

```r
# type을 얻는 방법
class(dat)
# "data.frmae"

# rows와 columns를 얻는 방법
dim(dat)
# [1] 60 40

# first value in dat, row 1, column 1
dat[1, 1]
# [1] 0

# middle value in dat, row 30, column 20
dat[30, 20]
# [1] 16

# pick columns 10 and 20 from rows 1, 3, and 5, we can do this:
dat[c(1,3,5), c(10,20)]
#   V10 V20
# 1   3  18
# 3   9  10
# 5   4  17
```

## 범위 값을 얻는 방법
```r
1:5
# [1] 1 2 3 4 5

3:12
# [1] 3 4 5 6 7 8 9 10 11 12

dat[1:4, 1:10]
#   V1 V2 V3 V4 V5 V6 V7 V8 V9 V10
# 1  0  0  1  3  1  2  4  7  8   3
# 2  0  1  2  1  2  1  3  2  2   6
# 3  0  1  1  3  3  2  6  2  5   9
# 4  0  0  2  0  4  2  2  1  6   7

# All columns from row 5
dat[5, ]

# All rows from column 16-18
dat[, 16:18]

# Addressing Columns by Name
dat$V16
dat[, 'V16']
```

## math 관련
```r
# first row, all of the columns
patient_1 <- dat[1, ]
# max inflammation for patient 1
max(patient_1)
# [1] 18

# max inflammation for patient 2
max(dat[2, ])

# minimum inflammation on day 7
min(dat[, 7])

# mean inflammation on day 7
mean(dat[, 7])

# median inflammation on day 7
median(dat[, 7])

# standard deviation of inflammation on day 7
sd(dat[, 7])

# Summarize function
summary(dat[, 1:4])
```


- nrow/ncol: Array의 rows / columns 길이
```r
for (i in 1 : nrow(data)) {
  ...
}
```

- rownames/colnames: get rownames or columnnames of Array
```r
rownames(myList)
rownames(myList) = c(1,2,3,4,5) # rownames 혹은 colnames를 임의로 변경할 수 있다.
```

- str_pad: 문자의 남은 부분을 채울때 사용
```r
str_pad('300', 6, side = c('left'), pad = '0')
# 000300
```

- substr
```r
substr('12345', 2, 4)
#234
```