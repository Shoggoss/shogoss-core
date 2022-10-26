# ShoGoSs-core

A core library for ShoGoSs. To my knowledge, it fully implements all the rules mentioned in the [rulebook](https://shogos-app.web.app), except for:

- The possibility of having no piece to move
- Comparing the sizes of the surrounded territories

しょ碁スのコアライブラリ。[ルールブック](https://shogos-app.web.app)に記載のあるルールはほぼ全て実装できているはず。例外として、

- 「駒フェイズが着手不能なのでパス」
- 「陣地の多い側が勝利」

は実装していない。

## What is ShoGoSs?

ShoGoSs is a board game of cosmic horror that amalgamates Shogi, Go and chess.

## 偉大なる先駆者様方 / The Great Old Ones

- https://vrchat.com/home/world/wrld_c7860c60-5ed3-4f67-9c5f-263b193eda31 by https://twitter.com/oga_pleconia
- https://shogos-app.web.app by https://twitter.com/narazaka
- https://github.com/cocu-tan/ShoGoSs-rust

## 関連ライブラリ / related libraries
- [shogoss-parser](https://github.com/Shoggoss/shogoss-parser): 棋譜パーサー / parses the game record
