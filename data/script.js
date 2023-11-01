import {allProducts} from './currentProducts.js';
const productWithCategoriesOnly = ()=>{
    const ids = Object.keys(allProducts);
    let allCategories = {};
    for(let i=0;i<ids.length;i++){
        const id = ids[i];
        const product = allProducts[id];
        const categories = product.family.categories.map((cat)=>cat.names['2']);
        allCategories[categories[2]] = [228];
    }
    console.log(allCategories,ids.length)
}
// productWithCategoriesOnly();

const demoProduct = {
	"0": {
		"image": {
			"id": 1292363,
			"url": "https://d226b0iufwcjmj.cloudfront.net/product-images/global/2392054/1292363/{{size}}.{{extension||'jpg'}}",
			"source": 2,
			"isSilent": false,
			"tag": "Corrados Denville 1357 Sholom July 14 2020",
			"isDefault": true,
			"typeId": 1,
			"classification": "Front",
			"uploadedOn": "2020-07-27T13:53:19.300",
			"backupPath": "1595857754682/b261be4ec5231f3a4c50496161b31c"
		},
		"isOnHomePageCarousel": false,
		"original": {
			"isWeighable": false
		},
		"productId": 2392054,
		"isPrivate": false,
		"unitResolution": 1,
		"retailerId": 1422,
		"isWeighable": false,
		"localBarcode": "0004113700537",
		"localName": "Dura Crackleflme",
		"activeDays": 20,
		"names": {
			"2": {
				"short": "Fire Log Indoor & Outdoor",
				"long": "Fire Log Indoor & Outdoor"
			}
		},
		"numberOfItems": 1,
		"isSuggested": false,
		"lastReview": "2023-05-02T04:26:46.807Z",
		"id": 9532079,
		"_indexTimestamp": "2023-10-20T23:38:06.227Z",
		"family": {
			"id": 88,
			"retailerId": null,
			"names": {
				"2": {
					"name": "BBQ & Picnic"
				}
			},
			"searchKeywords": [],
			"categoriesPaths": [
				[
					{
						"id": 93775,
						"names": {
							"2": "Home & Kitchen",
							"3": "\tArtículos Del Hogar Y Ocio\t"
						},
						"keywords": []
					},
					{
						"id": 93817,
						"names": {
							"2": "Home",
							"3": "Casa"
						},
						"keywords": []
					},
					{
						"id": 93974,
						"names": {
							"2": "BBQ & Picnic",
							"3": "\tBarbacoa\t"
						},
						"keywords": []
					}
				]
			],
			"categories": [
				{
					"id": 93775,
					"names": {
						"2": "Home & Kitchen",
						"3": "\tArtículos Del Hogar Y Ocio\t"
					},
					"keywords": []
				},
				{
					"id": 93817,
					"names": {
						"2": "Home",
						"3": "Casa"
					},
					"keywords": []
				},
				{
					"id": 93974,
					"names": {
						"2": "BBQ & Picnic",
						"3": "\tBarbacoa\t"
					},
					"keywords": []
				}
			]
		},
		"department": {
			"id": 78427,
			"name": "GROCERY TAX A",
			"externalId": 11
		},
		"barcode": "41137005377",
		"brand": {
			"id": 27092,
			"names": {
				"2": "Duraflame"
			}
		},
		"isSubsidy": false,
		"isCoupon": false,
		"branch": {
			"id": 2183,
			"isForSaleExternal": true,
			"taxAmount": 0.08875,
			"regularPrice": 5.49,
			"isEbtEligible": false,
			"isEbtCashEligible": false,
			"isActive": true,
			"markupPercentage": 0,
			"isVisible": true,
			"posLastSellDate": "2023-10-20T00:00:00.000Z",
			"missingCounter": 0,
			"branchProductId": 16554398,
			"sellDateVisibleUntil": "2023-11-09T00:00:00.000Z",
			"aisleId": 11910,
			"aisleName": "Aisle 6",
			"aisleSort": 7
		}
	}
}

