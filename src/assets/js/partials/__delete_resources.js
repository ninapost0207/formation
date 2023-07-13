const menu = document.querySelector(".resources__menu");
const search = document.querySelector(".resources__search");
const menuItems = menu.querySelectorAll(".resources__menu__item");
const filter = search.querySelector(".resources__search__filter");
const filterArrows = filter.querySelectorAll(".filter__arrow");
const filterSubs = filter.querySelectorAll(".filter__sub");
const filters = filter.querySelectorAll(".filter__sub__item");



console.log(filterArrows);

let state = {
    resources: {
        menu: {
            activeItem: "",
            hoveredItem: ""
        },
        filter: {
            category: "",
            filters: []
        }
    }
}


function changeMenuStyles() {
    menuItems.forEach((item) => {
        //if (item.dataset.category === state.resources.menu.activeItem || (item.dataset.category === state.resources.menu.hoveredItem && state.resources.menu.activeItem === "")) {
        if (item.dataset.partition === state.resources.menu.activeItem || (item.dataset.partition === state.resources.menu.hoveredItem && state.resources.menu.activeItem === "")) {
            item.classList.add('resources__menu__item_selected')
        } else {
            item.classList.remove('resources__menu__item_selected')
        }
    })
}




menu.addEventListener('mouseover', (e) => {
    if (e.target.dataset.partition) {
        state.resources.menu.hoveredItem = e.target.dataset.partition;
    }
    if (e.target.parentNode.dataset.partition) {
        state.resources.menu.hoveredItem = e.target.parentNode.dataset.partition;
    }
    changeMenuStyles();
})


menu.addEventListener('mouseout', (e) => {
    state.resources.menu.hoveredItem = ""
    changeMenuStyles();
})


menu.addEventListener('click', (e) => {
    if (e.target.dataset.partition) {
        state.resources.menu.activeItem = e.target.dataset.partition;
    }
    if (e.target.parentNode.dataset.partition) {
        state.resources.menu.activeItem = e.target.parentNode.dataset.partition;
    }
    changeMenuStyles();
})





function changeCategory() {
    console.log(state.resources.filter.category);
    filterArrows.forEach((arrow) => {
        if (arrow.parentNode.dataset.category === state.resources.filter.category) {
            arrow.classList.add("filter__arrow_selected")
        } else {
            arrow.classList.remove("filter__arrow_selected")
        }
    })
    filterSubs.forEach((sub) => {
        if (sub.parentNode.dataset.category === state.resources.filter.category) {
            sub.classList.add("filter__sub_selected")
        } else {
            sub.classList.remove("filter__sub_selected")
        }
    })
}


function changeFilters() {
    filters.forEach((currentFilter) => {
        state.resources.filter.filters.includes(currentFilter.dataset.filter) ? 
        currentFilter.classList.add("filter__sub__item_selected") : currentFilter.classList.remove("filter__sub__item_selected")
    })
}


filter.addEventListener("click", (e) => {
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