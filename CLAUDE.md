# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

電気代カリキュレーター — 家電ごとの電気代を可視化し、節約・買い替え判断を支援する静的Webツール。
収益: AdSense + Amazon/楽天アフィリエイト（省エネ家電への買い替え提案で誘導）。

## Tech Stack

- **Framework**: React + TypeScript (Vite)
- **Hosting**: Cloudflare Pages (GitHub main branch push で自動デプロイ)
- **Analytics**: GA4 + Search Console
- **Ads**: Google AdSense
- **Data**: 電力料金・家電プリセットは静的JSONで管理（年1〜2回手動更新）

## Build & Dev Commands

```bash
npm install          # 依存インストール
npm run dev          # 開発サーバー起動 (Vite)
npm run build        # プロダクションビルド
npm run preview      # ビルド結果のプレビュー
npm run lint         # ESLint
npm run typecheck    # TypeScript型チェック
```

## Architecture

### ページ構成（React Router）

| Path | 機能 |
|---|---|
| `/` | トップ（ツール一覧 + 導線） |
| `/calc` | 家電別 電気代計算（メインツール） |
| `/total` | 家計まるごと計算（複数家電 + 円グラフ） |
| `/replace` | 買い替え節約シミュレーター |
| `/aircon` | エアコンつけっぱなし vs こまめに切る比較 |
| `/plan` | 電力会社・プラン別 単価比較 |
| `/about` | 概要・免責 |

### データ層

- `src/data/electricityRates.json` — 電力会社の段階料金・基本料金。従量電灯（規制料金）のみ。
- `src/data/appliances.json` — 家電プリセット（名前・W数・カテゴリ・alwaysOnフラグ）。
- `defaultRate: 31円/kWh` をフォールバック単価として使用。

### 計算ロジック

- 計算関数は純粋関数として `src/utils/` に集約。副作用なし。
- 基本式: `電気代 = W数 / 1000 × 使用時間 × 日数 × 単価(円/kWh)`
- 段階料金計算: 月間kWhを3段階に分割して各段階の単価を適用。
- `alwaysOn: true` の家電は使用時間を24h固定。

### 重要な設計判断

- エアコン比較は簡易モデル（インバーター制御の正確なシミュレーションではない）。目安である旨を必ず明記。
- 電力自由化プランは数が膨大なため、従量電灯（規制料金）に絞る。
- 料金JSONの更新 → git push だけで Cloudflare Pages に自動デプロイされる。

## 日本語プロジェクト

UIテキスト・データ・コメントは日本語。コード（変数名・関数名）は英語。
