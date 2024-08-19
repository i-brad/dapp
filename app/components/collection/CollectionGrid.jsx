import React from 'react'
import CollectionItem from './CollectionItem'

const CollectionGrid = ({category}) => {
  return (
    <>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mb-3">
            <CollectionItem/>
        </div>
    </>
  )
}

export default CollectionGrid
