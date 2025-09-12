import { useUser } from "@/store/user.store";
import { parseHash } from "@/utils/parsehash.util";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ParseHashAfterLogin = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { getUser } = useUser();
  useEffect(() => {
    const tokens = parseHash();

    if (tokens && tokens["access-token"] && tokens["refresh-token"]) {
      localStorage.setItem("access-token", tokens["access-token"]);
      localStorage.setItem("refresh-token", tokens["refresh-token"]);
      getUser().then(() => {
        navigate("/main");
      });
    }
  }, [window.location.hash]);
  return children;
};

export default ParseHashAfterLogin;
