import { redirect } from "react-router-dom";
const token = localStorage.getItem("user") || null;

//Esta autenticado, por lo tanto redirige a la ruta principal
export const isAuth = () => {
  if (token) {
    throw redirect("/");
  }
  return "";
};

//No esta autenticado, por lo tanto redirige al formulario de login
export const noAuth = () => {
  const token = localStorage.getItem("user") || null;
  if (!token) {
    throw redirect("/login");
  }
  return "";
};
