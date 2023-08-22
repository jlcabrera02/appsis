export const formatFechaLocale = (date: Date) =>
  new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60000);

export const formatFecha = (date: Date) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
  }).format(
    new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60000)
  );

export const formatDinero = (monto: number) =>
  Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(monto);

export const formatMes = (date: Date, convert: boolean = false) =>
  new Intl.DateTimeFormat("es-MX", {
    month: "long",
  }).format(
    new Date(
      convert
        ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
        : date
    )
  );
export const formatYear = (date: Date) =>
  new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
  }).format(new Date(date));

export const obtenerDiaMes = (date: Date) =>
  new Date(
    new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
  ).getDate();

export const formatTextoMayusPrimeraLetra = (string: string) => {
  string = string.toLocaleLowerCase();
  const primeraLetra = string.charAt(0).toLocaleUpperCase();
  const textoEntero = string
    .replace(/\s\w|[á,é,ó,í,ú,ñ]/g, (math) => math.toLocaleUpperCase())
    .slice(1);
  return primeraLetra + textoEntero;
};

export const formatFechaComplete = (date: Date, convert: boolean = false) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(
    new Date(
      convert
        ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
        : date
    )
  );
export const formatHourMinute = (date: Date, convert: boolean = false) =>
  new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(
    new Date(
      convert
        ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
        : date
    )
  );
export const formatHours = (date: Date, convert: boolean = false) =>
  new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    // hour12: true,
    hourCycle: "h12",
  }).format(
    new Date(
      convert
        ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
        : date
    )
  );

export const formatFechaDB = (date: Date) => {
  const f = new Date(date);
  const d = f.getDate();
  const m = f.getMonth();
  const y = f.getFullYear();
  const now = new Date(y, m, d).toISOString().split("T")[0];
  return now;
};
