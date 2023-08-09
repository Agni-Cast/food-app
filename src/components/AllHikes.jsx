import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AllHikes({ hike }) {
  return (
    <div onClick={useNavigate("details")} style={{ padding: "10px" }}>
      <div style={{ fontSize: "20px" }}>{hike.title}</div>
      <div>at</div>
      {/* <div>{hike.relatedParks[0].fullName}</div> */}
    </div>
  );
}

export default AllHikes;
