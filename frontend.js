// Fetch products and display them
fetch('https://striveschool-api.herokuapp.com/api/product/', {
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
.then(data => {
    const productList = document.getElementById('productList');
    const searchForm = document.getElementById('searchForm');

    // Gestore di eventi per il submit del modulo di ricerca
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previeni il comportamento predefinito del modulo
        
        // Ottieni il valore di ricerca inserito dall'utente
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        
        // Filtra i prodotti in base al valore di ricerca
        const filteredProducts = data.filter(product => 
            product.name.toLowerCase().includes(searchQuery) || 
            product.description.toLowerCase().includes(searchQuery) ||
            product.brand.toLowerCase().includes(searchQuery)
        );

        // Svuota l'elenco dei prodotti attualmente visualizzati
        productList.innerHTML = '';

        // Mostra i prodotti filtrati
        showProducts(filteredProducts);
    });

    // Mostra tutti i prodotti iniziali
    showProducts(data);

    // Gestore di eventi per il click sulle sezioni
    document.querySelectorAll('.section').forEach(item => {
        item.addEventListener('click', event => {
            const section = event.target.dataset.section;
            filterProductsBySection(section, data); // Passa i dati come parametro
        });
    });
})
.catch(error => console.error('Error fetching products:', error));

function filterProductsBySection(section, data) {
    const filteredProducts = data.filter(product => {
        const brand = product.brand.toLowerCase();
        if (section === "SmartPhone") {
            return (brand === "apple" || brand === "Samsung" || brand === "redmagic" ) ;
        } else if (section === "TV") {
            return (brand === "xiaomi" || brand === "sharp europe");
        } else if (section === "Elettrodomestici") {
            return (brand === "dyson" || brand === "rowenta");
        }
    });

    // Mostra i prodotti filtrati
    showProducts(filteredProducts);
}
// Funzione per mostrare i prodotti
function showProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-lg-4', 'col-md-6', 'mb-4');
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Price: ${product.price}</p>
                    <p class="card-text">Brand: ${product.brand}</p>
                    <a href="productpage.html?id=${product._id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}
