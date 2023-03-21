export const getAllPokemons = async (limit: number, offset: number) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_POKE_API_BASE_URL}?limit=${limit}&offset=${offset}`);
	const data = await response.json();
	return data;
};

export const getPokemonDetail = async (name: string) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_POKE_API_BASE_URL}/${name}`);
	const data = await response.json();
	return data;
};
