import { useMemo } from 'react';
import type { Appliance } from '../types';
import appliances from '../data/appliances.json';

interface Props {
  onSelect: (appliance: Appliance | null) => void;
}

export function ApplianceSelect({ onSelect }: Props) {
  const categories = useMemo(() => {
    const map = new Map<string, Appliance[]>();
    for (const a of appliances as Appliance[]) {
      const list = map.get(a.category) ?? [];
      list.push(a);
      map.set(a.category, list);
    }
    return map;
  }, []);

  return (
    <div className="form-group">
      <label htmlFor="appliance-select">家電を選択（プリセット）</label>
      <select
        id="appliance-select"
        onChange={(e) => {
          if (e.target.value === '') {
            onSelect(null);
            return;
          }
          const found = (appliances as Appliance[]).find(
            (a) => a.name === e.target.value
          );
          onSelect(found ?? null);
        }}
      >
        <option value="">-- 選択してください --</option>
        {[...categories.entries()].map(([category, items]) => (
          <optgroup key={category} label={category}>
            {items.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}（{a.watt}W）
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <p className="form-group__hint">
        選択するとW数が自動入力されます。手動で変更も可能です。
      </p>
    </div>
  );
}
