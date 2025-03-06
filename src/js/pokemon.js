function getPokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      const pokemons = data.results;
      return Promise.all(
        pokemons.map((pokemon) => {
          const result = {
            name: pokemon.name,
          };
          fetch(pokemon.url)
            .then((response) => {
              if (!response.ok) throw new Error(response.statusText);
              return response.json();
            })
            .then((data) => {
              Object.assign(result, {
                img: data.sprites.front_default,
                types: data.types.map((type) => type.type),
              });
            });
          return result;
        })
      );
    })
    .then((pokemonsData) => {
        
    })
    .catch((err) => {
      if (err instanceof Error) console.error(err.message);
    });
}

getPokemonList();
