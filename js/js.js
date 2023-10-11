document.addEventListener("DOMContentLoaded", () => {
    fetch("https://api.escuelajs.co/api/v1/products").then(response => response.json()).then(result => render(result))
})
let productsGlobal;
async function render(products) {
    console.log(products)
    productsGlobal = products
    const categoryes = await getCategoryes()
    console.log(categoryes);
    for (let index = 0; index < products.length; index++) {
        renderItem(products[index].id, products[index].category.name, products[index], index, categoryes)
    }
}
function renderItem(id, category, item, index, categoryes) {
    const div = document.getElementById("categories")
    const categor = categoryes.find(cat => cat.name === category)
    const divCat = document.getElementById(categor.id + categor.name)
    const divcz = document.getElementById("cate")

    if (divCat) {

        divCat.insertAdjacentHTML(`beforeend`, `<div class="div1" onclick="my6(${index})"><p class="title">${item.title}</p><img src="${item.images[0]}" class="img"><p class="price">${item.price}$</p></div>`)
    } else {
        divcz.insertAdjacentHTML(`beforeend`, `<button class="but" onclick="testFunc(${categor.id})">${categor.name}</button>`);
        div.insertAdjacentHTML("beforeend", `
            <div class="productsCat" id='${categor.id + categor.name}'<p class="zag">${categor.name}
           </p></div>
        `)
        const divCat = document.getElementById(categor.id + categor.name)
        divCat.insertAdjacentHTML(`beforeend`, `<div class="div1" onclick="my6(${index})"><p class="title">${item.title}</p><img src="${item.images[0]}" class="img"><p class="price">${item.price}$</p></div>`)
    }

}
const getCategoryes = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories", {
        method: "GET"
    })
    if (response.ok) {
        const result = await response.json()
        return result

    }
}
async function testFunc(id) {
    const category = (await getCategoryes()).find(elem=> elem.id == id)

    document.querySelectorAll(".productsCat").forEach(elem=>{
        if(elem.id == `${category.id + category.name}`){
            elem.classList.toggle("visible")
        } else {
            elem.classList.remove("visible")
        }
    })
}