const stableProductData = ()=>{
    let results = [];
    let count = 0;
    const productsIds = Object.keys(allProducts);
    for(let i=0;i<productsIds.length;i++){
        const productId = productsIds[i];
        const product = allProducts[productId];
        const categories = product.family.categories.map((cat)=>cat.names['2']);
        const price = `${product.branch.regularPrice}`;
        const discountedprice = product.branch?.salePrice?.toString() || '';
        const sizes = (() => {
            if(product.unitOfMeasure){
                // console.log(`${product.weight} ${product.unitOfMeasure.names['2']}`);
                return `${product.weight} ${product.unitOfMeasure.names['2']}`;
            }else{
                return `${product.numberOfItems} ${product.original.isWeighable?'lb':'pc'}`;
                // console.log(`${product.names['2'].long}::${product.numberOfItems} ${product.original.isWeighable?'lb':'pc'}`);
                // count++
            }
        })();
        const productImage = (()=>{
            if(product.image){
                return [product.image.url.replace('{{size}}','large').replace('{{extension||\'jpg\'}}','jpg')];
            }else{
                // console.log(`${product.names['2'].long}`);
                // count++
                return [];
            }
        })();
        const cat = (()=>{
            // [{"category":15,"subcategory":243}]
            let result;
            const mainCatId = 15;
            const defaultSubCatId = 228;
            //     {
            // "id": 373,
            // "name": "Vegan Snacks"
            // },
            // {
            //   "id": 358,
            //   "name": "Instant Meals"
            // },
            // {
            //     "id": 238,
            //     "name": "Ready to Cook"
            // },
            // {
            //     "id": 228,
            //     "name": "Frozen Foods"
            // },
            // {
            //     "id": 226,
            //     "name": "Poultry, Meat & Seafood"
            // },
            // {
            //     "id": 229,
            //     "name": "Bakery (Desserts & Pastries)"
            // },
            // {
            //     "id": 236,
            //     "name": "Oils, Vinegars, & Spices"
            // },
            // {
            //     "id": 237,
            //     "name": "Ready Meals"
            // },
            // {
            //     "id": 242,
            //     "name": "Bakery (Bread & Bagels)"
            // },
            // {
            //     "id": 370,
            //     "name": "Gluten Free Snacks"
            //   },
            // {
            //     "id": 373,
            //     "name": "Vegan Snacks"
            //   },
            // {
            //     "id": 234,
            //     "name": "Cereal & Breakfast"
            //   },
            // {
            //     "id": 364,
            //     "name": "Fruit & Nut Snacks"
            //   },
            // {
            //     "id": 224,
            //     "name": "Dairy & Eggs"
            //   },
            const subcats = {
                "Frozen Bread & Baked Goods": [228,242],
                "Ice Cream & Fruit Bars": [228,364],
                "Frozen Breakfast Solutions": [228,234],
                "Ice Cream Cones & Cups ": [228],
                "Ice Cream & Sorbet ": [228],
                "Ice Cream Sandwiches": [228],
                "Vegetarian Food & Vegetable Cutlets ": [228,373],
                "French Fries & Onion Rings ": [228,237],
                "Frozen Breakfast": [228,237,234],
                "Frozen Gluten Free Foods": [228,370],
                "Ices & Freeze Pops": [228],
                "Frozen Vegetables": [228],
                "Frozen Pastry & Dough": [228,229],
                "Frozen Desserts": [228,229],
                "Frozen Fruit & Concentrate": [228,364],
                "Breaded Chicken & Party Wings": [228,226],
                "Frozen Herbs & Spices": [228,236],
                "Frozen Poultry": [228,226],
                "Pasta & Dumplings": [228,237],
                "Ready Meals": [228,237],
                "Whipped Toppings & Creamers": [228],
                "Appetizers & Snacks ": [228,237],
                "Pizza": [228,238],
                "Fish Sticks & Fillets ": [228,226,238],
                "Frozen Shellfish": [228,226,238],
                "Burgers & Sausages ": [228,226,238],
            }
            for(let i=0;i<categories.length;i++){
                const cat = categories[i];
                if(subcats[cat]){
                    result = subcats[cat].map((subcat)=>({
                        category: mainCatId,
                        subcategory: subcat
                    }));
                    // console.log(result);
                    return result;
                }
            }
            // count++;
            result = [{
                category: mainCatId,
                subcategory: defaultSubCatId
            }]
            // count++;
            // console.log(result);
            return result;
        })();
        const result = {
            title : product.names['2'].long,
            description: product.names['2'].long,
            cat: cat,
            productImage: productImage,
            producInventory: [
                {
                    size: sizes || '1 pc',
                    weight: "1",
                    quantity: "1000",
                    color: "",
                    colorName: "",
                    price: price,
                    discountedprice: discountedprice,
                    salesTax: "",
                    overSized : []
                }
            ]
        }
        // console.log(result);
        results.push(result);
    }
    console.log(results)
    console.log(count)
};
stableProductData();