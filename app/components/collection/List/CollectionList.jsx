import React from 'react'
import CollectionItem from './CollectionItem'

const CollectionList = ({category}) => {
  return (
    <>
        <div className="grid grid-cols-1 gap-4 mb-3">
            <CollectionItem/>
        </div>
    </>
  )
}

export default CollectionList
