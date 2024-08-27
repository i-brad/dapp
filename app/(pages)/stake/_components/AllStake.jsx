import EmptyState from "@/app/components/EmptyState";
import { LoaderIcon } from "@/app/components/IconComponent";
import CollectionGrid from "@/app/components/stake/Grid/CollectionGrid";
import CollectionList from "@/app/components/stake/List/CollectionList";
import React, { useEffect, useState } from "react";

const AllStake = ({ viewType }) => {
  const [loading, setLoading] = useState(true);
  const [allStakes, setAllStakes] = useState([]);

  useEffect(() => {
    const getStakes = async () => {
      try {
        const response = await fetch("/api/stake");
        if (response.ok) {
          const data = await response.json();
          setAllStakes(data?.stakes);
        }
      } catch (error) {
        console.error("failed to fetch stakes", error);
      } finally {
        setLoading(false);
      }
    };

    getStakes();
  }, []);

  return (
    <div className="py-3">
      {loading ? (
        <div className="h-full mt-4 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-32 text-white" />
        </div>
      ) : allStakes?.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {viewType === 0 ? (
            <CollectionGrid data={allStakes} />
          ) : (
            <CollectionList data={allStakes} />
          )}
        </>
      )}
    </div>
  );
};

export default AllStake;
