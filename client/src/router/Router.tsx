import Landing from "@/app/LandingPage";
import MainPage from "@/app/MainPage";
import { Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}
