import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  position: "top-right",
  autoClose: 1500,
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
  return toast.success(text, options);
}
