import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import PortfolioPage from "@/pages/portfolio";
import ProjectsPage from "@/pages/projects";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import NotFoundPage from "@/pages/not-found-page";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "Root element not found. Ensure index.html contains a div with id='root'."
  );
}

const basename = import.meta.env.PROD ? "/web" : undefined;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
