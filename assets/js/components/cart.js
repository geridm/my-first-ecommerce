function cart (db, printProducts) {
  // Elementos del DOM 
  const productsDOM = document.querySelector('.products__container')
  const notifyDOM = document.querySelector('.notify')
  const cartDOM = document.querySelector('.cart__body')
  const countDOM = document.querySelector('.cart__count--item')
  const totalDOM = document.querySelector('.cart__total--item')
  const checkoutDOM = document.querySelector('.btn--buy')
  const productModal = document.getElementById("product-modal");
  const closeModalButton = document.getElementById("close-modal");
  const modalContent = document.querySelector(".modal__content");

  let cart = []
  
  // Funciones 
  function printCart () {
    let htmlCart = ''

    if (cart.length === 0) {
      htmlCart += `
      <div class="cart__empty">
        <i class="bx bx-cart"></i>
        <p class="cart__empty--text">No hay productos en el carrito</p>
      </div>
      `
      notifyDOM.classList.remove('show--notify')
    } else {
      for (const item of cart) {
        const product = db.find(p => p.id === item.id)
        htmlCart += `
        <button class="modal__close-button" id="close-modal">
          <i class="bx bx-x"></i>
        </button>
        <article class="article">
          <div class="article__image">
            <img
              src="${product.image}"
              alt="${product.name}"
            />
          </div>
          <div class="article__content">
            <h3 class="article__title">
              ${product.name}
            </h3>
            <span class="article__price">$${product.price}</span>
            <div class="article__quantity">
              <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                <i class='bx bx-minus' ></i>
              </button>
              <span class="article__quantity-text">${item.qty}</span>
              <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                <i class='bx bx-plus' ></i>
              </button>
            </div>
            <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
              <i class='bx bx-trash' ></i>
            </button>
          </div>
        </article>
        `
      }
      
      notifyDOM.classList.add('show--notify')
    }

    cartDOM.innerHTML = htmlCart
    notifyDOM.innerHTML = showItemsCount()
    countDOM.innerHTML = showItemsCount()
    totalDOM.innerHTML = showTotal()
  }

  function addToCart(id, qty = 1) {
    const productFinded = db.find(p => p.id === id);
    const availableQuantity = productFinded.quantity;
    const itemFinded = cart.find(i => i.id === id);

    if (itemFinded) {
      // Verifica si agregarlo excede la cantidad disponible
      if (itemFinded.qty + qty > availableQuantity) {
        Swal.fire({
          icon: 'error',
          title: 'Cantidad Excedida',
          text: 'La cantidad solicitada excede la cantidad disponible.',
          confirmButtonText: 'Aceptar'
        });
      } else {
        itemFinded.qty += qty;
      }
    } else {
      // Verifica si agregarlo excede la cantidad disponible
      if (qty > availableQuantity) {
        Swal.fire({
          icon: 'error',
          title: 'Cantidad Excedida',
          text: 'La cantidad solicitada excede la cantidad disponible.',
          confirmButtonText: 'Aceptar'
        });
      } else {
        cart.push({id, qty});
      }
    }

    printCart();
  }

  function removeFromCart (id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id)
    const result = itemFinded.qty - qty

    if (result > 0) {
      itemFinded.qty -= qty
    } else {
      cart = cart.filter(i => i.id !== id)
    }
    
    printCart()
  }

  function deleteFromCart(id) {
    cart = cart.filter(i => i.id !== id)

    printCart()
  }

  function showItemsCount() {
    let suma = 0
    for (const item of cart) {
      suma += item.qty
    }
    return suma
  }

  function showTotal() {
    let total = 0
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      total += item.qty * productFinded.price 
    }
    return total
  }

  function checkout() {
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      productFinded.quantity -= item.qty
    }

    cart = []
    printCart()
    printProducts()
      Swal.fire({
        title: "Compra Procesada",
        text: "¡Gracias por tu compra!",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
      clearCart();
     
  }

  printCart()

  // Eventos 
  productsDOM.addEventListener('click', function (e) {
    if (e.target.closest('.add--to--cart')) {
      const id = +e.target.closest('.add--to--cart').dataset.id
      addToCart(id)
    }
    if (e.target.closest('.show--modal--details')) {
      const id = +e.target.closest('.show--modal--details').dataset.id
      console.log('el q voy a pasar es ', id)
      showModal(id);
    }
  })

  closeModalButton.addEventListener("click", () => {
    productModal.style.display = "none";
    modalContent.innerHTML = ""; // Limpia el contenido del modal al cerrarlo
  });

  function showModal(id) {
    console.log('details ,',id )
    
    let cartd = []
    let htmlCart = ''
    let htmlCart2 = ''
    console.log('cartd ,',cartd )

    
      const productd = db.find(p => p.id === id)
      
    htmlCart2 += `
      <div class="div_papa_boton">
        <button type="button" class="modal__close-btn">
          <i class="bx bx-x"></i>
        </button>
      </div>
      <div class="modal__image">
        <img src="${productd.image}" alt="${productd.name}">

        <button type="button" class="modal__btn modal--close">
          <i class="uil uil-times"></i>
        </button>
        <button class="modal__add-to-cart" data-id="${productd.id}">
          <i class="bx bx-cart-add"></i></i> Agregar al carrito
        </button>
      </div>
      <div class="modal__content">
        <div class="modal__head">
          <h2 class="modal__title">${productd.name}</h2>
          <span class="modal__sku">SKU: SUDAMLOU231</span>
          <span class="modal__price">$${productd.price}</span>
        </div>
        <div class="modal__details">
          <p class="modal__description">${productd.description}</p>
          <span class="modal__category">${productd.category}</span>
          <span class="modal__stock">Disponibles: ${productd.quantity}</span>
        </div>
      </div>
      `
    modalContent.innerHTML = htmlCart2
    const modalCloseBtn = modalContent.querySelector('.modal__close-btn');
    modalCloseBtn.addEventListener('click', closeModal);
    
    productModal.style.display = "flex";
  }

  function closeModal() {
    productModal.style.display = "none";
  }  

  modalContent.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal__add-to-cart")) {
      const id = +e.target.dataset.id;
      addToCart(id);
      productModal.style.display = "none"; 
    }
  });

  cartDOM.addEventListener('click', function (e) {
    if (e.target.closest('.article--minus')) {
      const id = +e.target.closest('.article--minus').dataset.id
      removeFromCart(id)
    }

    if (e.target.closest('.article--plus')) {
      const id = +e.target.closest('.article--plus').dataset.id
      addToCart(id)
    }

    if (e.target.closest('.remove-from-cart')) {
      const id = +e.target.closest('.remove-from-cart').dataset.id
      deleteFromCart(id)
    }
    
  })

  checkoutDOM.addEventListener('click', function () {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito Vacío',
        text: 'Agrega productos al carrito antes de proceder con la compra.',
        confirmButtonText: 'Aceptar'
      });
    } else {
      checkout();
    }
  })
}

export default cart