let totalPrice = 0;

// 8. spinner
const loadSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner-id").classList.remove("hidden")
    }
    else {
        document.getElementById("spinner-id").classList.add("hidden")
    }
}

//1. category function
const callCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => loadCategory(data.categories))
}


//1.load category function 
const loadCategory = (names) => {
    const categoriesBox = document.getElementById("categories");
    // {id: 8, category_name: 'Bamboo', small_description: 'Fast-growing versatile plants with woody stems.'}
    for (let name of names) {
        // console.log(name)
        const divForCategory = document.createElement("div")
        divForCategory.innerHTML = ` 
        <div class="mx-3 my-2">
        <button onclick="loadCategoryCard(${name.id})" id="btn-category-${name.id}"
         class="btn-category btn btn-sm w-full justify-start bg-transparent shadow-none border-none
        hover:bg-[#15803D] hover:text-white text-base font-medium">${name.category_name}</button>
        </div>`

        categoriesBox.append(divForCategory)
    }

}
callCategories();


//2.all trees function:
const allTrees = () => {
    loadSpinner(true)
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
        .then(res => res.json())
        .then(data => loadAllTrees(data.plants))
        .finally(() => loadSpinner(false));

};

//2.load all trees
const loadAllTrees = (trees) => {

    const treesContainer = document.getElementById("all-trees");
    treesContainer.innerHTML = ""; // Clear previous cards

    // category
    // :"Ornamental Plant"
    // description:"A decorative palm with large, fan-shaped leaves. Suitable for both indoor decoration and garden landscapes."
    // id:21
    // image:"https://i.ibb.co.com/8gqbH5LC/fan-palm-min.jpg"
    // name:"Fan Palm"
    // price:900

    for (let tree of trees) {
        // console.log(tree);
        const cardInfo = document.createElement("div")

        cardInfo.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg">
                        <img src="${tree.image}" alt="" class="w-full h-45 object-cover rounded-t-lg">
                        <div class="p-4">
                        <h1 onClick="onNameClick(${tree.id})" class="font-bold text-xl ">${tree.name}</h1>
                        <p class="font-normal text-sm mt-2 line-clamp-3">${tree.description}</p>
                        <div class="flex justify-between items-center mt-2">
                            <h2 class="text-[#15803D] bg-[#CFF0DC] px-2 text-sm  font-semibold rounded-xl">${tree.category}</h2>
                            <h2 class="font-bold text-lg text-[#15803D]">৳${tree.price}</h2>
                        </div>
                        <button onclick="addToCart(${tree.id})" class="btn w-full rounded-full bg-[#15803D] text-white mt-3">
                            Add to Cart</button>
                        </div> 
                        
                    </div>
        `
        treesContainer.append(cardInfo);
    }

}

allTrees();

// 3.Load by category:
const loadCategoryCard = (id) => {

    loadSpinner(true)
    removeActive();

    document
        .getElementById(`btn-category-${id}`)
        .classList.add("active-category");


    const url = `https://openapi.programming-hero.com/api/category/${id}`
    const res = fetch(url)
        .then(res => res.json())
        .then(data => loadAllTrees(data.plants))
        .finally(() => loadSpinner(false));


}

// 4.set active btn:
const removeActive = () => {
    const removeActiveCategory = document.querySelectorAll(".btn-category")

    removeActiveCategory.forEach(btn => {
        btn.classList.remove("active-category")
        btn.classList.add("bg-transparent", "shadow-none", "border-none")
    })
}

// 5.load all category btn:
const loadAllCategory = () => {
    removeActive();

    document
        .getElementById("btn-category-all")
        .classList.add("active-category");

    allTrees();
};
loadAllCategory();


// 6.plants details:
const onNameClick = async (id) => {

    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.plants);
    plantsDetail(data.plants)
};
// Object
// category:"Flowering Tree"
// description:"A striking ornamental tree famous for its brilliant orange-red blossoms. Its wide canopy adds a festive charm to parks and roadsides."
// id:6
// image:"https://i.ibb.co.com/MxPrt83c/Krishnachura-min.jpg"
// name:"Krishnachura"
// price:450


const plantsDetail = (values) => {
    const showPlantsDetail = document.getElementById("plants-detail")
    showPlantsDetail.innerHTML = `
        <div class="space-y-3">
       <h1 class="font-bold text-lg sm:text-xl my-2 m">${values.name}</h1>
        <img src="${values.image}" class="w-full h-44 sm:h-56 object-cover rounded-lg alt="${values.name}>
        <h2><span class="font-bold text-sm sm:text-base">Category:</span> ${values.category}</h2>
        <h2><span class="font-bold text-sm sm:text-base">Price:</span> ৳${values.price}</h2>
        <p><span class="font-bold text-sm sm:text-base">Description:</span> ${values.description}</p>             
        </div> 
       `
    document.getElementById("my_modal_5").showModal()
};

//7. add to cart section:
const addToCart = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.plants)

    findCardInfo(data.plants)
}

const findCardInfo = (info) => {

    const yourCartSection = document.getElementById("your-cart");

    totalPrice += info.price;
    document.getElementById("total-price").innerText = totalPrice;

    // total is showed when add to cart clicked:
    document.getElementById("cart-summary").classList.remove("hidden")

    const cardForCalc = document.createElement("div")
    cardForCalc.innerHTML = `
        <div class="mx-2 my-3 p-2 rounded-xl bg-[#f0fdf4] flex items-center justify-between ">
        <div class="space-y-1">
        <h1 class="font-bold text-gray-700 text-base">${info.name}</h1>
        <h2><span class="font-bold text-gray-700 text-sm">Price:</span> ৳${info.price}</h2>
        </div>
        
        <button onclick="removeCart(this,${info.price})">
        <i class="fa-regular fa-circle-xmark text-xl"></i></button> 
        
         
        </div>
        `
    yourCartSection.append(cardForCalc);
}

//create remove logo in the calc cart:

const removeCart = (button, price) => {
    //remove price
    totalPrice -= price;
    document.getElementById("total-price").innerText = totalPrice

    //remove cart
    button.parentElement.remove();

    // Hide total if cart is empty
    if (totalPrice === 0) {
        document.getElementById("cart-summary").classList.add("hidden");
    }
}


