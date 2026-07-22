import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import SoftwareLayout from "./routes/SoftwareLayout";
import DataLayout from "./routes/DataLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/software/" replace />} />
        <Route path="/software/*" element={<SoftwareLayout />} />
        <Route path="/data/*" element={<DataLayout />} />
      </Routes>
    </BrowserRouter>
  );
}