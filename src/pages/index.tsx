import styles from "@/styles/Home.module.scss";
import { PokemonList } from "./PokemonList";

const Home = () => (
	<main className={styles.main}>
		<PokemonList />
	</main>
);

export default Home;
