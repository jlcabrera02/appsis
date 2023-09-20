import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { token } from "../utils/axios";
import tecnm from "../assets/tecnm_blanco.png";
import itsr from "../assets/itsr.png";

export const HeaderLogin = () => {
  return (
    <div className="d-flex flex-column h-screen">
      <Navbar bg="primary" className="text-white">
        <Container>
          <h1 className="m-auto text-center">
            Instituto Tecnologico Superior de los Rios
          </h1>
        </Container>
      </Navbar>
      <div className="flex-grow-1 d-flex">
        <Outlet />
      </div>
    </div>
  );
};

export const Header = () => {
  const [showNavigation, setShowNavigation] = useState(true);
  return (
    <div className="d-flex">
      <NavigationBar stateshow={[showNavigation, setShowNavigation]} />

      <div className="flex-grow-1 d-flex flex-column">
        <Navbar bg="primary" className="text-white mb-0">
          <div className="container">
            <div>
              <button
                className={`hamburger hamburger--collapse bg-primary ${
                  showNavigation ? "is-active" : ""
                }`}
                type="button"
                onClickCapture={() => setShowNavigation(!showNavigation)}
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
            <div className="row m-auto w-100">
              <div className="col-12 ">
                <h1 className="m-auto text-center d-flex justify-content-between gap-3">
                  <img src={tecnm} alt="tecnm" className="h-50px" />
                  <span className="d-none d-sm-inline-block">
                    Instituto Tecnologico Superior de los Ríos
                  </span>
                  <span className="d-sm-none fs-6">
                    Instituto Tecnologico Superior de los Rios
                  </span>
                  <img src={itsr} alt="tecnm" className="h-50px" />
                </h1>
              </div>
            </div>
          </div>
        </Navbar>

        <div className="flex-grow-1 d-flex">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const NavigationBar = ({ stateshow }: any) => {
  const [showNavigation] = stateshow;
  const [showAdminNav, setShowAdminNav] = useState(false);
  const changeColorSelect = (isActive: boolean): string => {
    const classCustom = isActive ? "bg-btn-nav" : "bg-btn-nav-active";
    return `text-decoration-none text-white w-100 rounded text-start p-1 px-2 `.concat(
      classCustom
    );
  };

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div
      className={`border bg-primary bg-opacity-100 border-0 h-screen position-sticky top-0 ${
        showNavigation ? "" : "d-none"
      }`}
    >
      <Navbar bg="primary" className="text-white mb-0">
        <div className="w-100">
          <p className="fs-2 text-center">Menu</p>
        </div>
      </Navbar>
      <nav>
        <ul className="mb-0 px-3 list-unstyled">
          <li className="d-flex m-2">
            <NavLink
              to={"/"}
              className={({ isActive }) => changeColorSelect(isActive)}
            >
              <i className="fa-solid fa-home m-0" />
              <span className="ms-2 d-none d-sm-inline-block">Inicio</span>
            </NavLink>
          </li>
          <li className="d-flex m-2">
            <NavLink
              to={"/tesis"}
              className={({ isActive }) => changeColorSelect(isActive)}
            >
              <i className="fa-solid fa-search" />{" "}
              <span className="ms-2 d-none d-sm-inline-block">Buscador</span>
            </NavLink>
          </li>
          {token && (
            <li className="d-flex m-2 flex-column">
              <span
                className={`d-flex justify-content-between gap-1 align-items-center text-white p-1 px-2 text-white rounded bg-btn-nav-active`}
                onClick={() => setShowAdminNav(!showAdminNav)}
                role="button"
              >
                <i className="fa-solid fa-gears  fs-6" />{" "}
                <span className="ms-2 d-none d-sm-inline-block">
                  Administrador
                </span>{" "}
                <i
                  className={`fa-solid fa-arrow-${
                    showAdminNav ? "down" : "right"
                  } me-2`}
                />
              </span>
              <div className="bg-opacity-25 rounded">
                <ul
                  className={`list-unstyled ps-4 mt-1 w-100 ${
                    showAdminNav ? "d-inline-block" : "d-none"
                  }`}
                >
                  <li className="d-flex my-1">
                    <NavLink
                      to={"admin/crear-tesis"}
                      className={({ isActive }) => changeColorSelect(isActive)}
                    >
                      <i className="fa-solid fa-pencil" />
                      <span className="ms-2 d-none d-sm-inline-block">
                        Registrar tesis
                      </span>
                    </NavLink>
                  </li>
                  <li className="d-flex my-1">
                    <NavLink
                      to={"admin/administrar-carreras"}
                      className={({ isActive }) => changeColorSelect(isActive)}
                    >
                      <i className="fa-solid fa-chalkboard-user" />{" "}
                      <span className="ms-2 d-none d-sm-inline-block">
                        Carreras
                      </span>
                    </NavLink>
                  </li>
                  <li className="d-flex my-1">
                    <NavLink
                      to={"admin/administrar-categorias"}
                      className={({ isActive }) => changeColorSelect(isActive)}
                    >
                      <i className="fa-solid fa-chart-simple me-2" />{" "}
                      <span className="ms-2 d-none d-sm-inline-block">
                        Categorías
                      </span>
                    </NavLink>
                  </li>
                  <li className="d-flex my-1">
                    <NavLink
                      to={"admin/administrar-opciones"}
                      className={({ isActive }) => changeColorSelect(isActive)}
                    >
                      <i className="fa-solid fa-list me-2" />{" "}
                      <span className="ms-2 d-none d-sm-inline-block">
                        Opciones
                      </span>
                    </NavLink>
                  </li>
                  <li className="d-flex my-1">
                    <span
                      className={`d-flex justify-content-between gap-1 align-items-center text-white p-1 px-2 text-white rounded bg-btn-nav-active`}
                      onClick={cerrarSesion}
                      role="button"
                    >
                      <i className="fa-solid fa-power-off me-2" />{" "}
                      <span className="ms-2 d-none d-sm-inline-block">
                        Cerrar sesión
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          )}
          {!token && (
            <li className="d-flex m-2">
              <NavLink
                to={"/login"}
                className={({ isActive }) => changeColorSelect(isActive)}
              >
                <i className="fa-solid fa-user " />{" "}
                <span className="ms-2 d-none d-sm-inline-block">Login</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
