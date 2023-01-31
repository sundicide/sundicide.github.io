---
title: "Ag Grid"
date: "2023-01-30"
draft: true
path: "/blog/ag-grid/"
---

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
기본 설정은 위와 같이 하면 된다. 다만 `@emotion/react`에서 `ThemeProvider`를 같이 사용하면 `document`를 찾을 수 없다는 에러를 볼 수 있는데 이때는 setLincenseKey를 별도의 AgGrid 컴포넌트에서 하면 된다.

