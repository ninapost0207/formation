const blog_nav = document.querySelector(".blog__nav__cont");
const blogHeaders = document.querySelector(".blog__content").querySelectorAll("h2");

blog_nav.innerHTML = '';


blogHeaders.forEach((header, index) => {
    if (!header.id) {
        header.id = `blog-id-${index}`;
    }
    blog_nav.innerHTML += `<a href="#${header.id}">${header.innerHTML}</a>`
})

