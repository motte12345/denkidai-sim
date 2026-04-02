# TODO.md — 電気代カリキュレーター

## 本番公開済み: https://denkidai-sim.pages.dev/

### 実装済み
- [x] 全5ツール（家電別計算・まるごと計算・買い替え・エアコン比較・プラン比較）
- [x] 共通レイアウト・レスポンシブ対応・モバイルカード表示
- [x] 家電プリセット50種類 + 10電力会社の料金データ
- [x] SEO（Head, OGP, canonical, sitemap, robots, JSON-LD, パンくず）
- [x] GA4（G-QVPMWQF752）+ SPA遷移トラッキング
- [x] AdSense（ca-pub-6514048542181621）
- [x] Amazon（qp2026-22）/ 楽天アフィリエイト
- [x] A8.net エルピオでんき広告（/plan ページ）
- [x] セキュリティヘッダー（CSP, HSTS, X-Frame-Options等）
- [x] 入力値のlocalStorage永続化
- [x] コード分割（lazy loading）
- [x] Cloudflare Pages デプロイ + GitHub push

### 残タスク（手動対応）
- [ ] Cloudflareダッシュボードで GitHub連携を設定（自動デプロイ化）
- [ ] Search Console にサイト登録 + sitemap送信
- [ ] AdSense サイト確認の再申請

### 将来的な改善候補
- [ ] 電力料金データの最新値への更新（中部電力等）
- [ ] OGP画像の作成・設定
- [ ] プライバシーポリシーページ（AdSense要件）
- [ ] プリレンダリング（SSG）導入でクローラビリティ向上
- [ ] A8.net の他案件追加（太陽光・蓄電池・ガス比較等）
