interface Props {
	rowInfo: string[];
}

export default function Row({ rowInfo }: Props) {
	return (
		<div className="flex items-center justify-center relative w-min mx-auto">
			{rowInfo.map((squareInfo, index) => (
				<div key={index} className="h-5 w-5">
					{squareInfo === '1' ? (
						<div className="h-full border-t-2 border-l-2 border-blue-600 rounded-tl-2xl"></div>
					) : (
						''
					)}
					{squareInfo === '2' ? (
						<div className="h-full border-t-2 border-r-2 border-blue-600 rounded-tr-2xl"></div>
					) : (
						''
					)}
					{squareInfo === '3' ? (
						<div className="h-full border-b-2 border-l-2 border-blue-600 rounded-bl-2xl"></div>
					) : (
						''
					)}
					{squareInfo === '4' ? (
						<div className="h-full border-b-2 border-r-2 border-blue-600 rounded-br-2xl"></div>
					) : (
						''
					)}
					{squareInfo === '-' ? (
						<div className="h-full border-t-2 border-r-2 border-l-2 rounded-t-md border-blue-600 "></div>
					) : (
						''
					)}
					{squareInfo === '_' ? (
						<div className="h-full border-b-2 border-r-2 border-l-2 rounded-b-md border-blue-600 "></div>
					) : (
						''
					)}
					{squareInfo === '=' ? (
						<div className="h-full border-t-2 border-b-2 border-blue-600 "></div>
					) : (
						''
					)}
					{squareInfo === '|' ? (
						<div className="h-full border-l-2 border-r-2 border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === 'o' ? (
						<div className="h-full flex justify-center items-center">
							<div className="rounded-full h-1/5 w-1/5 bg-[#fffd92]"></div>
						</div>
					) : (
						''
					)}
					{squareInfo === '[' ? (
						<div className="h-full border-l-2 border-t-2 border-b-2 rounded-l-md border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === ']' ? (
						<div className="h-full border-r-2 border-t-2 border-b-2 rounded-r-md border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === 'bl' ? (
						<div className="h-full border-l-2 border-b-2  border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === 'br' ? (
						<div className="h-full border-r-2 border-b-2  border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === 'tl' ? (
						<div className="h-full border-l-2 border-t-2  border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === 'tr' ? (
						<div className="h-full border-r-2 border-t-2  border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === 'b' ? (
						<div className="h-full border-b-2  border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === 'l' ? (
						<div className="h-full border-l-2  border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === 't' ? (
						<div className="h-full border-t-2  border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === 'r' ? (
						<div className="h-full border-r-2  border-blue-600"></div>
					) : (
						''
					)}
					{squareInfo === '0' ? (
						<div className="h-full flex justify-center items-center">
							<div className="rounded-full h-1/2 w-1/2 bg-[#fffd92] animate-pulse"></div>
						</div>
					) : (
						''
					)}
				</div>
			))}
		</div>
	);
}
