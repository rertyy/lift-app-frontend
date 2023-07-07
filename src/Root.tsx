import { Outlet } from "react-router-dom";
import MainNav from "./MainNav.tsx";

export default function Root() {
  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
}
