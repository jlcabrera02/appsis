interface Props {
  handle?: (params: any) => void;
  placeholder?: string;
  name?: string;
  value?: Record<string, any>;
}

export interface PropsMunicipios extends Props {
  estado:
    | "Aguascalientes"
    | "Baja California"
    | "Baja California Sur"
    | "Campeche"
    | "Coahuila"
    | "Colima"
    | "Chiapas"
    | "Chihuahua"
    | "Ciudad de Mexico"
    | "Durango"
    | "Guanajuato"
    | "Guerrero"
    | "Hidalgo"
    | "Jalisco"
    | "Estado de Mexico"
    | "Michoacan"
    | "Morelos"
    | "Nayarit"
    | "Nuevo Leon"
    | "Oaxaca"
    | "Puebla"
    | "Queretaro"
    | "Quintana Roo"
    | "San Luis Potosi"
    | "Sinaloa"
    | "Sonora"
    | "Tabasco"
    | "Tamaulipas"
    | "Tlaxcala"
    | "Veracruz"
    | "Yucatan"
    | "Zacatecas";
}

export default Props;
