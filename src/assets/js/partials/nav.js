let state = {
    nav: {
        activeItem: "",
        type: "classic",
    },
    resources: {
        menu: {
            activeItem: "",
            hoveredItem: "modernize"
        },
        filter: {
            category: "",
            filters: []
        }
    },
}


//---------------------------- NAV -----------------------------------------------
const nav = document.querySelector(".nav");
const mobileNav = document.querySelector(".mobile-nav");
const menus = document.querySelectorAll(".nav__items");
const subMenus = document.querySelectorAll(".nav-sub");


function changeSubNav(clickedItem) { //receives node to select only it
    menus.forEach((menu) => {
        menu.querySelectorAll('.nav__item').forEach((item) => item === clickedItem ? item.classList.add('selected') : item.classList.remove('selected')); //change classlist for nav__item
    })
}


function redrawNav(selected, clickedItem) {
    state.nav.activeItem = selected;
    state.nav.activeItem ? changeSubNav(clickedItem) : changeSubNav(null);
    if (state.nav.type === 'sticky' ) {
        nav.parentNode.classList.add('sticky');
        subMenus.forEach(el => el.classList.add('sticky'));
        mobileNav.classList.add('sticky');
    } else {
        nav.parentNode.classList.remove('sticky'); 
        subMenus.forEach(el => el.classList.remove('sticky'));
        mobileNav.classList.remove('sticky');
    } 
}


menus.forEach((menu) => {
    menu.addEventListener("click", (e) => {
        if (e.target.querySelector('.nav-sub') || e.target.querySelector('.mobile-nav-sub')) { //if clicked item has subMenu/mobileSubMenu 
            if (e.target.classList.contains('nav__item')) {
                e.target.dataset.item === state.nav.activeItem ? state.nav.activeItem = "" : state.nav.activeItem = e.target.dataset.item;
                redrawNav(state.nav.activeItem, e.target);
            } 
            if (e.target.parentNode.classList.contains('nav__item')) {
                e.target.dataset.item === state.nav.activeItem ? state.nav.activeItem = "" : state.nav.activeItem = e.target.dataset.item;
                redrawNav(state.nav.activeItem, e.target);
            } 
        }
        if (e.target.classList.contains('nav-arrow')) { //if navArrow clicked
            e.target.parentNode.dataset.item === state.nav.activeItem ? state.nav.activeItem = "" : state.nav.activeItem = e.target.parentNode.dataset.item;
            redrawNav(state.nav.activeItem, e.target.parentNode);
        }
    })
})


function changeMenuType(newType) {
    if (state.nav.type !== newType) {
        state.nav.type = newType;
        redrawNav(state.nav.activeItem);
    }
}


document.addEventListener("scroll", (e) => {
    if (window.scrollY > 600) {
        changeMenuType('sticky');
    } 
    if (window.scrollY < 500) {
        changeMenuType('classic')
    }
})





//-------------------------- Blog NAV-----------------------------------------

const blog_nav = document.querySelector(".blog__nav__cont");

if (blog_nav) {
    document.addEventListener('DOMContentLoaded', (e) => {
        const blogHeaders = document.querySelector(".blog__content").querySelectorAll("h2");
    
        blog_nav.innerHTML = '';
        
        blogHeaders.forEach((header, index) => {
            if (!header.id) {
                header.id = `blog-id-${index}`;
            }
            blog_nav.innerHTML += `<a href="#${header.id}">${header.innerHTML}</a>`
        })
    })
}




//-------------------------------------------- Resources menu----------------------

const resources_menu = document.querySelector(".resources__menu");

if (resources_menu) {

    const resources_search = document.querySelector(".resources__search");
    const resources_menuItems = resources_menu.querySelectorAll(".resources__menu__item");
    
    function changeMenuStyles() {
        if (resources_menuItems) {
            resources_menuItems.forEach((item) => {
                //if (item.dataset.category === state.resources.menu.activeItem || (item.dataset.category === state.resources.menu.hoveredItem && state.resources.menu.activeItem === "")) {
                if (item.dataset.partition === state.resources.menu.hoveredItem || (item.dataset.partition === state.resources.menu.hoveredItem && state.resources.menu.hoveredItem === "")) {
                    item.classList.add('resources__menu__item_selected')
                } else {
                    item.classList.remove('resources__menu__item_selected')
                }
            })
        }
    }
    
    resources_menu.addEventListener('mouseover', (e) => {
        if (e.target.dataset.partition) {
            state.resources.menu.hoveredItem = e.target.dataset.partition;
        }
        if (e.target.parentNode.dataset.partition) {
            state.resources.menu.hoveredItem = e.target.parentNode.dataset.partition;
        }
        changeMenuStyles();
    })
    
    resources_menu.addEventListener('mouseout', (e) => {
        state.resources.menu.hoveredItem = ""
        changeMenuStyles();
    })
}



/*
menu.addEventListener('click', (e) => {
    if (e.target.dataset.partition) {
        state.resources.menu.activeItem = e.target.dataset.partition;
    }
    if (e.target.parentNode.dataset.partition) {
        state.resources.menu.activeItem = e.target.parentNode.dataset.partition;
    }
    changeMenuStyles();
})
*/



//-------------------------------------------- Resources resource----------------------
const resourcesPreview = document.querySelector(".resources__preview");

if (resourcesPreview) {
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
}    




//-------------------------------------------- Resources filter----------------------

const resources_search = document.querySelector(".resources__search");

if (resources_search) {

    const resources_filter = resources_search.querySelector(".resources__search__filter");
    const resources_filterArrows = resources_filter.querySelectorAll(".filter__arrow");
    const resources_filterSubs = resources_filter.querySelectorAll(".filter__sub");
    const resources_filters = resources_filter.querySelectorAll(".filter__sub__item");
    
    function changeCategory() {
        //console.log(state.resources.filter.category);
        resources_filterArrows.forEach((arrow) => {
            if (arrow.parentNode.dataset.category === state.resources.filter.category) {
                arrow.classList.add("filter__arrow_selected")
            } else {
                arrow.classList.remove("filter__arrow_selected")
            }
        })
        resources_filterSubs.forEach((sub) => {
            if (sub.parentNode.dataset.category === state.resources.filter.category) {
                sub.classList.add("filter__sub_selected")
            } else {
                sub.classList.remove("filter__sub_selected")
            }
        })
    }
    
    
    function changeFilters() {
        resources_filters.forEach((currentFilter) => {
            state.resources.filter.filters.includes(currentFilter.dataset.filter) ? 
            currentFilter.classList.add("filter__sub__item_selected") : currentFilter.classList.remove("filter__sub__item_selected")
        })
    }
    
    
    resources_filter.addEventListener("click", (e) => {
        if (e.target.parentNode.dataset.category) {
            if (e.target.parentNode.dataset.category === state.resources.filter.category) {
                state.resources.filter.category = ""
            } else {
                state.resources.filter.category = e.target.parentNode.dataset.category;
            }
        } else {
            if (e.target.classList.contains('filter__sub__item')) {
                let filterIndex = state.resources.filter.filters.indexOf(e.target.dataset.filter)
                if (filterIndex >=0) {
                    state.resources.filter.filters.splice(filterIndex, 1)
                } else {
                    state.resources.filter.filters.push(e.target.dataset.filter);
                }
                changeFilters();
            }
        }
        changeCategory();
    })
}