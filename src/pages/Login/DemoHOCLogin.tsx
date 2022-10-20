import React from "react";
import { useDispatch } from "react-redux";
import HocModal from "../../HOC/HocModal";
// import HocModal from "../../HOC/HocModal";
import ModalHOC from "../../HOC/ModalHOC";
import { AppDispatch } from "../../redux/configStore";
import { setModalAction } from "../../redux/reducers/modalReducer";
import Register from "../Register/Register";
import Loign from "./Login";

type Props = {};

let WrapFormLoginModal = ModalHOC(Register, "idModal");
export default function DemoHOCLogin({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div>
      <HocModal />
      <button
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target={"#modal"}
        onClick={() => {
          let action = setModalAction({
            Component: Loign,
            title: "Login",
          });
          dispatch(action);
        }}
      >
        Create{" "}
      </button>
      {/* <HocModal Component={Loign} title="stirng1" /> */}
    </div>
  );
}
