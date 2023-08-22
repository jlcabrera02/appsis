import { useState } from "react";
import Select from "react-select";
import useGetData from "../hooks/useGetData";
import CreatableSelect from "react-select/creatable";
import axios from "../utils/axios";

const InputSelectCarreras = ({ name }: { name: string }) => {
  const { data, isPending } = useGetData({ baseUrl: "carreras/obtener" });
  const carreras = data ? data["response"] : [];

  const options = carreras.map((carrera) => ({
    label: carrera["carrera"],
    id: carrera["id"],
    value: carrera["id"],
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

export const InputSelectCarrerasOrCreate = ({
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
  const [updateOptions, setUpdateOptions] = useState(false);
  const { data, isPending } = useGetData({
    baseUrl: "carreras/obtener",
    actualizador: updateOptions,
  });
  const carreras = data ? data["response"] : [];

  const options = carreras.map((carrera) => ({
    label: carrera["carrera"],
    carrera: carrera["carrera"],
    id: carrera["id"],
    value: carrera["id"],
  }));

  const handleCreate = async (carrera: string) => {
    try {
      await axios.post("/carreras/crear", { carrera });
      setUpdateOptions(!updateOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const change = (e: object) => {
    handle({ target: { name, value: e } });
  };

  return (
    <div style={{ minWidth: "200px" }}>
      <CreatableSelect
        placeholder={placeholder}
        formatCreateLabel={(newOption) => (
          <span>
            <span className="fw-bold">Crear: </span>
            <span className="bg-secondary rounded px-1">{newOption}</span>
          </span>
        )}
        options={options}
        isLoading={isPending}
        name={name}
        onCreateOption={handleCreate}
        value={value[name] || []}
        onChange={change}
        isDisabled={isPending}
        required
      />
    </div>
  );

  /*  return (
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
  ); */
};

export default InputSelectCarreras;
