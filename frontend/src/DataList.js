import React from 'react';
import { useNavigate } from 'react-router-dom';

const DataList = ({ dataList, setDataList }) => { // setDataList 関数を props として受け取る
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleToggleDelete = (id) => {
    const updatedDataList = dataList.map((data) => {
      if (data.id === id) {
        // delete プロパティの値を反転
        return { ...data, delete: !data.delete };
      }
      return data;
    });

    // 更新された dataList をステートに設定
    setDataList(updatedDataList);

    // 必要に応じて、更新された dataList をローカルストレージに保存
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
  };

  return (
    <div className='w-10/12 ml-10 my-10 border-slate-400 bg-white border border-4 rounded-lg'>
      {dataList.map((data) => (
        <div key={data.id} className="flex items-center text-2xl font-bold my-3">
          <input
            type="checkbox"
            checked={data.delete}
            onChange={() => handleToggleDelete(data.id)}
            className='size-4 m-2'
          />
          {data.fileName}
          <button onClick={() => handleEdit(data.id)} className='border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700'>編集</button>
        </div>
      ))}
    </div>
  );
};

export default DataList;
