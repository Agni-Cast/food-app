import { useState, useEffect } from "react";
import Modal from "react-modal";

function HikeDetails({
  hike,
  closeModal,
  parkSource,
  onSavedPage /*stateSource*/,
}) {
  // console.log("HIKEs: ", hikesResult);
  // console.log("HIKE DETAILS: ", hike);
  // console.log("onSAVED: ", onSavedPage);
  // console.log("summary: ", hike.shortdescription);
  return (
    <div>
      <div>{hike.title}</div>
      {/* <div>state: {stateSource}</div> */}
      {/* <div>park: {hike.relatedParks[0].fullName}</div> */}
      <div>park: {parkSource}</div>
      <div>
        summary: {onSavedPage ? hike.shortdescription : hike.shortDescription}
      </div>
      <div>
        summary_long:{" "}
        {onSavedPage ? hike.longdescription : hike.longDescription}
      </div>
      <div>duration: {hike.duration}</div>
      <div>
        pets: {onSavedPage ? hike.arepetspermitted : hike.arePetsPermitted}
      </div>
      <div>
        pets_info: {onSavedPage ? hike.petsdescription : hike.petsDescription}
      </div>
      <div>
        reservation:{" "}
        {onSavedPage ? hike.isreservationrequired : hike.isReservationRequired}
      </div>
      <div>fee: {onSavedPage ? hike.dofeesapply : hike.doFeesApply}</div>
      <div>
        fee_info: {onSavedPage ? hike.feedescription : hike.feeDescription}
      </div>
      <div> age: {hike.age}</div>
      <button onClick={closeModal}>close</button>
      {/* <div>{hike.duration}</div> <button onClick={closeModal}>close</button> */}
    </div>
  );
}

export default HikeDetails;
