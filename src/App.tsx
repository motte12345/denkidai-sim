import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

const TopPage = lazy(() => import('./pages/TopPage').then((m) => ({ default: m.TopPage })));
const CalcPage = lazy(() => import('./pages/CalcPage').then((m) => ({ default: m.CalcPage })));
const TotalPage = lazy(() => import('./pages/TotalPage').then((m) => ({ default: m.TotalPage })));
const ReplacePage = lazy(() => import('./pages/ReplacePage').then((m) => ({ default: m.ReplacePage })));
const AirconPage = lazy(() => import('./pages/AirconPage').then((m) => ({ default: m.AirconPage })));
const PlanPage = lazy(() => import('./pages/PlanPage').then((m) => ({ default: m.PlanPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container main" style={{ textAlign: 'center' }}>読み込み中...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<TopPage />} />
            <Route path="calc" element={<CalcPage />} />
            <Route path="total" element={<TotalPage />} />
            <Route path="replace" element={<ReplacePage />} />
            <Route path="aircon" element={<AirconPage />} />
            <Route path="plan" element={<PlanPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
