import { useNavigate } from "react-router-dom";

const BtnBack = ({ className, to }: { className?: string; to?: string }) => {
  const navigate = useNavigate();
  const regresar = () => {
    if (to) {
      navigate(to);
      return;
    }
    navigate(-1);
  };
  return (
    <button className={`btn btn-primary mt-2 ${className}`} onClick={regresar}>
      <i className="fa-solid fa-circle-left me-1" />
      Regresar
    </button>
  );
};

export default BtnBack;
