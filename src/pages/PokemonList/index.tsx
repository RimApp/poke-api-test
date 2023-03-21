import { getAllPokemons } from "@/api/pokemon";
import { useEffect, useState } from "react";
import { PokemonDetail } from "../PokemonDetail";
import styles from "../../styles/PokemonList.module.scss";
import { DOTS, usePagination } from "@/hooks/usePagination";

export const PokemonList = () => {
	const PAGE_LIMIT = 20;
	const [pokemons, setPokemons] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [selectedPokemonName, setSelectedPokemonName] = useState(null);

	const paginationRange = usePagination({ totalPages: totalPages, currentPage: currentPage });

	useEffect(() => {
		const fetchPokemonList = async () => {
			const offset = (currentPage - 1) * PAGE_LIMIT;
			const { results, count } = await getAllPokemons(PAGE_LIMIT, offset);
			setPokemons(results);
			setTotalPages(Math.ceil(count / PAGE_LIMIT));
		};
		fetchPokemonList();
	}, [currentPage]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Pokemons</h1>
			<ul className={styles.list}>
				{pokemons.map(({ name }) => (
					<li className={styles.item} key={name}>
						<button className={styles.button} onClick={() => setSelectedPokemonName(name)}>
							{name}
						</button>
					</li>
				))}
			</ul>
			{selectedPokemonName && <PokemonDetail name={selectedPokemonName} onClose={() => setSelectedPokemonName(null)} />}
			<div className={styles.pagination}>
				<button className={styles.paginationButton} disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
					&laquo;
				</button>
				{paginationRange?.map(pageNumber => (
					<>
						{pageNumber === DOTS ? (
							<span key={pageNumber} className={styles.dots}>
								{DOTS}
							</span>
						) : (
							<button
								key={pageNumber}
								className={`${styles.paginationButton}${pageNumber === currentPage ? ` ${styles.active}` : ""}`}
								onClick={() => typeof pageNumber === "number" && setCurrentPage(pageNumber)}>
								{pageNumber}
							</button>
						)}
					</>
				))}
				<button className={styles.paginationButton} disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
					&raquo;
				</button>
			</div>
		</div>
	);
};
