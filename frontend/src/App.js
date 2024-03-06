import React, { useEffect, useState } from "react";
import axios from "axios";
import DataList from "./DataList";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditTextPage from './EditTextPage';

function App() {
    const [dataList, setDataList] = useState([]);
    const [files, setFiles] = useState([]);
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

    const updateEditDataList = (id, newText, newFileName) => {
        const dataList = JSON.parse(localStorage.getItem('dataList') || '[]');
        const updatedDataList = dataList.map(item => {
        if (item.id === id) {
            return { ...item, text: newText, fileName: newFileName };
        }
        return item;
        });
        localStorage.setItem('dataList', JSON.stringify(updatedDataList));
    };

    useEffect(() => {
        const fetchFiles = async () => {
        const response = await fetch('http://localhost:8000/files');
        const data = await response.json();
        setFiles(data);
        };
    
        fetchFiles();
    }, []);

    const outPut = (fileName) => {
        axios.get(`${url}/text/${fileName}`).then((res) => {
            const newdata = { id: uuidv4(), text: res.data.text, delete: false, fileName: fileName };
            updateDataList(newdata);
        }).catch(error => {
            console.error("Error fetching the text:", error);
        });
    };

    return (
        <BrowserRouter>
            <div className="bg-slate-100 w-screen h-screen static">
            <header className="flex justify-center bg-teal-500 brightness-95 p-2 border-b-8 border-b-cyan-950 text-white text-4xl font-bold">whisper(仮)</header>
            <div className="fixed left-10 right-0">
            <div className="text-black text-2xl font-bold ml-10 size-fit fixed top-20 left-10 right-0">出力内容</div>
            <button onClick={Delete} className="ml-36 mt-4 border border-gray-300 rounded-md px-2 py-1 bg-blue-500 text-white hover:bg-blue-700 grid ">削除</button>
            <Routes>
			<Route path="/" element={<DataList dataList={dataList}  setDataList={setDataList}/>} />
            <Route path="/edit/:id" element={<EditTextPage updateDataList={updateEditDataList} />} />
            </Routes>
            <div className="text-2xl font-bold ml-10">ファイル一覧</div>
            <div className="w-10/12 ml-10 mt-5 mb-10 bg-white rounded-lg">
            <ul>
            {files.map(file => (
            <li key={file.id} className="text-2xl font-bold ml-8">
            {file.name}
            <button onClick={() => outPut(file.name.replace('.wav', ''))} className="border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700">出力</button>
            </li>
            ))}
            </ul>
            </div>
            </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
