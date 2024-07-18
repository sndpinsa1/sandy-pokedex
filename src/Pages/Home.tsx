import { useEffect } from "react";
import usePokemon from "../hooks/usePokedex";
import Header from "../components/Header";
import SearchFilterbar from "../components/SearchFilterbar";
import PokedexCardList from "../components/PokedexCardList";
import Modal from "../components/UI/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ShimmerGrid from "../components/UI/shimmer/ShimmerGrid";

const Home: React.FC = () => {
  const { pokemons, loading, error, loadMore } = usePokemon();
  const {
    searchTerm: search,
    typeFilter,
    genderFilter,
    statsFilter,
  } = useSelector((state: RootState) => state.pokemon);

  const filteredPokemons = pokemons
    .filter((pokemon) => {
      if (typeFilter.length > 0) {
        return pokemon.types.some((type) =>
          typeFilter.includes(type.type.name)
        );
      } else {
        return true;
      }
    })
    .filter((pokemon) => {
      if (genderFilter.length > 0) {
        return pokemon.gender.some((gen) =>
          genderFilter.includes(gen.toLowerCase())
        );
      } else {
        return true;
      }
    })
    .filter((pokemon) => {
      if (statsFilter.length > 0) {
        return pokemon.stats.some((stat) => {
          return statsFilter.filter((filter) => {
            if (
              filter.name === stat.stat.name &&
              stat.base_stat >= filter.min &&
              stat.base_stat <= filter.max
            ) {
              return true;
            } else {
              return false;
            }
          }).length > 0
            ? true
            : false;
        });
      } else {
        return true;
      }
    })
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    if (document.body.scrollHeight === window.scrollY + window.innerHeight) {
      if (!search) {
        loadMore();
      }
    }
  }
  return (
    <div className="p-8 max-w-[1374px] mx-auto">
      <Header />
      <SearchFilterbar />
      {error && <p>{error}</p>}
      <PokedexCardList pokemons={filteredPokemons} />
      {loading && <ShimmerGrid />}
      <Modal />
    </div>
  );
};

export default Home;
