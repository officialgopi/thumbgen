import Landing from "@/app/LandingPage";
import MainPage from "@/app/MainPage";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useUser } from "@/store/user.store";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

export default function Router() {
  const { user, getUser, isLoading } = useUser();
  useEffect(() => {
    getUser().then(() => {
      console.log(user);
    });
  }, []);
  return (
    <Routes>
      {isLoading && <Route path="*" element={<>Loading...</>} />}
      {!isLoading && (
        <>
          <Route path="/" element={<Landing />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<MainPage />} />
          </Route>
        </>
      )}
    </Routes>
  );
}
