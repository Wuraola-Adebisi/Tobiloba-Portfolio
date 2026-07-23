import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";

const SoftwareLayout = lazy(() => import("./routes/SoftwareLayout"));
const DataLayout = lazy(() => import("./routes/DataLayout"));

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Navigate to="/software/" replace />} />
          <Route path="/software/*" element={<SoftwareLayout />} />
          <Route path="/data/*" element={<DataLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
