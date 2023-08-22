import { useState } from "react";
// import Select from "react-select";
import useGetData from "../hooks/useGetData";
import CreatableSelect from "react-select/creatable";
import axios from "../utils/axios";

export const InputSelectCategoriasOrCreate = ({
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
    baseUrl: "categorias/obtener",
    actualizador: updateOptions,
  });
  const categorias = data ? data["response"] : [];

  const options = categorias.map((categoria) => ({
    label: categoria["categoria"],
    categoria: categoria["categoria"],
    id: categoria["id"],
    value: categoria["id"],
  }));

  const handleCreate = async (categoria: string) => {
    try {
      await axios.post("/categorias/crear", { categoria });
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
};
