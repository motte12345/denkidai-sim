# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

電気代カリキュレーター — 家電ごとの電気代を可視化し、節約・買い替え判断を支援する静的Webツール。
収益: AdSense + Amazon/楽天アフィリエイト + A8.net（エルピオでんき等）。

本番URL: https://denkidai.simtool.dev/

## Tech Stack

- **Framework**: React 19 + TypeScript (Vite 8)
- **Hosting**: Cloudflare Pages (GitHub main branch push で自動デプロイ)
- **Analytics**: GA4 (G-QVPMWQF752) — index.htmlに直書き + SPA遷移トラッキング
- **Ads**: Google AdSense (ca-pub-6514048542181621) — index.htmlに直書き
- **Affiliate**: Amazon (qp2026-22), 楽天, A8.net
- **Charts**: Recharts（/total の円グラフ）
- **Data**: 電力料金・家電プリセットは静的JSONで管理（年1〜2回手動更新）

## Build & Dev Commands

```bash
npm install          # 依存インストール
npm run dev          # 開発サーバー起動 (Vite)
npm run build        # プロダクションビルド (tsc -b && vite build)
npm run preview      # ビルド結果のプレビュー
npm run lint         # ESLint
npm run typecheck    # TypeScript型チェック
```

## Deploy

GitHub連携済み。mainにpushすればCloudflare Pagesが自動デプロイ。
手動デプロイが必要な場合:
```bash
npm run build && npx wrangler pages deploy dist --project-name denkidai-sim --branch main --commit-message "message" --commit-dirty=true
```
注意: wranglerのcommit-messageに日本語を使うとエラーになる。ASCII英語で書くこと。

## Architecture

### ページ構成（React Router, lazy loading）

| Path | 機能 |
|---|---|
| `/` | トップ（ツール一覧カード + JSON-LD） |
| `/calc` | 家電別 電気代計算（メインツール） |
| `/total` | 家計まるごと計算（複数家電 + 円グラフ） |
| `/replace` | 買い替え節約シミュレーター |
| `/aircon` | エアコンつけっぱなし vs こまめに切る比較 |
| `/plan` | 電力会社・プラン別 単価比較 + A8広告 |
| `/about` | 概要・免責・連絡先 |
| `/privacy` | プライバシーポリシー |

### データ層

- `src/data/electricityRates.json` — 10電力会社の段階料金・基本料金。従量電灯（規制料金）のみ。
- `src/data/appliances.json` — 家電プリセット50種類（名前・W数・カテゴリ・alwaysOnフラグ）。
- `defaultRate: 31円/kWh` をフォールバック単価として使用。

### 計算ロジック

- 計算関数は純粋関数として `src/utils/calc.ts` に集約。副作用なし。
- 基本式: `電気代 = W数 / 1000 × 使用時間 × 日数 × 単価(円/kWh)`
- 年計算: 30日/月 × 12ヶ月 = 360日（全ページで統一）
- 段階料金計算: 月間kWhを3段階に分割して各段階の単価を適用。
- `alwaysOn: true` の家電は使用時間24h・頻度「毎日」に固定。

### 共通コンポーネント

- `Head` — ページごとのtitle/description/canonical/OGPを動的更新
- `Breadcrumb` — パンくずリスト（ol/li + BreadcrumbList JSON-LD）
- `JsonLd` — 構造化データ（`</script>` エスケープ済み）
- `AdUnit` — AdSense広告ユニット
- `AffiliateSection` — Amazon/楽天の商品検索リンク
- `RelatedTools` — 他ツールへのクロスリンク
- `ResultDisplay` — 計算結果の4カード表示

### 状態管理

- `usePersistedState` — localStorage永続化フック。全ページの入力値を保持。
- キー命名: `denkidai:{page}:{field}`（例: `denkidai:calc:watt`）

### SEO

- JSON-LD: WebSite, WebApplication, HowTo, FAQPage, BreadcrumbList
- OGP画像: `public/ogp.png`（1200x630, scripts/generate-ogp.htmlで生成）
- GA4 SPA遷移: Layout.tsxのuseEffectでpage_viewイベント送信

### セキュリティ

- `public/_headers` — CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- JsonLdで `<` を `\u003c` にエスケープ（scriptブレークアウト防止）
- 全計算ページでNumber.isFiniteバリデーション

### 重要な設計判断

- GA4/AdSense IDはindex.htmlに直書き（環境変数ではない）。ユーザー指示。
- エアコン比較は簡易モデル。目安である旨をnotice-boxで明記。
- 電力自由化プランは数が膨大なため、従量電灯（規制料金）に絞る。
- 料金JSONの更新 → git push で自動デプロイ。

## 日本語プロジェクト

UIテキスト・データは日本語。コード（変数名・関数名）は英語。
