import React from "react";
import CollectionItem from "./CollectionItem";

const CollectionGrid = ({ data }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mb-3 py-4">
        {data.map((item) => (
          <CollectionItem key={item?._id} data={item} />
        ))}
      </div>
    </>
  );
};

export default CollectionGrid;
