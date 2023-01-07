---
title: "Docker"
date: "2021-09-07"
draft: false
path: "/blog/snippets/docker/"
---

# docker

## ps format
[https://gist.github.com/wzulfikar/f6f7dc8b9d6aa5bc207eaa31913201d8](https://gist.github.com/wzulfikar/f6f7dc8b9d6aa5bc207eaa31913201d8)


### 영구 적용

```bash
vi ~/.docker/config.json
```

```json
{
  "psFormat": "ID\t{{.ID}}\nNAME\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n"
}
```

### 일시 적용
```bash
export FORMAT="..."

docker ps --format="$FORMAT"
```
