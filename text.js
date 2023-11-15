const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function removeDuplicates(arr) { 
	return arr.filter((item, 
		index) => arr.indexOf(item) === index); 
} 
console.log(removeDuplicates(arr));

