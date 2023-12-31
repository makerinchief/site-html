const KITS_JSON_URL = 'https://raw.githubusercontent.com/makerinchief/jsons/main/kits_data.json';

function addBackButton(parentId, clickHandler) {
  const parentDiv = document.getElementById(parentId);

  const backButton = document.createElement('button');
  backButton.setAttribute('id', 'back-button');
  backButton.classList = 'back-button';
  backButton.textContent = 'BACK';

  backButton.onclick = (event) => {
    event.preventDefault();
    clickHandler();
  };

  parentDiv.appendChild(backButton);
}

function removeBackButton() {
  if (document.getElementById('back-button')) {
    document.getElementById('back-button').remove();
  }
}

function getKits() {
  fetch(KITS_JSON_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showKits(data.makerinchief);

      // Use for testing/styling
      // showKit(data.makerinchief[0]);
    })
    .catch((error) => console.log('fetching projects url', error));
}

function showKits(kitsData) {
  clearDiv('kits-container');

  const kitsContainer = document.getElementById('kits-container');

  const kitsListDiv = document.createElement('div');
  kitsListDiv.setAttribute('id', 'kits-list');

  kitsContainer.appendChild(kitsListDiv);

  kitsData.map((kit) => {
    createCardButton('kits-list', kit.photos[0].url, kit.name, kit.short, () => {
      console.log('clicked!!');
      showKit(kit);
    });
  });
}

// Shows the info and media for the kit being clicked.
function showKit(kitData) {
  clearDiv('kits-container');
  const kitContainer = document.getElementById('kits-container');

  addBackButton('kits-container', getKits);

  const kitDiv = document.createElement('div');
  kitDiv.setAttribute('id', 'kit-div');

  kitContainer.append(kitDiv);

  // Carousel
  let photo_urls = [];
  kitData.photos.forEach((photo) => {
    photo_urls.push(photo.url);
  });

  // from /scripts/carousel.js
  addCarousel(photo_urls, kitDiv);

  // from /scripts/kitInfo.js
  addInfo(kitData, kitDiv);
}

// Get the kits when the page loads.
window.addEventListener(
  'load',
  function (event) {
    getKits();
  },
  false
);
