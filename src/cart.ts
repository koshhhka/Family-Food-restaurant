import {PositionData} from "./main";

function renderCart() {
    Object.keys(localStorage).forEach((key) => {
        let localData = localStorage.getItem(key);
        let typeCardContainer = document.querySelector('.cart');
        if (localData !== null) {
            let position: PositionData = JSON.parse(localData)
            typeCardContainer!.innerHTML += `
            <div class="card">
                        <div class="image">
                            <img src=${'./img/' + position.name + '.jpeg'}>
                        </div>
                        <p class="product_name card_text">${position.name}</p>
                        <p class="product_description card_text">${position.description}</p>
                        <div class="cost_and_cart card_text">
                            <a class="product_cost">${position.price}₽</a>
                            <a class="product_to_cart" data-product-name="${position.name}">Delete</a>
                        </div>
                    </div>
            `
        }
      });
}

function RemoveToClick () {
    document.addEventListener('click', (event:Event) => {
      const target = event.target as HTMLElement;
      let name = (target.getAttribute('data-product-name'));
      if (name !== null) {
        localStorage.removeItem(name)
      }
      })
}



renderCart();
RemoveToClick();