/*const menu = document.querySelector(".resources__menu");
const search = document.querySelector(".resources__search");
const menuItems = menu.querySelectorAll(".resources__menu__item");



let state = {
    resources: {
        menu: {
            activeItem: "",
            hoveredItem: "modernize"
        }
    }
}


function changeMenuStyles() {
    menuItems.forEach((item) => {
        //if (item.dataset.category === state.resources.menu.activeItem || (item.dataset.category === state.resources.menu.hoveredItem && state.resources.menu.activeItem === "")) {
        if (item.dataset.partition === state.resources.menu.hoveredItem || (item.dataset.partition === state.resources.menu.hoveredItem && state.resources.menu.hoveredItem === "")) {
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
