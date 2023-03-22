import styles from "../../styles/PokemonDetail.module.scss";
import { Pokemon } from "@/types/Pokemon";
import { useEffect, useState } from "react";
import { getPokemonDetail } from "@/api/pokemon";
import Image from "next/image";

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
					<p>Height: {(height ?? 0) / 10}m</p>
					<p>Weight: {(weight ?? 0) / 10}kg</p>
					{sprites?.front_default && <Image src={sprites.front_default} alt={name} width={96} height={96} />}
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
