import { useEffect, useRef } from 'react';

interface Props {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  style?: React.CSSProperties;
}

export function AdUnit({ slot, format = 'auto', style }: Props) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as unknown as Record<string, unknown[]>).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense not loaded (dev環境など)
    }
  }, []);

  return (
    <div style={{ margin: '24px 0', textAlign: 'center', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6514048542181621"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
}
