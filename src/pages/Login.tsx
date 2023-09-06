import axios from "../utils/axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

const Login = () => {
  const login = async (e: any) => {
    try {
      e.preventDefault();
      const body = {
        user: e.target.user.value,
        password: e.target.password.value,
      };
      const response = await axios.post("/users/login/", body);
      localStorage.setItem("user", JSON.stringify(response.data.response));
      window.location.href = "/";
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
          <button className="btn btn-secondary m-auto">Iniciar Sesión</button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
