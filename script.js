const fetchData = (character) => {
    return fetch(`https://www.amiiboapi.com/api/amiibo/?character=${character}`)
      .then(response => response.json())
      .then(data => data.amiibo)
      .catch(error => console.error('Error fetching data:', error));
  };

  const createAmiiboCard = (amiibo) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4');

    const html = `
      <div class="amiibo-card">
        <img src="${amiibo.image}" alt="${amiibo.name}" class="amiibo-img">
        <h2>${amiibo.name}</h2>
        <p><strong>Character:</strong> ${amiibo.character}</p>
        <p><strong>Game Series:</strong> ${amiibo.gameSeries}</p>
      </div>
    `;

    card.innerHTML = html;
    return card;
  };

  const displayAmiibos = async (character) => {
    const amiiboContainer = document.getElementById('amiiboContainer');
    amiiboContainer.innerHTML = '';

    if (character.trim() !== '') {
      try {
        const amiibos = await fetchData(character);
        amiibos.slice(0, 15).forEach(amiibo => {
          const amiiboCard = createAmiiboCard(amiibo);
          amiiboContainer.appendChild(amiiboCard);
        });
      } catch (error) {
        console.error('Error displaying amiibos:', error);
      }
    }
  };

  const searchAmiibos = () => {
    const searchValue = document.getElementById('searchInput').value.trim();
    displayAmiibos(searchValue);
  };