import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  closeButton: false,
};

export function failureToast(message) {
  let text = "😞 " + message;
  return toast.error(text, options);
}

export function successToast(message) {
  let text = "😊 " + message;
  return toast.success(message, options);
}
