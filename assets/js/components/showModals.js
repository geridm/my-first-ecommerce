function showModals (db) {
  const detailButtons = document.querySelectorAll(".product_btn_detalle");
  const productModal = document.getElementById("product-modal");
  const closeModalButton = document.getElementById("close-modal");
  const modalContent = document.querySelector(".modal__content");

  detailButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log('tiene evento click')
      const product = products[index]; 
      showModal(product);
    });
  });
  
  closeModalButton.addEventListener("click", () => {
    productModal.style.display = "none";
    modalContent.innerHTML = ""; 
  });

  function showModal(product) {
    modalContent.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}" class="modal__image">
      <p>${product.description}</p>
      <!-- Agrega más detalles del producto aquí -->
    `;
    
    productModal.style.display = "flex";
  }
}

export default showModals