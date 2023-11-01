// Personal Care & Baby(93769) -> 420
// Laundry & Cleaning(93779) -> 523
// Home & Kitchen(93775) -> 256

// Frozen(93784) -> 1013
// Beverages(93770) -> 1635
// Snacks & Sweets(93780) -> 1352




(async()=>{
    const catIds = {
        // "93769":420,
        // "93779":523,
        // "93775":256,
        // "93784":1013,
        "93770":1635,
        // "93780":1352
    }
    const products = {};
    const productIds = {};
    for(let i=0; i<Object.keys(catIds).length; i++){
        const catId = Object.keys(catIds)[i];
        const size = catIds[catId];
        // divid size into 100 or less than 100 array
        const sizes = [];
        let count = size;
        while(count > 100){
            sizes.push(100);
            count -= 100;
        }
        sizes.push(count);
        // get products
        for(let j=0; j<sizes.length; j++){
            const size = sizes[j];
            const startFrom = j==0?0:sizes.slice(0,j).reduce((a,b)=>a+b,0);
            const res = await fetch(`https://shop.brooklynfare.com/v2/retailers/1422/branches/2183/categories/${catId}/products?appId=4&from=${startFrom}&languageId=2&minScore=0&size=${size}`, {
                "credentials": "omit",
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
                    "Accept": "application/json, text/plain, */*",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Pathname": `/categories/${catId}/products`,
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                },
                "referrer": `https://shop.brooklynfare.com/categories/${catId}/products`,
                "method": "GET",
                "mode": "cors"
            });
            const data = await res.json();
            data.products.map((product)=>{
                const productId = product.productId;
                // productIds[productId] = (productIds[productId] || 0) + 1;
                products[productId] = product;
            })
            // products.push(...data.products);
            console.log(`${i+1}/${Object.keys(catIds).length}::: ${j+1}/${sizes.length}`)
        }
        console.log();
    }
    console.log(Object.keys(products).length,products);
    // await fetch("https://shop.brooklynfare.com/v2/retailers/1422/branches/2183/categories/93775/products?appId=4&from=0&languageId=2&minScore=0&size=256", {
    //     "credentials": "omit",
    //     "headers": {
    //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
    //         "Accept": "application/json, text/plain, */*",
    //         "Accept-Language": "en-US,en;q=0.5",
    //         "Sec-Fetch-Dest": "empty",
    //         "Sec-Fetch-Mode": "no-cors",
    //         "Sec-Fetch-Site": "same-origin",
    //         "Pathname": "/categories/93817/products",
    //         "Pragma": "no-cache",
    //         "Cache-Control": "no-cache"
    //     },
    //     "referrer": "https://shop.brooklynfare.com/categories/93817/products",
    //     "method": "GET",
    //     "mode": "cors"
    // });
})();



