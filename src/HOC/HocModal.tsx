import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configStore";

type Props = {};

export default function HocModal({}: Props) {
  // const {} = useSelector(state :RootS => state.modalReducer);
  let { Component, title } = useSelector(
    (state: RootState) => state.modalReducer
  );
  return (
    <div>
      {/* Modal trigger button */}
      {/* <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target={"#modal"}
      >
        Launch
      </button> */}
      {/* Modal Body */}
      {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
      <div
        className="modal fade"
        id="modal"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <Component />
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Place to the bottom of scripts */}
    </div>
  );
}
