import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Header } from "../layouts/Headers";
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
      <Route element={<Header />}>
        <Route loader={isAuth} path="login" index element={<Login />} />
      </Route>
      <Route element={<Header />}>
        <Route index element={<Home />} />
        <Route path="tesis" element={<BuscarTesis />} />
        <Route path="admin">
          <Route
            path="administrar-carreras"
            element={<ModificarCarreras />}
            loader={noAuth}
          />
          <Route
            path="administrar-alumnos"
            element={<ModificarAlumnos />}
            loader={noAuth}
          />
          <Route
            path="administrar-categorias"
            element={<ModificarCategorias />}
            loader={noAuth}
          />
          <Route
            path="administrar-opciones"
            element={<ModificarOpciones />}
            loader={noAuth}
          />
          <Route path="crear-tesis" element={<CrearTesis />} loader={noAuth} />
        </Route>
        <Route path="tesis/:idtesis" element={<Tesis />} />
      </Route>
    </Route>
  )
);

export default router;
