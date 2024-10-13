import axios from "axios";

export interface AxiosError {
  message: string;
  status: number;
}

export function getHttpErrorHandler(error: any): AxiosError {
  let errorMessage = "Ha ocurrido un error inesperado";
  let errorCode = 500;

  if (axios.isAxiosError(error)) {
    const response = error?.response;
    const request = error?.request;

    if (error.code === "ERR_NETWORK") {
      errorMessage = "No hay conexión a internet";
      errorCode = 503;
    } else if (error.code === "ERR_CANCELED") {
      errorMessage = "La petición fue cancelada";
      errorCode = 499;
    } else if (response) {
      errorMessage = response.data.message;
      errorCode = response.status;
    } else if (request) {
      errorMessage = "No se recibió respuesta del servidor";
      errorCode = 408;
    }
  } else {
    errorMessage = error.message;
    errorCode;
  }

  // Lanzar el error con el mensaje adecuado
  return {
    message: errorMessage,
    status: errorCode,
  };
}
