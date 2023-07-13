const search = document.querySelector(".resources__search");
const filter = search.querySelector(".resources__search__filter");
const filterArrows = filter.querySelectorAll(".filter__arrow");
const filterSubs = filter.querySelectorAll(".filter__sub");
const filters = filter.querySelectorAll(".filter__sub__item");



let state = {
    resources: {
        filter: {
            category: "",
            filters: []
        }
    }
}



function changeCategory() {
    //console.log(state.resources.filter.category);
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