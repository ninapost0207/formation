const resourcesPreview = document.querySelector(".resources__preview");
const resourcesPreviewPages = document.querySelectorAll(".resources__preview__page");

function createResourceListeners() {
  const resourcesImg = document.querySelectorAll(".resource_image-link");
  resourcesImg.forEach((resource) => {
    resource.addEventListener('click', (e) => {
        console.log('Moving to resource-page with resource-id=', e.target.dataset.resource_id);
    })
  });  
}
    

function createPageListeners() {
  resourcesPreviewPages.forEach((page) => {
    page.addEventListener('click', (e) => {
      console.log('Reload page with page-number = ', e.target.dataset.page_number);
    })
  })
}

createResourceListeners();
createPageListeners();
