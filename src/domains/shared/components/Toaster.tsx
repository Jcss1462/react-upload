import { ToastContainer } from "react-toastify";

export const Toaster = () => {
  return <ToastContainer
    position="top-right"
    autoClose={5000}  // La notificación se cerrará después de 5 segundos
    hideProgressBar={false}  // Mostrar barra de progreso
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
};
