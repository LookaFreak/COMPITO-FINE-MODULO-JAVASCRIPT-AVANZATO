// backoffice.js
const productList = document.getElementById('productList');
const addProductBtn = document.getElementById('addProductBtn');

// Function to fetch and display products
// Function to fetch and display products
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

            productCard.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <p>Description: ${product.description}</p>
                <p>Brand: ${product.brand}</p>
                <p>Price: ${product.price}</p>
                <button onclick="editProduct('${product._id}')">Edit</button>
                <button onclick="deleteProduct('${product._id}')">Delete</button>
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

// Function to edit a product
function editProduct(productId) {
    // Implement edit functionality
}

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

// Function to edit a product
function editProduct(productId) {
    const newName = prompt("Enter new name for the product:");
    const newDescription = prompt("Enter new description for the product:");
    const newBrand = prompt("Enter new brand for the product:");
    const newImageUrl = prompt("Enter new image URL for the product:");
    const newPrice = parseFloat(prompt("Enter new price for the product:"));

    const updatedProduct = {
        name: newName,
        description: newDescription,
        brand: newBrand,
        imageUrl: newImageUrl,
        price: newPrice
    };

    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzOWNmODI0ZjYwNTAwMTkzN2Q0YjEiLCJpYXQiOjE3MDgzNzMyMTksImV4cCI6MTcwOTU4MjgxOX0.U6GAT7yA7q6-HubdnithUMPIKZuXR0X1FKJRFRV9wQw'
        },
        body: JSON.stringify(updatedProduct)
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
