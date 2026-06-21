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
        <button class="btn btn-sm w-full justify-start bg-transparent shadow-none border-none
        hover:bg-[#15803D] hover:text-white text-base font-medium">${name.category_name}</button>
        </div>`

        categoriesBox.append(divForCategory)
    }

}
callCategories();


//all trees function:
const allTrees = () => {
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
        .then(res => res.json())
        .then(data => loadAllTrees(data.plants))
};

//load all trees
const loadAllTrees = (trees) => {

    const treesContainer = document.getElementById("all-trees");

    // category
    // :"Ornamental Plant"
    // description:"A decorative palm with large, fan-shaped leaves. Suitable for both indoor decoration and garden landscapes."
    // id:21
    // image:"https://i.ibb.co.com/8gqbH5LC/fan-palm-min.jpg"
    // name:"Fan Palm"
    // price:900

    for (let tree of trees) {
        // console.log(tree);
        const cardInfo=document.createElement("div")
        cardInfo.innerHTML=`
        <div class="bg-white p-4 rounded-lg">
                        <img src="${tree.image}" alt="" class="w-full h-52 object-cover rounded-lg">
                        <h1 class="font-semibold text-xl mt-2">${tree.name}</h1>
                        <p class="font-normal text-sm mt-3">${tree.description}</p>
                        <div class="flex justify-between items-center mt-2">
                            <h2 class="text-[#15803D] bg-[#CFF0DC] px-2 font-semibold rounded-xl">${tree.category}</h2>
                            <h2 class="font-semibold text-lg">${tree.price}</h2>
                        </div>
                        <button class="btn w-full rounded-full bg-[#15803D] text-white mt-3">
                            Add to Cart</button>
                    </div>
        `
        treesContainer.append(cardInfo);
    }

}

allTrees();

