/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
    let totalByCategory = [];
	let tempObj = {};

    transactions.forEach(transaction => {
		if (transaction.category in tempObj) {
			tempObj[transaction.category] += transaction.price;
		} else {
			tempObj[transaction.category] = transaction.price;
		}
	});

    console.log(tempObj);

	for (category in tempObj) {
		totalByCategory.push({category: category, totalSpent: tempObj[category]});
	}

	return totalByCategory
}

module.exports = calculateTotalSpentByCategory;
