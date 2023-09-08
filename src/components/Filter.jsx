function Filter({ hikeResult }) {
  return (
    <div>
      Filter by:
      <select>
        <option value="park">Park</option>
        <option value="duration"> Duration</option>
      </select>
    </div>
  );
}

export default Filter;
