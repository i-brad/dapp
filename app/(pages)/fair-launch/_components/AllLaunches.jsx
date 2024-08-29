import EmptyState from "@/app/components/EmptyState";
import { LoaderIcon } from "@/app/components/IconComponent";
import CollectionGrid from "@/app/components/collection/Grid/CollectionGrid";
import CollectionList from "@/app/components/collection/List/CollectionList";
import React, { useEffect, useState } from "react";

const AllLaunches = ({ viewType }) => {
  const [loading, setLoading] = useState(true);
  const [allLaunches, setAllLaunches] = useState([]);

  useEffect(() => {
    const getLaunches = async () => {
      try {
        const response = await fetch("/api/launch");
        if (response.ok) {
          const data = await response.json();
          setAllLaunches(data?.launches);
        }
      } catch (error) {
        console.error("failed to fetch launches", error);
      } finally {
        setLoading(false);
      }
    };

    getLaunches();
  }, []);

  return (
    <div className="py-3">
      {loading ? (
        <div className="h-full mt-4 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-32 text-white" />
        </div>
      ) : allLaunches?.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {viewType === 0 ? (
            <CollectionGrid data={allLaunches} />
          ) : (
            <CollectionList data={allLaunches} />
          )}
        </>
      )}
    </div>
  );
};

export default AllLaunches;
