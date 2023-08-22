import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Header, HeaderLogin } from "../layouts/Headers";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { isAuth, noAuth } from "../utils/isAuth";
import Tesis from "../pages/Tesis";
import BuscarTesis from "../pages/BuscarTesis";
import { CrearTesis } from "../pages/CrearTesis";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<HeaderLogin />}>
        <Route loader={isAuth} path="login" index element={<Login />} />
      </Route>
      <Route element={<Header />}>
        <Route index element={<Home />} />
        <Route path="tesis" element={<BuscarTesis />} />
        <Route path="tesis/:idtesis" element={<Tesis />} />
        <Route
          path="crear/tesis"
          element={<CrearTesis />} /* loader={noAuth}  */
        />
      </Route>
    </Route>
  )
);

export default router;
