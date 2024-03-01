import React from "react";
import axios from "axios";

function App() {
	const [data, setData] = React.useState<{ text?: string }>();
	const url = "http://127.0.0.1:8000";

	const GetData = () => {
		axios.get(url).then((res) => {
			setData(res.data);
		});
	};
	return (
		<div>
			<div>処理内容
			{data?.text}</div>
			<button 
			onClick={GetData}
			className="border border-gray-300 rounded-md p-2 m-2 bg-blue-500 text-white hover:bg-blue-700"
			>データを取得</button>
		</div>
	);
}

export default App;
