import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Coins } from "./routes/Coins";
import { Coin } from "./routes/Coin";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};
