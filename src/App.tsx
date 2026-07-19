import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SoftwareLayout from "./routes/SoftwareLayout";
import DataLayout from "./routes/DataLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/software/" replace />} />
        <Route path="/software/*" element={<SoftwareLayout />} />
        <Route path="/data/*" element={<DataLayout />} />
      </Routes>
    </BrowserRouter>
  );
}