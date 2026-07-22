import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Route = "software" | "data";

export function useRoute() {
  const location = useLocation();
  const navigate = useNavigate();

  const route: Route = location.pathname.startsWith("/data")
    ? "data"
    : "software";

  useEffect(() => {
    document.body.classList.toggle("route-data", route === "data");
  }, [route]);

  const setRoute = (next: Route) => {
    navigate(next === "data" ? "/data/" : "/software/");
  };

  return { route, setRoute };
}
