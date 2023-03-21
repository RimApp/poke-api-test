import styles from "../../styles/PokemonDetail.module.scss";
import { Pokemon } from "@/types/Pokemon";
import { useEffect, useState } from "react";
import { getPokemonDetail } from "@/api/pokemon";

interface PokemonDetailProps {
	name: string;
	onClose: () => void;
}
export const PokemonDetail = ({ name, onClose }: PokemonDetailProps) => {
	const [pokemonDetail, setPokemonDetail] = useState<Pokemon>();

	useEffect(() => {
		const fetchPokemonDetail = async () => {
			const response = await getPokemonDetail(name);
			setPokemonDetail(response);
		};
		fetchPokemonDetail();
	}, [name]);

	const { height, weight, sprites, types } = pokemonDetail ?? {};

	return (
		<div className={styles.modalOverlay}>
			{pokemonDetail && (
				<div className={`${styles.modalContent} ${styles.pokemonCard}`}>
					<h1>{name}</h1>
					<p>Height: {height}</p>
					<p>Weight: {weight}</p>
					{sprites?.front_default && <img src={sprites.front_default} alt={name} />}
					<ul>
						<p>Types:</p>
						{types?.map(({ type }) => (
							<li key={type.name}>{type.name}</li>
						))}
					</ul>
					<button onClick={onClose}>Close</button>
				</div>
			)}
		</div>
	);
};
