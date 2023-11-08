const RESOURCES_JSON_URL = '../../assets/jsons/resources.json';

const getResources = () => {
  fetch(RESOURCES_JSON_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showResources(data);
    })
    .catch((error) => console.log('fetching projects url', error));
};

const showResources = (resourcesData) => {
  resourcesData.map((resource) => {
    createCardAnchor(
      'resources-list',
      resource.image,
      resource.name,
      resource.short,
      resource.url
    );
  });
};

window.addEventListener(
  'load',
  function (event) {
    getResources();
  },
  false
);
