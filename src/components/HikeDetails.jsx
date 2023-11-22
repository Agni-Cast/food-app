import { useState, useEffect } from "react";
import Modal from "react-modal";

function HikeDetails({
  hike,
  closeModal,
  parkSource,
  onSavedPage /*stateSource*/,
  stateSource,
  hikeState,
}) {
  // console.log("HIKEs: ", hikesResult);
  // console.log("HIKE DETAILS: ", hike);
  // console.log("onSAVED: ", onSavedPage);
  // console.log("summary: ", hike.shortdescription);
  return (
    <div className="hikeDetails">
      <div
        className="detailEntry"
        style={{ fontWeight: "bold", fontSize: "20px" }}
      >
        {hike.title}
      </div>
      {/* <div>park: {hike.relatedParks[0].fullName}</div> */}
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>Park:</span>{" "}
        <span>{parkSource}</span>
      </div>
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>State:</span>{" "}
        <span>{hikeState}</span>
      </div>
      <div className="detailEntry">
        {" "}
        <span style={{ fontWeight: "bold" }}>Summary:</span>{" "}
        <span>{hike.shortDescription}</span>
      </div>
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>Summary long:</span>{" "}
        <span>{hike.longDescription}</span>
      </div>
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>Duration:</span>{" "}
        <span>{hike.duration}</span>
      </div>
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>Pets:</span>{" "}
        <span>{hike.arePetsPermitted === "true" ? "Yes" : "No"}</span>
      </div>
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>Pets info:</span>{" "}
        <span>{hike.petsDescription}</span>
      </div>
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>Reservation:</span>
        <span>{hike.isReservationRequired === "true" ? "Yes" : "No"}</span>
      </div>
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>Fees:</span>{" "}
        <span>{hike.doFeesApply === "true" ? "Yes" : "No"}</span>
      </div>
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>Fee info:</span>{" "}
        <span>{hike.feeDescription}</span>
      </div>
      <div className="detailEntry">
        <span style={{ fontWeight: "bold" }}>Age:</span> <span>{hike.age}</span>
      </div>
      <button
        onClick={closeModal}
        style={{
          borderColor: "#094406",
          borderWidth: "1px",
          borderRadius: "20px",
          backgroundColor: "white",
          color: "#094406",
          fontSize: "18px",
          marginTop: "20px",
          marginBottom: "0px",
        }}
      >
        X Close
      </button>
      {/* <div>{hike.duration}</div> <button onClick={closeModal}>close</button> */}
    </div>
  );
}

export default HikeDetails;
