import { parseHash } from "@/utils/parsehash.util";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ParseHashAfterLogin = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [] = useState();
  useEffect(() => {
    const tokens = parseHash();

    if (tokens && tokens["access-token"] && tokens["refresh-token"]) {
      localStorage.setItem("access-token", tokens["access-token"]);
      localStorage.setItem("refresh-token", tokens["refresh-token"]);
    }
    navigate("/");
  }, [window.location.hash]);
  return children;
};

export default ParseHashAfterLogin;
