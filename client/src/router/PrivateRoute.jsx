import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  // sementara auth dimatiin → langsung render
  return <Outlet />;
}
