import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTextPage = ({ updateDataList }) => {
    const { id } = useParams();
    const [editedText, setEditedText] = useState('');
    const [fileName, setFileName] = useState(''); // fileNameのためのステートを追加
    const navigate = useNavigate();

    useEffect(() => {
        // IDに基づいて元のテキストとファイル名をロード
        const storedDataList = JSON.parse(localStorage.getItem('dataList') || '[]');
        const dataItem = storedDataList.find(item => item.id === id);
        if (dataItem) {
            setEditedText(dataItem.text); // ローカルステートにテキストを設定
            setFileName(dataItem.fileName); // ローカルステートにファイル名を設定
        }
    }, [id]);

    const handleSave = () => {
        // 編集内容をupdateDataListに渡して保存（ファイル名も含む）
        updateDataList(id, editedText, fileName); // updateDataListのシグネチャが変更される可能性があることに注意
        navigate('/');
        window.location.reload();
    };

    const backPage = () => {
        navigate('/');
        window.location.reload();
    }

    return (
        <div>
            <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className='w-10/12 ml-10 mt-10 p-3 border-slate-400 bg-white rounded-lg text-black text-xl'
            />
            <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className='w-10/12 m-10 p-3 border-slate-400 bg-white rounded-lg text-black text-2xl font-bold'
            />
            <div className='flex justify-center'>
            <button onClick={backPage} className='border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700'>戻る</button> 
            <button onClick={handleSave} className='border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700'>保存</button>
        </div>
        </div>
    );
};

export default EditTextPage;
