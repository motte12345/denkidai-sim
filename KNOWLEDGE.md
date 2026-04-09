# KNOWLEDGE.md — 電気代カリキュレーター

## 2026-04-01: wranglerのcommit-messageに日本語は使えない
- **原因**: `npx wrangler pages deploy --commit-message` に日本語を渡すと `Invalid commit message, it must be a valid UTF-8 string. [code: 8000111]` エラー
- **解決策**: commit-messageはASCII英語で書く
- **教訓**: Cloudflare APIのUTF-8処理にバグがある模様。git commitのメッセージ自体は日本語OK

## 2026-04-01: AdSenseのサイト確認にはindex.htmlにscriptタグ直書きが必要
- **原因**: SPAで動的にscriptをロードする方式だと、AdSenseクローラーがscriptタグを検出できない
- **解決策**: GA4/AdSenseのscriptタグをindex.htmlの`<head>`に直接記載
- **教訓**: クローラーはJSを実行しないため、サードパーティscriptの読み込みはindex.htmlに書く

## 2026-04-01: canonical/OGP/sitemapのURLは実際のドメインと一致させること
- **原因**: 開発時に仮ドメイン `denkidai-calc.pages.dev` をハードコードしたまま、実際は `denkidai.simtool.dev` でデプロイした
- **解決策**: Head.tsx, index.html, sitemap.xml, robots.txt の全URLを修正
- **教訓**: ドメインが決まったら即座に全ファイルをgrepして置換する

## 2026-04-02: 中部電力の料金データは最新値を確認すること
- **原因**: 初期データが2022年頃の古い単価だった。他社と比べて異様に安く表示されていた
- **解決策**: 公式サイトから最新の従量電灯B料金を取得して更新
- **教訓**: 電力料金データを作成する際は、必ず公式サイトの最新値を確認する。年1〜2回の定期更新を忘れないこと

## 2026-04-02: エアコン比較の計算モデルは外出時間を正しく反映させる
- **原因**: `costTurnOff`（切って再起動のコスト）が外出時間パラメータを使わず、固定値で計算されていた
- **解決策**: つけっぱなし=外出中の安定稼働コスト、切って再起動=外出中0円+帰宅後の起動高負荷+復帰安定稼働、というモデルに修正
- **教訓**: 計算モデルは全入力パラメータが結果に影響していることを確認する
