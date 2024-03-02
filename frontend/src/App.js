import React from "react";
import axios from "axios";
import DataList from "./DataList";
import { v4 as uuidv4 } from "uuid";

function App() {
	//const [data, setData] = React.useState();
	const [dataList, setDataList] = React.useState([]);
	const url = "http://127.0.0.1:8000";

	const GetData = () => {
		axios.get(url).then((res) => {
			const newdata = { id: uuidv4(), text: res.data.text, delete: false };
			setDataList([newdata, ...dataList]);
		});
	};
	
	const GetData1 = () => {
		axios.get(url + "/sample1").then((res) => {
			const newdata = { id: uuidv4(), text: res.data.text, delete: false };
			setDataList([newdata, ...dataList]);
		});
	};
	return (
		<div className="bg-cyan-950 w-screen h-screen">
			<header 
			className="bg-blue-500 pb-2 text-white text-4xl font-bold"
				>whisper(仮)</header>
			<div 
			className="text-white text-2xl font-bold mt-3"
				>出力内容</div>
			<button 
			onClick={GetData}
			className="border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700"
			>データを出力</button>
			<button 
			onClick={GetData1}
			className="border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700"
			>データを出力</button>

			{/*データリスト*/}
			<DataList dataList={dataList}/>
		</div>
	);
}

export default App;