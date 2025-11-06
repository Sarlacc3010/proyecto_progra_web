fetch("http://localhost:3000/api/pokemon")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("pokemon-list");
    data.forEach(pokemon => {
      const li = document.createElement("li");
      li.textContent = pokemon.name;
      list.appendChild(li);
    });
  })
  .catch(err => console.error("Error al obtener los datos:", err));
