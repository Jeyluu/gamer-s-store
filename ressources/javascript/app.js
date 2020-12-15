//
let carts = document.querySelectorAll(".add-cart");


let products = [
    {
        name : "carte graphique 3080 vulcan",
        tag : "vulcan",
        price : 959,
        inCart : 0 //question Philipe ou Adeline car je ne comprends pas bien. Cela nous permettrait de savoir combien de fois on en a dans le panier?
    },

    {
        name : "MSI GeForce RTX 3080 GAMING X",
        tag : "gamingx",
        price : 949,
        inCart : 0 //question Philipe ou Adeline car je ne comprends pas bien. Cela nous permettrait de savoir combien de fois on en a dans le panier?
    },

    {
        name : "carte mere MSI Gaming edge AC",
        tag : "edgeac",
        price : 160,
        inCart : 0 //question Philipe ou Adeline car je ne comprends pas bien. Cela nous permettrait de savoir combien de fois on en a dans le panier?
    },

    {
        name : "carte mere MSI MPG B550 GAMING PLUS",
        tag : "MPGB550",
        price : 165,
        inCart : 0 //question Philipe ou Adeline car je ne comprends pas bien. Cela nous permettrait de savoir combien de fois on en a dans le panier?
    },

    {
        name : "Intel Core i9-10980XE Extreme Edition",
        tag : "I9ExtEd",
        price : 1250,
        inCart : 0 //question Philipe ou Adeline car je ne comprends pas bien. Cela nous permettrait de savoir combien de fois on en a dans le panier?
    },
    
    {
        name : "Antec NX210",
        tag : "boitier",
        price : 54,
        inCart : 0 //question Philipe ou Adeline car je ne comprends pas bien. Cela nous permettrait de savoir combien de fois on en a dans le panier?
    },
]

//Boucle pour recuperer tous les boutons ajouter au panier
for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener("click", () => { //voir avec Philippe ou Adeline ce que veut dire le =>
        // permet de recuperer tous les boutons de class .add-carts
        cartNumbers(products[i]);
        //Dans le cartNumber je veux passer les produits donc je mets la variable Products créer plus haut et I pour que cela affecte toute la boucle

        totalCost(products[i]);
})
}

//Quand je raffraichis ma page tout disparait dans le panier mais pas dans le localstorage. Pour eviter que dans le panier cela disparaisse. je fais la fonction ci-dessous. Cela me permettra de verifier s'il y a des données existantes dans le localstorage
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if(productNumbers) {
        document.querySelector(".cart span").textContent = productNumbers;
    }

}

//fonction pour savoir combien d'article j'ai dans mon panier

function cartNumbers(product){//Le fait de mettre product ici nous permet d'avoir les données entrées dans la tableau lors de la déclaration de la variable products

    
    //Quand je clique sur ajouter au panier cela me donne un chiffre de type string
    let productNumbers = localStorage.getItem("cartNumbers");
    
    //Il me faut le convertir en nombre sinon la console affichera NaN et cela ne pourra pâs etre comptabiliser dans le local storage.
    productNumbers = parseInt(productNumbers);
    
    //Si il y a deja un produit dans le localstorage (panier) il faudra faire si je clique sur ajouter au panier +1 pour ne pas ecraser le précédent.

    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1)
        document.querySelector(".cart span").textContent = productNumbers + 1; //Cette ligne signifie que quand je clique sur ajouter un objet au panier. Je selectionne dans la class .cart le span et je lui ajoute le nombre de produit (productNumbers +1)
    } else {// sinon simplement 1
        localStorage.setItem("cartNumbers",1);
        document.querySelector(".cart span").textContent = 1;//s'il y n'y a pas de produit dans le panier alors Je selectionne dans la class .cart le span et je lui ajoute le nombre de produit selectionner à l'instant (1)
    }
    setItems(product);                  //on a pris le (product) dans la boucle puis dans la fonction cartNumber.
}

function setItems(product) {            //l'idée de la fonction ici est d'avoir la valeur de l'objet que nous avons ajouter au panier c'est à dire le product tag comme appelé ci-dessous + les infos produits du tableau.

    let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        //cette ligne sert a changer le style du code de JSON à Javascript dans la console.
    
    
    //La condition ci-dessous est le fait que dans le localstorage on puisse ajouter plusieurs fois le même article et qu'il soit compté dans le panier x fois. Cependant, en finalité il y a un autre problème qui est que nous pouvons selectionner un autre article mais il ne s'affiche pas dans le localstorage. 
    if(cartItems != null) {
        
        if(cartItems[product.tag] == undefined) { //Pour pouvoir choisir un autre article et qu'il s'affiche
            cartItems = {
                ...cartItems,
                [product.tag]: product //revoir cette partie asap pas compris
            }
        }

        cartItems[product.tag].inCart += 1; 
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
    }
    

    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
    //Si nous passons le code dans le localstorage sans JSON.Stringify(cartItem) cela n'affichera pas le tag + produit mais apparaitra en object - object.
    //Il faut donc le traduiure en chaine de charactère JSON.
}

function totalCost(product) {
        
    
    let cartCost = localStorage.getItem("totalCost");
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);
    
    

    if(cartCost != null) {

        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price);
        
    } else {

        localStorage.setItem("totalCost", product.price);

    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");//si cet element existe sur la page la condition ci-dessous va s'executer.
    let cartCost = localStorage.getItem("totalCost"); 

    if(cartItems && productContainer){
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="article-line">
                
                <i class="delete fas fa-times-circle"></i>
                <div class="product">
                <img src="./ressources/images/${item.tag}.jpg">
                <span>${item.name}</span>
                </div>

                <div class="price">${item.price}</div>
                
                <div class="quantity">
                <ion-icon class="decrease" name="caret-back-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon  class="increase"name="caret-forward-circle"></ion-icon>
                </div>
                <div class="total">
                    ${item.inCart * item.price},00
                </div>
            </div>
            `
        });

            productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                Panier Total :
                </h4>
                <h4 class="basketTotal">
                €${cartCost},00
                </h4>
            </div>
            `

    }
}

onLoadCartNumbers(); // J'appelle la fonction créer au dessus sinon elle ne tournera pas.
displayCart();

let supLine = document.querySelectorAll(".delete")


for(i = 0; i < supLine.length; i++) {
    supLine[i].addEventListener("click",supressionLigne)
    
    function supressionLigne(e){
        if (e.target.classList.contains("delete")){
            if(confirm("Etes vous sûr de vouloir supprimer cet article du panier?"))
            e.target.parentElement.remove();
            }
        
        
    }
}

let increaseQty = document.querySelectorAll(".increase");
let decreaseQty = document.querySelectorAll(".decrease");
    
for(i = 0; i <increaseQty.length; i++){
    increaseQty[i].addEventListener("click",oneQty);

    function oneQty(e){
        if(e.target.classList.contains("increase")) {
            //Faire l'ajout des quantités
        }
    }
}
