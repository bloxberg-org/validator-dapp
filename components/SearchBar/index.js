
/***
	takes searchTerm setter, which will be called onChange for the input box
*/
export const SearchBar = ({setSearchTerm}) => {
	return (
		<>
			<input type="text" 
				className="w-full my-6 p-2 text-white bg-background-header rounded-lg focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-light-blue shadow-2xl" 
				placeholder="Search"
				onChange={(e) => {setSearchTerm(e.currentTarget.value);}} />
		</>
	)
}
