# PLAN.md — 電気代カリキュレーター 開発計画

## Phase 1: プロジェクト基盤 + メインツール

- [ ] Vite + React + TypeScript プロジェクト初期化
- [ ] React Router セットアップ（全ページのルーティング）
- [ ] 共通レイアウト（ヘッダー・フッター・レスポンシブ対応）
- [ ] データJSON作成（appliances.json, electricityRates.json）
- [ ] 計算ユーティリティ関数（純粋関数）
- [ ] `/calc` 家電別電気代計算ページ（メインツール）
- [ ] `/` トップページ（ツール一覧）

## Phase 2: 残りの計算ツール

- [ ] `/total` 家計まるごと計算（複数家電登録 + 円グラフ）
- [ ] `/replace` 買い替え節約シミュレーター
- [ ] `/aircon` エアコンつけっぱなし vs こまめに切る比較
- [ ] `/plan` 電力会社・プラン別単価比較

## Phase 3: 収益化・SEO・公開

- [ ] `/about` 概要・免責ページ
- [ ] AdSense広告ユニット配置
- [ ] アフィリエイト導線（省エネ家電の提案セクション）
- [ ] SEO対策（meta, OGP, sitemap.xml, robots.txt）
- [ ] GA4 + Search Console 設定
- [ ] Cloudflare Pages デプロイ設定

## 方針

- Phase 1を最優先。動くメインツールを早期に完成させる。
- 各ツールは独立しているため、Phase 2は並行開発可能。
- 収益化はPhase 3でまとめて対応。
