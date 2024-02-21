document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzOWNmODI0ZjYwNTAwMTkzN2Q0YjEiLCJpYXQiOjE3MDgzNzMyMTksImV4cCI6MTcwOTU4MjgxOX0.U6GAT7yA7q6-HubdnithUMPIKZuXR0X1FKJRFRV9wQw'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(product => {
            const productDetails = document.getElementById('productDetails');
            productDetails.innerHTML = `
                <div class="card">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Price: ${product.price}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => console.error('Error fetching product details:', error));
    } else {
        console.error('Product ID not found in URL');
    }
});
