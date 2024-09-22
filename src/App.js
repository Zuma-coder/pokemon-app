import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      await loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrevPage = () => {
    if (!prevUrl) return;

    setLoading(true);
    const fetchPokemonData = async () => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(prevUrl);
      // 各ポケモンの詳細データを取得
      await loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  };

  const handleNextPage = () => {
    setLoading(true);
    const fetchPokemonData = async () => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(nextUrl);
      // 各ポケモンの詳細データを取得
      await loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <div className="pokemonCardContainer">
            {pokemonData.map((data) => {
              return <Card key={data.id} data={data} />;
            })}
          </div>
        )}
      </div>
      <button onClick={handlePrevPage}>前へ</button>
      <button onClick={handleNextPage}>次へ</button>
    </>
  );
}

export default App;
