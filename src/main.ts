export interface PositionData {
  type: string;
  name: string;
  description: string; // Note: corrected from 'desription' to 'description'
  price: number;
}

// Fetch the JSON data asynchronously
async function fetchData(): Promise<PositionData[]> {
  const response = await fetch('./data/data.json');
  const jsonData: PositionData[] = await response.json();
  return(jsonData)
}

function viewCards (listPositions: PositionData[]) {
  listPositions.forEach(position => {
    let typeCardContainer = document.querySelector('.' + position.type)
    typeCardContainer!.innerHTML += `
    <div class="card">
                <div class="image">
                    <img src=${'./img/' + position.name + '.jpeg'}>
                </div>
                <p class="product_name card_text">${position.name}</p>
                <p class="product_description card_text">${position.description}</p>
                <div class="cost_and_cart card_text">
                    <a class="product_cost">${position.price}₽</a>
                    <a class="product_to_cart" data-product-name="${position.name}">Add to the cart</a>
                </div>
            </div>
    `
  })
}
async function main() {
  try {
      let positions: PositionData[] = await fetchData();
      viewCards(positions);
      getToClick(positions)
  } catch (error) {
      console.error('An error occurred:', error);
  }
  
}
function getToClick (positions: PositionData[]) {
  document.addEventListener('click', (event:Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('product_to_cart')) {
      let name = (target.getAttribute('data-product-name'));
      positions.forEach(position => {
        if (position.name == name) {
          localStorage.setItem(name, JSON.stringify(position))
        }
      })
    }
  })
}
main();
/*let positions: PositionData[] = await fetchData();
viewCards(positions)
fetchData()*/