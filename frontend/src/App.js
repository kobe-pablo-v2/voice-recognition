import React, { useEffect } from "react";
import axios from "axios";
import DataList from "./DataList";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditTextPage from './EditTextPage';

function App() {
    const [dataList, setDataList] = React.useState([]);
    const url = "http://127.0.0.1:8000";
	

    // ローカルストレージからデータリストを読み込む
    useEffect(() => {
        const storedDataList = localStorage.getItem("dataList");
        if (storedDataList) {
            setDataList(JSON.parse(storedDataList));
        }
    }, []);

    // データリストを更新し、ローカルストレージに保存する関数
    const updateDataList = (newdata) => {
        const updatedDataList = [newdata, ...dataList];
        setDataList(updatedDataList);
        localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    };

    const GetData = () => {
        axios.get(url).then((res) => {
            const newdata = { id: uuidv4(), text: res.data.text, delete: false, fileName: "sample1"};
            updateDataList(newdata);
        });
    };

    const GetData1 = () => {
        axios.get(url + "/sample1").then((res) => {
            const newdata = { id: uuidv4(), text: res.data.text, delete: false, fileName: "sample2",};
            updateDataList(newdata);
        });
    };

	// ローカルストレージのデータを削除するした後に更新する関数
	const Delete = () => {
		const filteredDataList = dataList.filter(item => !item.delete);
    setDataList(filteredDataList);
    localStorage.setItem("dataList", JSON.stringify(filteredDataList));
		window.location.reload();
	}


    return (
        <BrowserRouter>
            <div className="bg-cyan-950 w-screen h-screen">
                <header className="bg-blue-500 pb-2 text-white text-4xl font-bold">whisper(仮)</header>
                <div className="text-white text-2xl font-bold mt-3">出力内容</div>
                <button onClick={GetData} className="border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700">sample1</button>
                <button onClick={GetData1} className="border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700">sample2</button>
                <button onClick={Delete} className="border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700">削除</button>
                <Routes>
				<Route path="/" element={<DataList dataList={dataList} />} />
    			<Route path="/edit/:id" element={<EditTextPage />} /> {/* textId を id に変更 */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
