import React from 'react'

const DataList = ({dataList}) => {

   return dataList.map((data) => {
      return (
        <div key={data.id} className="text-white text-2xl font-bold mt-3">
          {data.text}
        </div>
      )
      })
}

export default DataList