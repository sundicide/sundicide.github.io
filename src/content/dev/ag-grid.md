---
title: "Ag Grid"
date: "2023-01-30"
draft: false
path: "/blog/ag-grid/"
---

## Table of Contents
```toc
```
## Introduction

Next.js v13에서의 AgGrid 사용법에 대한 내용을 다룬다.


## Package Installation
```bash
yarn add ag-grid-community ag-grid-enterprise ag-grid-react
```

`.env` 설정
```bash
NEXT_PUBLIC_AG_GRID_LICENSE_KEY="..."
```

## Setting License Key
```javascript
import { LicenseManager } from "ag-grid-enterprise";

export default function App({ Component, pageProps }: AppProps) {
  LicenseManager.setLicenseKey(
    process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY || "",
  );
  ...
}
```
기본 설정은 위와 같이 하면 된다. <br />
다만 `@emotion/react`에서 `ThemeProvider`를 같이 사용하면 `document not found` 에러가 발생할 수 있다. <br />
이때는 setLincenseKey를 별도의 AgGrid 컴포넌트에서 하면 된다.

## 사용법
기본 형태는 다음과 같다.

```javascript
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise/styles/ag-grid.css";
import "ag-grid-enterprise/styles/ag-theme-alpine.css";

export default function Default() {
  const columns = [{ field: "name" }, { field: "familyName" }];
  const rowDatas = [
    { name: "Hello", familyName: "World" },
    { name: "Lorem", familyName: "Ipsum" },
  ];

  return (
    <div style={{ height: "100%", boxSizing: "border-box" }}>
      <div
        style={{ width: "100%", height: "100%" }}
        className="ag-theme-alpine"
      >
        <AgGridReact columnDefs={columns} rowData={rowDatas} />
      </div>
    </div>
  );
}
```

rowDatas는 말그대로 데이터를 표현하는 부분이기에 별도의 설명은 하지 않겠다.

### columns
위의 기본 예제에서 보듯이 data에서 `field`에 해당하는 키 값을 보여준다. <br />
하지만 data내에 object가 존재할 경우에는 아래와 같이 해야 한다.

```javascript
data = [{ a: { b: 1}}]

columns = [{
  // 여기선 valueGetter를 사용해 값을 꺼내올 것이기에 굳이 `field` 키가 없어도 된다.
  headerName: "My Data", // header에 표현할 텍스트
  valueGetter: params => params.data.a.b, // 데이터를 꺼내올 곳
  valueFormatter: params => '😀' + params.value, // 필요 시 데이터를 다르게 표현할 방법을 지정 가능하다
}]
```

#### filter
그리고 **필터**를 추가할 수 있는데

```javascript
columns = [{
  ...,
  filter: false, // false 시 해당 컬럼의 필터 disabled. true 시 'agTextColumnFilter'
}]
```

**boolean** 대신 String으로 AgGrid에서 제공하는 다른 필터를 사용할 수도 있다.

```javascript
columns = [{
  ...,
  filter: "agNumberColumnFilter", // AgGrid에서 제공하는 필터.
}]
```
기본은 `agTextColumnFilter`(텍스트를 이용한 필터) 이지만 필요 시 다른 AgGrid filter도 사용 가능하다.
* agNumberColumnFilter
* agTextColumnFilter
* agDateColumnFilter
* agSetColumnFilter



아래 페이지에서 상세 내용 확인 가능하다. <br />
https://www.ag-grid.com/react-data-grid/filtering/
<br />
<br />

#### cellRendererSelector
텍스트 대신 `컴포넌트`를 그려야 할 경우엔 아래와 같이 가능하다.
```javascript
columns = [{
  ...,
  cellRendererSelector: params => ({
    component: () => <div>{params.value}</div>
  }), // 텍스트 대신 다른 컴포넌트를 표현하고 싶을 때 사용한다.
}]
```

### defaultColDef
위의 columns는 각 컬럼 마다 매번 설정해줘야 했다면 모든 column에 기본으로 적용할 수도 있다.

```javascript
const defaultColDef = useMemo(() => {
  return {
    filter: true, // 모든 컬럼에 filter: true가 적용 된다.
  };
}, []);

<AgGridReact
  defaultColDef={defaultColDef}
  columns={columns}
  ...
/>
```
위의 예제에서 **defaultColDef**를 이용해 `filter: true`를 설정했는데 filter를 사용하고 싶지 않은 컬럼이 있다면 columns에서 `filter: false`를 설정하면 된다.


