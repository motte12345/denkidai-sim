# TODO.md — 電気代カリキュレーター

## 本番公開済み: https://denkidai-sim.pages.dev/

### Phase 1 — 完了
- [x] Vite + React + TypeScript プロジェクト初期化
- [x] React Router セットアップ
- [x] 共通レイアウト（ヘッダー・フッター）
- [x] appliances.json 作成（50種類）
- [x] electricityRates.json 作成（10電力会社）
- [x] 計算ユーティリティ関数
- [x] `/calc` 家電別電気代計算ページ
- [x] `/` トップページ

### Phase 2 — 完了
- [x] `/total` 家計まるごと計算（円グラフ付き）
- [x] `/replace` 買い替え節約シミュレーター
- [x] `/aircon` エアコン比較
- [x] `/plan` 電力プラン比較

### Phase 3 — 完了
- [x] `/about` 概要・免責
- [x] AdSense配置（全ページ下部にAdUnitコンポーネント）
- [x] アフィリエイト導線（calc, replace, aircon に AffiliateSection）
- [x] SEO対策（Head, OGP, sitemap.xml, robots.txt, canonical）
- [x] コード分割（lazy loading）
- [x] Cloudflare Pages SPA対応（_redirects, _headers）
- [x] GA4/AdSense/アフィリエイトIDを環境変数化（.env.example）
- [x] 入力バリデーション追加
- [x] コードレビュー指摘事項の修正（HIGH 5件 + MEDIUM 2件）
- [x] GitHub リポジトリ作成 + push (motte12345/denkidai-sim)
- [x] Cloudflare Pages デプロイ (denkidai-sim.pages.dev)

### 残作業（手動対応）
- [ ] Cloudflareダッシュボードで GitHub連携を設定（自動デプロイ化）
- [ ] `.env` に本番の GA4 ID を設定
- [ ] `.env` に本番の AdSense クライアントID を設定
- [ ] `.env` に Amazon/楽天アフィリエイトID を設定
- [ ] Cloudflare Pages の環境変数に VITE_* を設定
- [ ] Search Console にサイト登録 + sitemap送信
