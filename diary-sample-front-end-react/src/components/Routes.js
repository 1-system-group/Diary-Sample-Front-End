import { Route, Routes } from "react-router-dom"
import Manage from "./Manage/Index"
import NewEntry from "./Manage/NewEntry"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/Manage" element={<Manage />}/>
      <Route path="/NewEntry" element={<NewEntry />}/>
    </Routes>
  );
}

export default AppRoutes;
