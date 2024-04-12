document.addEventListener('DOMContentLoaded', function () {
    let productsData = [];
    const productsContainer = document.getElementById('products-container');

    const searchInput = document.getElementById('search');

    const sortSelect = document.getElementById('sort');



    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            productsData = data;
            displayProducts(productsData);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });





    sortSelect.addEventListener('change', () => {
        const sortedProducts = sortProducts(productsData, sortSelect.value);
        displayProducts(sortedProducts);
    });




    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.trim().toLowerCase();
        const filteredProducts = filterProducts(productsData, searchValue);
        displayProducts(filteredProducts);
    });




    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
    }




    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        productElement.appendChild(imageElement);

        const titleElement = document.createElement('h3');
        titleElement.textContent = product.title;
        productElement.appendChild(titleElement);

        const priceElement = document.createElement('p');
        priceElement.textContent = `$${product.price}`;
        productElement.appendChild(priceElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = product.description;
        productElement.appendChild(descriptionElement);

        return productElement;
    }

    function sortProducts(products, sortBy) {
        if (sortBy === 'price_asc') {
            return products.slice().sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
            return products.slice().sort((a, b) => b.price - a.price);
        }
    }

    function filterProducts(products, searchValue) {
        return products.filter(product =>
            product.title.toLowerCase().includes(searchValue) ||
            product.description.toLowerCase().includes(searchValue)
        );
    }


});
