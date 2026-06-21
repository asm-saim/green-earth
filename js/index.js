// category function
const callCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => loadCategory(data.categories))
}

//category function load
const loadCategory = (names) => {
    const categoriesBox = document.getElementById("categories");
    // {id: 8, category_name: 'Bamboo', small_description: 'Fast-growing versatile plants with woody stems.'}
    for (let name of names) {
        // console.log(name)
        const divForCategory = document.createElement("div")
        divForCategory.innerHTML = `<div class="mx-3 my-2">
        <button class="btn btn-sm w-full justify-start 
        hover:bg-[#15803D] hover:text-white text-base font-medium">${name.category_name}</button>
        </div>`

        categoriesBox.append(divForCategory)
    }

}



callCategories();