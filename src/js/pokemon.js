const loadingElement = document.querySelector(".loading");

function getPokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      const pokemons = data.results;
      return Promise.all(
        pokemons.map((pokemon) => {
          return new Promise((resolve, reject) => {
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
                resolve(result);
              })
              .catch((err) => reject(err));
          });
        })
      );
    })
    .then((pokemons) => {
      //   console.log(pokemons);
      //   console.log("start promise");
      return Promise.all(
        pokemons.map((pokemon) => {
          //   console.log(result);
          return new Promise((resolve, reject) => {
            const typeUrl = [];
            const result = {
              name: pokemon.name,
              img: pokemon.img,
              types: typeUrl,
            };
            pokemon.types.forEach((type) => {
              fetch(type.url)
                .then((response) => {
                  if (!response.ok) throw new Error(response.statusText);
                  return response.json();
                })
                .then((data) => {
                  const type = {
                    name: data.name,
                    url: data.sprites["generation-viii"]["sword-shield"].name_icon,
                  };
                  typeUrl.push(type);
                  resolve(result);
                })
                .catch((err) => reject(err));
            });
          });
        })
      );
    })
    .then((pokemons) => {
      // console.log(pokemons);
      pokemons.forEach((pokemon) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const pokemonImg = document.createElement("img");
        pokemonImg.src = pokemon.img;
        pokemonImg.alt = pokemon.name;
        pokemonImg.width = 96;
        pokemonImg.height = 96;
        const pokemonTypes = document.createElement("div");
        // console.log(pokemon.types);
        pokemon.types.forEach((type) => {
          const img = document.createElement("img");
          img.src = type.url;
          img.alt = type.name;
          img.width = 200;
          img.height = 44;
          // console.log(img);
          pokemonTypes.append(img);
        });
        const pokemonName = document.createElement("p");
        pokemonName.textContent = pokemon.name;
        card.append(pokemonImg, pokemonTypes, pokemonName);
        loadingElement.dispatchEvent(new Event("hide"));
        document.querySelector(".list").style.display = "grid";
        document.querySelector(".list").append(card);
      });
    })
    .catch((err) => {
      if (err instanceof Error) console.error(err.message);
    });
}

loadingElement.addEventListener("hide", hideLoader);

function hideLoader(event) {
  event.target.style.display = "none";
}

getPokemonList();
