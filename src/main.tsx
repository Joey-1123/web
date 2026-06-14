import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import PortfolioPage from "@/pages/portfolio";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "Root element not found. Ensure index.html contains a div with id='root'."
  );
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
