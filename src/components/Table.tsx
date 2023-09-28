import DataTable from "react-data-table-component";
import useGetData from "../hooks/useGetData";
import { formatFechaComplete } from "../utils/formats";
import { useState } from "react";
import { Link } from "react-router-dom";

const customStyles = {
  headCells: {
    style: {
      textAlign: "center",
      color: "#fff",
      backgroundColor: "#0f0f55",
      fontSize: "15px",
      fontWeight: "bold",
      textWrap: "nowrap",
    },
  },
};

const opcionesPaginacion = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

interface Filtros {
  titulo?: string;
  idcarrera?: string;
  idcategoria?: string;
}

interface Props {
  filtros?: Filtros;
}

export const TableShowTesis = ({ filtros }: Props) => {
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
  const { data, isPending } = useGetData({
    baseUrl: `tesis/obtener?limit=${pagination.limit}&offset=${
      pagination.offset
    }&titulo=${filtros?.titulo ?? ""}&idcarrera=${
      filtros?.idcarrera ?? ""
    }&idcategoria=${filtros?.idcategoria ?? ""}`,
  });
  const res = data ? data["response"] : { count: 0, rows: [] };

  const handleRowsTable = (newLimit: number, newOffset: number) => {
    const convertOffset = newOffset === 1 ? 0 : newOffset - 1;
    // console.log(convertOffset * newLimit);
    setPagination({ offset: convertOffset * newLimit, limit: newLimit });
  };

  const handlePage = (offset: number) => {
    const convertOffset = offset === 1 ? 0 : offset - 1;
    // console.log(convertOffset * newLimit);
    setPagination({ ...pagination, offset: convertOffset * pagination.limit });
  };

  const columns = [
    {
      name: "Titulo",
      selector: (row: any) => row["titulo"],
      wrap: true,
      center: true,
      style: {
        fontWeight: "bold",
        textAlign: "center",
        padding: "10px 0 10px 15px",
      },
    },
    {
      name: "Autor(es)",
      selector: (row: any) => row.autor,
      center: true,
      hide: 599,
      style: {
        textAlign: "center",
      },
    },
    {
      name: "Carrera",
      selector: (row: any) => row.carrera,
      center: true,
      hide: 599,
    },
    {
      name: "Institución",
      selector: (row: any) => row.institucion,
      center: true,
      hide: 599,
      wrap: true,
      style: {
        textAlign: "center",
      },
    },
    {
      name: "Fecha de creación",
      selector: (row: any) => row.createdAt,
      center: true,
      format: (row: any) => formatFechaComplete(row.createdAt),
      hide: 599,
    },
    {
      cell: (row: any) => (
        <Link to={row.endpoint} className="btn btn-secondary" role="button">
          <i className="fa-solid fa-eye "></i>
        </Link>
      ),
      compact: true,
      width: "100px",
      selector: (row: any) => row.ver,
      center: true,
    },
  ];

  const rows = res["rows"].map(
    ({ id, titulo, autores, Carrera, institucion, createdAt }: any) => ({
      titulo,
      createdAt,
      institucion,
      carrera: Carrera["carrera"],
      autor: autores.map((autor: any) => autor.nombre).join(","),
      endpoint: `/tesis/${id}`,
    })
  );

  const NoData = () => {
    return <h1 className="text-primary">Sin datos</h1>;
  };

  return (
    <DataTable
      columns={columns}
      data={rows}
      customStyles={customStyles}
      pagination
      paginationServer
      progressPending={isPending}
      noDataComponent={<NoData />}
      paginationTotalRows={res.count}
      onChangePage={handlePage}
      onChangeRowsPerPage={handleRowsTable}
      paginationComponentOptions={opcionesPaginacion}
    ></DataTable>
  );
};
