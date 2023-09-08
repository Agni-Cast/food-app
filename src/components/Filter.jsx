function Filter({ hikesResult, setHikesShown }) {
  console.log("HIKES RESULT FILTER: ", hikesResult);
  const handleFilterBy = (event) => {
    if (event.target.value === "pets") {
      setHikesShown(
        hikesResult.filter((hike) => {
          return hike.arePetsPermitted === "true";
        })
      );
    }
  };
  return (
    <div>
      Filter by:
      <select onChange={handleFilterBy}>
        <option value="park">Park</option>
        <option value="pets"> Pets</option>
      </select>
    </div>
  );
}

export default Filter;
