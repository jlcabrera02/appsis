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
import { ModificarCarreras } from "../pages/ModificarCarreras";
import { ModificarCategorias } from "../pages/ModificarCategorias";
import { ModificarOpciones } from "../pages/ModificarOpciones";
import { ModificarAlumnos } from "../pages/ModificarAlumnos";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<HeaderLogin />}>
        <Route loader={isAuth} path="login" index element={<Login />} />
      </Route>
      <Route element={<Header />}>
        <Route index element={<Home />} />
        <Route path="tesis" element={<BuscarTesis />} />
        <Route
          path="carreras"
          element={<ModificarCarreras />}
          loader={noAuth}
        />
        <Route path="alumnos" element={<ModificarAlumnos />} loader={noAuth} />
        <Route
          path="categorias"
          element={<ModificarCategorias />}
          loader={noAuth}
        />
        <Route
          path="opciones"
          element={<ModificarOpciones />}
          loader={noAuth}
        />
        <Route path="tesis/:idtesis" element={<Tesis />} />
        <Route path="crear/tesis" element={<CrearTesis />} loader={noAuth} />
      </Route>
    </Route>
  )
);

export default router;
