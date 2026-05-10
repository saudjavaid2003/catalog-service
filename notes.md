{
  "name": "Pizza",
  "priceConfiguration": {
    "Size": {
      "priceType": "base",
      "availableOptions": ["Small", "Medium", "Large"]
    },
    "Crust": {
      "priceType": "aditional",
      "availableOptions": ["Thin", "Thick"]
    }
  },
  "attributes": [
    {
      "name": "Is Veg",
      "widgetType": "switch",
      "defaultValue": "true",
      "availableOptions": ["true", "false"]
    },
    {
      "name": "Spice Level",
      "widgetType": "radio",
      "defaultValue": "Medium",
      "availableOptions": ["Low", "Medium", "High"]
    }
  ]
}



toppings 
per tennat

{
  "name": "Extra Cheese",
  "price": 49,
  "tenantId": "restaurant-123",
  "image": "https://cdn.example.com/cheese.jpg"
}

// 