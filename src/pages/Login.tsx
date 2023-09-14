import { useState } from "react";
import axios from "../utils/axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Loader from "../assets/Loader";

const Login = () => {
  const [msg, setMsg] = useState({ err: "", succ: "" });
  const [pending, setPending] = useState(false);

  const login = async (e: any) => {
    setPending(true);
    try {
      e.preventDefault();
      const body = {
        user: e.target.user.value,
        password: e.target.password.value,
      };
      const response = await axios.post("/users/login/", body);
      localStorage.setItem("user", JSON.stringify(response.data.response));
      window.location.href = "/";
      setMsg({ err: "", succ: "Redirigiendo a inicio" });
    } catch (err) {
      setMsg({ succ: "", err: "Error contraseña o usuario incorrectos" });
    }
    setPending(false);
    setTimeout(() => {
      setMsg({ succ: "", err: "" });
    }, 1500);
  };
  return (
    <Container className="m-auto w-350px p-4 bg-primary rounded">
      <div>
        <h4 className="text-white text-center mb-3">Iniciar Sesión</h4>
      </div>
      <form onSubmit={login}>
        <div className="mb-3">
          <FloatingLabel
            controlId="floatingInput"
            label="Usuario"
            className="mb-3 text-primary"
          >
            <Form.Control type="email" placeholder="Usuario" name="user" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Contraseña"
            className="primary"
          >
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
            />
          </FloatingLabel>
        </div>
        <div className="d-flex">
          <button disabled={pending} className="btn btn-secondary m-auto">
            {pending ? <Loader /> : "Iniciar Sesión"}
          </button>
        </div>
        <div>
          {msg.err && <h5 className="text-danger text-center">{msg.err}</h5>}
          {msg.succ && <h5 className="text-success text-center">{msg.succ}</h5>}
        </div>
      </form>
    </Container>
  );
};

export default Login;
