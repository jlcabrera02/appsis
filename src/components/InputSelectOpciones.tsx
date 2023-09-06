import { useState } from "react";
// import Select from "react-select";
import useGetData from "../hooks/useGetData";
import Select from "react-select";
// import axios from "../utils/axios";

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
