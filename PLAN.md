# PLAN.md — 電気代カリキュレーター 開発計画

## 全フェーズ完了・本番運用中

### Phase 1: プロジェクト基盤 + メインツール — 完了
- [x] Vite + React + TypeScript プロジェクト初期化
- [x] React Router + lazy loading
- [x] 共通レイアウト（ヘッダー・フッター・レスポンシブ）
- [x] データJSON作成（appliances.json 50種, electricityRates.json 10社）
- [x] 計算ユーティリティ関数（純粋関数）
- [x] `/calc` 家電別電気代計算ページ
- [x] `/` トップページ

### Phase 2: 残りの計算ツール — 完了
- [x] `/total` 家計まるごと計算（円グラフ + モバイルカード表示）
- [x] `/replace` 買い替え節約シミュレーター
- [x] `/aircon` エアコンつけっぱなし vs こまめに切る比較
- [x] `/plan` 電力会社・プラン別単価比較

### Phase 3: 収益化・SEO・公開 — 完了
- [x] AdSense + GA4（SPA遷移トラッキング付き）
- [x] Amazon/楽天/A8.netアフィリエイト
- [x] SEO（JSON-LD, パンくず, OGP画像, sitemap, canonical）
- [x] プライバシーポリシー
- [x] セキュリティヘッダー（CSP, HSTS）
- [x] 入力値のlocalStorage永続化
- [x] デザイン改善（モバイル対応, 自動スクロール, 順位ハイライト）
- [x] コードレビュー3回（code-reviewer, frontend, security）
- [x] Cloudflare Pages デプロイ + GitHub連携

## 今後の改善候補
- A8.net の他案件追加（太陽光・蓄電池・ガス比較等）
- プリレンダリング（SSG）導入でクローラビリティ向上
- 各ページのSEOテキスト充実
