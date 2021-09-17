
import Container from "components/ui/Container";
import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import Typography from "components/ui/Typography";
import Button from "components/ui/Button";
import useAxios from "hooks/useAxios";
import Select from "components/ui/Select";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/theme-dracula";

const languages = [
	{
		id: 70,
		label: "Python (2.7.17)",
		mode: "python",
	},
	{
		id: 75,
		label: "C (Clang 7.0.1)",
		mode: "c_cpp",
	},
	{
		id: 76,
		label: "C++ (Clang 7.0.1)",
		mode: "c_cpp",
	},
	{
		id: 48,
		label: "C (Clang 7.4.0)",
		mode: "c_cpp",
	},
	{
		id: 52,
		label: "C++ (Clang 7.4.0)",
		mode: "c_cpp",
	},
	{
		id: 54,
		label: "C++ (GCC 9.2.0)",
		mode: "c_cpp",
	},
];

function Ide() {

	const [sourceCode, setSourceCode] = useState("");

	const [language, setLanguage] = useState({
		id: 54,
		label: "C++ (GCC 9.2.0)",
		mode: "c_cpp",
	});

	const [stdin, setStdin] = useState('')
	const [stdout, setStdout] = useState('')
	const [stderr, setStderr] = useState('')
	const [expectedOutput, setExpectedOutput] = useState('')
	const [compileOutput, setCompileOutput] = useState('')

	const { sendRequest, data, loading, error } = useAxios('submit', 'post', {
		'language_id': language.id,
		'source_code': sourceCode,
		'stdin': stdin,
		'expected_output': expectedOutput
	})


	useEffect(() => {
		setStdout('')
		setStderr('')
		setCompileOutput('')
		if (data) {
			setStdout(data.stdout)
			setStderr(data.stderr)
			setCompileOutput(data.compile_output)
		}
	}, [data])
	return (
		<Container className="py-16">
			<div className="w-full p-4 bg-gray-800 my-4 rounded">
				<h4>Debug</h4>
				<div>
					<h5>Loading : {loading ? "true" : "false"}</h5>
				</div>
				<div>
					<h5>Error</h5>
					<pre>{error}</pre>
				</div>
			</div>
			<div className="flex justify-between mb-4 items-center">
				<div className="flex items-center">
					<Typography tag="h3" textSize="xl" weight="semi-bold">
						Source code
					</Typography>
					<div className="pl-4">
						<Select
							className="w-56"
							data={languages}
							showField="label"
							initSelected={5}
							onChange={setLanguage}
						/>
					</div>
				</div>
				<Button onClick={sendRequest} disabled={loading}>
					Submit
				</Button>
			</div>
			<div className="w-full">
				<div className="animate-pulse flex">
					<div className="flex-1">
						<div
							className={`h-1 ${loading ? "bg-green-700" : "bg-dark"
								} transition`}
						></div>
					</div>
				</div>
			</div>
			<AceEditor
				readOnly={loading}
				fontSize={16}
				mode={language.mode}
				theme="dracula"
				onChange={setSourceCode}
				value={sourceCode}
				name="Editor"
				style={{
					overflow: "hidden",
				}}
				width="100%"
				height="400px"
				editorProps={{ $blockScrolling: true }}
			/>

			{/* Editors */}
			<div className="grid grid-cols-2 gap-4 my-4">
				<div>
					<Typography tag="h3" textSize="xl" weight="semi-bold">
						Stdin
					</Typography>
					<AceEditor
						readOnly={loading}
						fontSize={16}
						mode={language.mode}
						theme="dracula"
						onChange={setStdin}
						value={stdin}
						name="stdin"
						style={{
							overflow: "hidden",
						}}
						width="100%"
						height="200px"
						editorProps={{ $blockScrolling: true }}
					/>
				</div>
				<div>
					<Typography tag="h3" textSize="xl" weight="semi-bold">
						Stdout
					</Typography>
					<AceEditor
						readOnly={loading}
						fontSize={16}
						mode={language.mode}
						theme="dracula"
						onChange={setStdout}
						value={stdout}
						name="stdout"
						style={{
							overflow: "hidden",
						}}
						width="100%"
						height="200px"
						editorProps={{ $blockScrolling: true }}
					/>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<Typography tag="h3" textSize="xl" weight="semi-bold">
						Expected Output
					</Typography>
					<AceEditor
						readOnly={loading}
						fontSize={16}
						mode={language.mode}
						theme="dracula"
						onChange={setExpectedOutput}
						value={expectedOutput}
						name="expected_output"
						style={{
							overflow: "hidden",
						}}
						width="100%"
						height="200px"
						editorProps={{ $blockScrolling: true }}
					/>
				</div>
				<div>
					<Typography tag="h3" textSize="xl" weight="semi-bold">
						Stderr
					</Typography>
					<AceEditor
						readOnly={loading}
						fontSize={16}
						mode={language.mode}
						theme="dracula"
						onChange={setStderr}
						value={stderr}
						name="stderr"
						style={{
							overflow: "hidden",
						}}
						width="100%"
						height="200px"
						editorProps={{ $blockScrolling: true }}
					/>
				</div>
				<div>
					<Typography tag="h3" textSize="xl" weight="semi-bold">
						Compile output
					</Typography>
					<AceEditor
						readOnly={loading}
						fontSize={16}
						mode={language.mode}
						theme="dracula"
						onChange={setCompileOutput}
						value={compileOutput}
						name="compileoutput"
						style={{
							overflow: "hidden",
						}}
						width="100%"
						height="200px"
						editorProps={{ $blockScrolling: true }}
					/>
				</div>
			</div>

			{data && data.judged && (
				<div
					className={` ${data.status.id === 0
							? "bg-gray-700"
							: data.status.id === 3
								? "bg-green-700"
								: "bg-red-800"
						} p-4 fixed z-50 bottom-0 left-0 right-0`}
				>
					<Container className="grid-cols-2 gap-4 grid">
						<div>
							<span>Status : {data.status.description}</span>
						</div>
						<div>
							<span>Toekn : {data.token}</span>
						</div>
						<div>
							<span>Time : {data.time} s</span>
						</div>
						<div>
							<span>Memory : {data.memory} ko</span>
						</div>
					</Container>
				</div>
			)}
			<Container className="py-16">
				<div className="w-full p-4 bg-gray-800 my-4 rounded">
					<h4>Debug</h4>
					<div>
						<h5>Loading : {loading ? "true" : "false"}</h5>
					</div>
					<div>
						<h5>Error</h5>
						<pre>{error}</pre>
					</div>
				</div>
				<div className="flex justify-between mb-4 items-center">
					<div className="flex items-center">
						<Typography tag="h3" textSize="xl" weight="semi-bold">
							Source code
						</Typography>
						<div className="pl-4">
							<Select
								className="w-56"
								data={languages}
								showField="label"
								initSelected={5}
								onChange={setLanguage}
							/>
						</div>
					</div>
					<Button onClick={sendRequest} disabled={loading}>
						Submit
					</Button>
				</div>
				<div className="w-full">
					<div className="animate-pulse flex">
						<div className="flex-1">
							<div
								className={`h-1 ${loading ? "bg-green-700" : "bg-dark"
									} transition`}
							></div>
						</div>
					</div>
				</div>
				<AceEditor
					readOnly={loading}
					fontSize={16}
					mode={language.mode}
					theme="dracula"
					onChange={setSourceCode}
					value={sourceCode}
					name="Editor"
					style={{
						overflow: "hidden",
					}}
					width="100%"
					height="400px"
					editorProps={{ $blockScrolling: true }}
				/>

				{/* Editors */}
				<div className="grid grid-cols-2 gap-4 my-4">
					<div>
						<Typography tag="h3" textSize="xl" weight="semi-bold">
							Stdin
						</Typography>
						<AceEditor
							readOnly={loading}
							fontSize={16}
							mode={language.mode}
							theme="dracula"
							onChange={setStdin}
							value={stdin}
							name="stdin"
							style={{
								overflow: "hidden",
							}}
							width="100%"
							height="200px"
							editorProps={{ $blockScrolling: true }}
						/>
					</div>
					<div>
						<Typography tag="h3" textSize="xl" weight="semi-bold">
							Stdout
						</Typography>
						<AceEditor
							readOnly={loading}
							fontSize={16}
							mode={language.mode}
							theme="dracula"
							onChange={setStdout}
							value={stdout}
							name="stdout"
							style={{
								overflow: "hidden",
							}}
							width="100%"
							height="200px"
							editorProps={{ $blockScrolling: true }}
						/>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4">
					<div>
						<Typography tag="h3" textSize="xl" weight="semi-bold">
							Expected Output
						</Typography>
						<AceEditor
							readOnly={loading}
							fontSize={16}
							mode={language.mode}
							theme="dracula"
							onChange={setExpectedOutput}
							value={expectedOutput}
							name="expected_output"
							style={{
								overflow: "hidden",
							}}
							width="100%"
							height="200px"
							editorProps={{ $blockScrolling: true }}
						/>
					</div>
					<div>
						<Typography tag="h3" textSize="xl" weight="semi-bold">
							Stderr
						</Typography>
						<AceEditor
							readOnly={loading}
							fontSize={16}
							mode={language.mode}
							theme="dracula"
							onChange={setStderr}
							value={stderr}
							name="stderr"
							style={{
								overflow: "hidden",
							}}
							width="100%"
							height="200px"
							editorProps={{ $blockScrolling: true }}
						/>
					</div>
					<div>
						<Typography tag="h3" textSize="xl" weight="semi-bold">
							Compile output
						</Typography>
						<AceEditor
							readOnly={loading}
							fontSize={16}
							mode={language.mode}
							theme="dracula"
							onChange={setCompileOutput}
							value={compileOutput}
							name="compileoutput"
							style={{
								overflow: "hidden",
							}}
							width="100%"
							height="200px"
							editorProps={{ $blockScrolling: true }}
						/>
					</div>
				</div>

				{data && data.judged && (
					<div
						className={` ${data.status.id === 0
								? "bg-gray-700"
								: data.status.id === 3
									? "bg-green-700"
									: "bg-red-800"
							} p-4 fixed z-50 bottom-0 left-0 right-0`}
					>
						<Container className="grid-cols-2 gap-4 grid">
							<div>
								<span>Status : {data.status.description}</span>
							</div>
							<div>
								<span>Toekn : {data.token}</span>
							</div>
							<div>
								<span>Time : {data.time} s</span>
							</div>
							<div>
								<span>Memory : {data.memory} ko</span>
							</div>
						</Container>
					</div>
				)}
			</Container>
		</Container>
	);
}

export default Ide;
