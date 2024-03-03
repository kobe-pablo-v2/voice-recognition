import React from 'react'
import { useNavigate } from 'react-router-dom';

const DataList = ({ dataList }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className='w-10/12 ml-10 my-10 border-slate-400 bg-white border border-4 rounded-lg'>
      {dataList.map((data) => (
        <div key={data.id} className="w-10/12 text-2xl font-bold my-3">
          <input type="checkbox" className='size-4 m-2'></input>
          {data.fileName}
          <button onClick={() => handleEdit(data.id)} className='border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700'>編集</button>
        </div>
      ))}
    </div>
  );
};


export default DataList