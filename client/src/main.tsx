import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router.tsx";
import ParseHashAfterLogin from "./components/layout/ParseHashAfterLogin.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ParseHashAfterLogin>
      <Router />
    </ParseHashAfterLogin>
  </BrowserRouter>
);
