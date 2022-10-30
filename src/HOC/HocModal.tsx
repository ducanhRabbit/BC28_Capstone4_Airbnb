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
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
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
    </div>
  );
}
