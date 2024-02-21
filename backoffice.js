
const productList = document.getElementById('productList');
const addProductBtn = document.getElementById('addProductBtn');

function fetchProducts() {
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzOWNmODI0ZjYwNTAwMTkzN2Q0YjEiLCJpYXQiOjE3MDgzNzMyMTksImV4cCI6MTcwOTU4MjgxOX0.U6GAT7yA7q6-HubdnithUMPIKZuXR0X1FKJRFRV9wQw'
        }
    })
    .then(response => response.json())
    .then(data => {
        productList.innerHTML = '';
        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('data-product-id', product._id);

            productCard.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <p class="description">Description: ${product.description}</p>
                <p class="brand">Brand: ${product.brand}</p>
                <p class="price">Price: ${product.price}</p>
                <button onclick="showEditForm('${product._id}')">Edit</button>
                <button onclick="deleteProduct('${product._id}')">Delete</button>
                <form class="edit-product-form" data-product-id="${product._id}">
                    <label for="editName">Name:</label>
                    <input type="text" id="editName_${product._id}" name="editName"><br>
                    <label for="editDescription">Description:</label>
                    <input type="text" id="editDescription_${product._id}" name="editDescription"><br>
                    <label for="editBrand">Brand:</label>
                    <input type="text" id="editBrand_${product._id}" name="editBrand"><br>
                    <label for="editImageUrl">Image URL:</label>
                    <input type="text" id="editImageUrl_${product._id}" name="editImageUrl"><br>
                    <label for="editPrice">Price:</label>
                    <input type="number" id="editPrice_${product._id}" name="editPrice"><br>
                    <button type="button" onclick="saveProductChanges('${product._id}')">Save Changes</button>
                    <button type="button" onclick="cancelEdit('${product._id}')">Cancel</button>
                </form>
            `;
            productList.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Fetch and display products on page load
fetchProducts();

// Function to add a new product
addProductBtn.addEventListener('click', () => {
    const newProduct = {
        name: 'New Product',
        description: 'Description of the new product',
        brand: 'Brand',
        imageUrl: 'https://via.placeholder.com/150',
        price: 0
    };

    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzOWNmODI0ZjYwNTAwMTkzN2Q0YjEiLCJpYXQiOjE3MDgzNzMyMTksImV4cCI6MTcwOTU4MjgxOX0.U6GAT7yA7q6-HubdnithUMPIKZuXR0X1FKJRFRV9wQw'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (response.ok) {
            fetchProducts();
        } else {
            throw new Error('Failed to add product');
        }
    })
    .catch(error => console.error('Error adding product:', error));
});

// Function to delete a product
function deleteProduct(productId) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzOWNmODI0ZjYwNTAwMTkzN2Q0YjEiLCJpYXQiOjE3MDgzNzMyMTksImV4cCI6MTcwOTU4MjgxOX0.U6GAT7yA7q6-HubdnithUMPIKZuXR0X1FKJRFRV9wQw'
        }
    })
    .then(response => {
        if (response.ok) {
            fetchProducts();
        } else {
            throw new Error('Failed to delete product');
        }
    })
    .catch(error => console.error('Error deleting product:', error));
}

// Function to show the edit form
function showEditForm(productId) {
    const editForm = document.querySelector(`.edit-product-form[data-product-id="${productId}"]`);
    editForm.style.display = 'block';

    // Retrieve current product data and populate the edit form
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    const productName = productCard.querySelector('h2').textContent;
    const productDescription = productCard.querySelector('p.description').textContent;
    const productBrand = productCard.querySelector('p.brand').textContent;
    const productImageUrl = productCard.querySelector('img.product-image').src;
    const productPrice = productCard.querySelector('p.price').textContent;

    document.getElementById(`editName_${productId}`).value = productName;
    document.getElementById(`editDescription_${productId}`).value = productDescription;
    document.getElementById(`editBrand_${productId}`).value = productBrand;
    document.getElementById(`editImageUrl_${productId}`).value = productImageUrl;
    document.getElementById(`editPrice_${productId}`).value = parseFloat(productPrice);
}

// Function to hide the edit form
function cancelEdit(productId) {
    const editForm = document.querySelector(`.edit-product-form[data-product-id="${productId}"]`);
    editForm.style.display = 'none';
}

// Function to save product changes
function saveProductChanges(productId) {
    const editedProduct = {
        name: document.getElementById(`editName_${productId}`).value,
        description: document.getElementById(`editDescription_${productId}`).value,
        brand: document.getElementById(`editBrand_${productId}`).value,
        imageUrl: document.getElementById(`editImageUrl_${productId}`).value,
        price: parseFloat(document.getElementById(`editPrice_${productId}`).value)
    };

    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzOWNmODI0ZjYwNTAwMTkzN2Q0YjEiLCJpYXQiOjE3MDgzNzMyMTksImV4cCI6MTcwOTU4MjgxOX0.U6GAT7yA7q6-HubdnithUMPIKZuXR0X1FKJRFRV9wQw'
        },
        body: JSON.stringify(editedProduct)
    })
    .then(response => {
        if (response.ok) {
            fetchProducts();
        } else {
            throw new Error('Failed to update product');
        }
    })
    .catch(error => console.error('Error updating product:', error));
}