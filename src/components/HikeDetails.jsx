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
    <div>
      <div>{hike.title}</div>
      {/* <div>park: {hike.relatedParks[0].fullName}</div> */}
      <div>park: {parkSource}</div>
      <div>state: {hikeState}</div>
      <div>summary: {hike.shortDescription}</div>
      <div>summary_long: {hike.longDescription}</div>
      <div>duration: {hike.duration}</div>
      <div>pets: {hike.arePetsPermitted}</div>
      <div>pets_info: {hike.petsDescription}</div>
      <div>reservation: {hike.isReservationRequired}</div>
      <div>fee: {hike.doFeesApply}</div>
      <div>fee_info: {hike.feeDescription}</div>
      <div> age: {hike.age}</div>
      <button onClick={closeModal}>close</button>
      {/* <div>{hike.duration}</div> <button onClick={closeModal}>close</button> */}
    </div>
  );
}

export default HikeDetails;
