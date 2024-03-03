import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditTextPage = () => {
    const { id } = useParams(); // URLからidを取得
    const [text, setText] = useState('');

    useEffect(() => {
        // ここでidに基づいてデータを検索
        // 例: ローカルストレージまたはアプリケーションの状態から検索
        const storedDataList = JSON.parse(localStorage.getItem('dataList') || '[]');
        const dataItem = storedDataList.find(item => item.id === id);
        if (dataItem) {
            setText(dataItem.text); // 検索したデータのテキストを設定
        }
    }, [id]); // 依存配列にidを追加

    return (
        <div className='w-10/12 h-4/6 ml-10 mt-10 border-slate-400 bg-white border border-4 rounded-lg'>
            <div className='m-5 text-3xl font-semibold'>
                {text}
            </div>
        </div>
    );
};

export default EditTextPage;
