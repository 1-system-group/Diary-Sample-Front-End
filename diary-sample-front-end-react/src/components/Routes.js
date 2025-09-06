import { Route, Routes } from "react-router-dom"
import Manage from "./Manage/Index"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/Manage" element={<Manage />}/>
    </Routes>
  );
}

export default AppRoutes;
