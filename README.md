# Welcome to gpp 👋

[![Version](https://img.shields.io/npm/v/gpp.svg)](https://www.npmjs.com/package/gpp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> shortcut of git add + git commit -m + git push

## Install

```sh
npm i gpp -g
```

## Usage

一条命令，一次性执行: `git add .` 、 `git commit -m 信息` 和 `git push`

```sh
gpp 任何需要commit的信息
```

带空格的提交：

```sh
gpp 首页优化 接口替换
```

缺省 commit 信息的提交：

```sh
# 缺省信息为 update
gpp
```

只 commit 不 push

```sh
gmm 任何需要commit的信息(缺省为update)
```

## Author

👤 **wangyongfeng**

- Github: [@imaoda](https://github.com/imaoda)
