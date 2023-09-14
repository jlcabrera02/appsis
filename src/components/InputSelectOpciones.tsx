import { useState } from "react";
// import Select from "react-select";
import useGetData from "../hooks/useGetData";
import Select from "react-select";
// import axios from "../utils/axios";

const InputSelectOpciones = ({ name }: { name: string }) => {
  const { data, isPending } = useGetData({ baseUrl: "opciones/obtener" });
  const carreras = data ? data["response"] : [];

  const options = carreras.map((opcion) => ({
    label: opcion["opcion"],
    id: opcion["id"],
    value: opcion["id"],
  }));

  return (
    <Select
      options={options}
      isClearable
      name={name}
      placeholder="Seleciona una opción"
      isLoading={isPending}
      className="w-100"
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#1b396b",
          neutral20: "#1b396b",
        },
        spacing: {
          ...theme.spacing,
          controlHeight: 50,
        },
      })}
    />
  );
};

export const InputSelecOpcionesOrCreate = ({
  name,
  placeholder,
  handle,
  value,
}: {
  name: string;
  placeholder: string;
  handle: (event: any) => void;
  value: any;
}) => {
  const [updateOptions] = useState(false);
  const { data, isPending } = useGetData({
    baseUrl: "opciones/obtener",
    actualizador: updateOptions,
  });
  const opciones = data ? data["response"] : [];

  const options = opciones.map((opcion) => ({
    label: opcion["opcion"],
    opcion: opcion["opcion"],
    id: opcion["id"],
    value: opcion["id"],
  }));

  const change = (e: object) => {
    handle({ target: { name, value: e } });
  };

  return (
    <div style={{ minWidth: "200px" }}>
      <Select
        placeholder={placeholder}
        options={options}
        isLoading={isPending}
        name={name}
        value={value[name] || []}
        onChange={change}
        isDisabled={isPending}
        required
      />
    </div>
  );
};

export default InputSelectOpciones;
