import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/product/:id" element={<ProductDetailPage />} />

      <Route path="#" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
