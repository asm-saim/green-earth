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
        console.log(name)
        const divForCategory = document.createElement("div")
        divForCategory.innerHTML = `${name.category_name}`

        categoriesBox.append(divForCategory)
    }

}



callCategories();