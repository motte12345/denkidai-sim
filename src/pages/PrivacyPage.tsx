import { Head } from '../components/Head';
import { Breadcrumb } from '../components/Breadcrumb';

export function PrivacyPage() {
  return (
    <>
      <Head
        title="プライバシーポリシー"
        description="電気代カリキュレーターのプライバシーポリシー。個人情報の取り扱い、Cookie、広告配信について説明します。"
        path="/privacy"
      />
      <Breadcrumb items={[{ name: 'プライバシーポリシー' }]} />
      <h2 className="page-title">プライバシーポリシー</h2>

      <div className="card">
        <h3 className="card__title">個人情報の取り扱いについて</h3>
        <p style={{ lineHeight: 1.8 }}>
          当サイト「電気代カリキュレーター」（以下「当サイト」）は、
          ユーザーの個人情報を適切に取り扱うことを重要と考え、
          以下のとおりプライバシーポリシーを定めます。
        </p>
      </div>

      <div className="card">
        <h3 className="card__title">収集する情報</h3>
        <p style={{ lineHeight: 1.8 }}>
          当サイトは会員登録やお問い合わせフォームを設けておらず、
          ユーザーの氏名・メールアドレス等の個人情報を直接収集することはありません。
        </p>
        <p style={{ lineHeight: 1.8, marginTop: 8 }}>
          ただし、以下のサードパーティサービスを通じて、
          匿名の利用状況データが自動的に収集される場合があります。
        </p>
      </div>

      <div className="card">
        <h3 className="card__title">Google Analytics について</h3>
        <p style={{ lineHeight: 1.8 }}>
          当サイトでは、アクセス解析のためにGoogle Analytics（Googleアナリティクス）を利用しています。
          Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。
          このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <p style={{ lineHeight: 1.8, marginTop: 8 }}>
          この機能はCookieを無効にすることで収集を拒否できます。
          お使いのブラウザの設定をご確認ください。
          詳しくは
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            Google のサービスを使用するサイトやアプリから収集した情報の Google による使用
          </a>
          をご覧ください。
        </p>
      </div>

      <div className="card">
        <h3 className="card__title">Google AdSense について</h3>
        <p style={{ lineHeight: 1.8 }}>
          当サイトでは、第三者配信の広告サービス「Google AdSense」を利用しています。
          Google AdSenseでは、ユーザーの興味に応じた広告を表示するために、
          Cookieを使用することがあります。
        </p>
        <p style={{ lineHeight: 1.8, marginTop: 8 }}>
          Cookieを使用することにより、
          ユーザーが当サイトや他のサイトにアクセスした際の情報に基づいて
          広告を配信することが可能になります。
          ユーザーは
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            広告設定
          </a>
          でパーソナライズ広告を無効にすることができます。
        </p>
      </div>

      <div className="card">
        <h3 className="card__title">アフィリエイトプログラムについて</h3>
        <p style={{ lineHeight: 1.8 }}>
          当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定された
          アフィリエイトプログラムである「Amazonアソシエイト・プログラム」に参加しています。
        </p>
        <p style={{ lineHeight: 1.8, marginTop: 8 }}>
          また、楽天アフィリエイト、A8.net等のアフィリエイトプログラムにも参加しています。
          これらのプログラムにより、当サイト経由で商品・サービスを購入された場合に
          紹介料が発生することがありますが、ユーザーに追加費用は一切かかりません。
        </p>
      </div>

      <div className="card">
        <h3 className="card__title">Cookieについて</h3>
        <p style={{ lineHeight: 1.8 }}>
          当サイトでは、ユーザーの入力値を保持するためにブラウザのローカルストレージを使用しています。
          これはブラウザに保存されるデータであり、外部に送信されることはありません。
        </p>
        <p style={{ lineHeight: 1.8, marginTop: 8 }}>
          上記のGoogle Analytics・Google AdSenseが使用するCookieについては、
          各サービスのプライバシーポリシーをご確認ください。
        </p>
      </div>

      <div className="card">
        <h3 className="card__title">プライバシーポリシーの変更</h3>
        <p style={{ lineHeight: 1.8 }}>
          当サイトは、必要に応じてプライバシーポリシーを変更することがあります。
          変更後のプライバシーポリシーは、当ページに掲載した時点から効力を生じるものとします。
        </p>
        <p style={{ marginTop: 12, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          制定日: 2026年4月2日
        </p>
      </div>
    </>
  );
}
