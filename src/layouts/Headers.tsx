import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { NavLink, Outlet } from "react-router-dom";

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
  const changeColorSelect = (isActive: boolean): string => {
    const classCustom = isActive ? "bg-primary-subtle" : "bg-primary-active";
    return `link-underline link-underline-opacity-0 text-white w-100px rounded text-center `.concat(
      classCustom
    );
  };
  return (
    <div className="d-flex flex-column h-screen">
      <Navbar bg="primary" className="text-white mb-3">
        <div className="container">
          <div className="row m-auto">
            <div className="col-12">
              <h1 className="m-auto text-center">
                Instituto Tecnologico Superior de los Rios
              </h1>
            </div>
            <div
              className="col-12 d-flex justify-content-around mt-3"
              data-bs-theme="dark"
            >
              <NavLink
                to={"/"}
                className={({ isActive }) => changeColorSelect(isActive)}
              >
                Inicio
              </NavLink>
              <NavLink
                to={"/tesis"}
                className={({ isActive }) => changeColorSelect(isActive)}
              >
                Tesis
              </NavLink>
              <NavLink
                to={"/crear/tesis"}
                className={({ isActive }) => changeColorSelect(isActive)}
              >
                Crear tesis
              </NavLink>
            </div>
          </div>
        </div>
      </Navbar>
      <div className="flex-grow-1 d-flex">
        <Outlet />
      </div>
    </div>
  );
};
