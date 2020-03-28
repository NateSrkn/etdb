import React, { useEffect, useState } from 'react'
import { ListCard } from './ListCard'
import { call } from '../api/apiCall'
import { FETCH_BULK_ENDPOINT, FETCH_LATEST_ENDPOINT } from '../api/endpoints'

export const ScrollList = ({ type, isLatest }) => {
  let [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      let options = {
        base: {
          url: isLatest ? FETCH_LATEST_ENDPOINT(type) : FETCH_BULK_ENDPOINT(type),
          method: 'get'
        }
      }
      const result = await call(options)
      setData(result)
    }

    fetchData()
  }, [type, isLatest])

  return (
    <div className="scroll-list">
      {data ? 
        data.results.map((item, index) => (
          <ListCard type={type} data={item} key={index} />
        )) 
      : null}
    </div>
  )
}