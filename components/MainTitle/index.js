export const MainTitle = ({title, text="", text_size="text-5xl"}) => {
	return (
		<div className="text-light-blue pb-4 flex justify-between items-center">
			<div className="flex flex-row items-center">
				<img src="/diamond.png" alt=""  className="h-[3rem]"/>
				<h1 className={text_size}>{title}</h1>
			</div>
			<div className="text-lg">
				{text}
			</div>
		</div>
	)

}
