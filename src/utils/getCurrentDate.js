import dayjs from 'dayjs'

export const getCurrentDate = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export function obtenerFechaHora() {
  var fechaHoraActual = new Date();
  var fechaFormateada = fechaHoraActual.toLocaleDateString('es-ES', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');
  return fechaFormateada;
}