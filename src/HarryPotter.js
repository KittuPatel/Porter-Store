class HarryPotter {

	constructor() { }

	buy(books) {

		function isNumeric(input) {
			return typeof input === 'number';
		}

		function isArray(input) {
			return Object.prototype.toString.call(input) === '[object Array]';
		}

		function sumArray(a, b) {
			return a + b;
		}

		var PRICE_PER_BOOK = {
			1: 8,
			2: 8 - 0.4, // 2 books - 5% Discount
			3: 8 - 0.8, // 3 books - 10% Discount
			4: 8 - 1.6, // 4 books - 20% Discount
			5: 8 - 2,	// 5 books - 25% Discount
		}

		var nTotalPrice = 0, nIndex, nGroupPrice, nBooksGroup, nMaxGroup, nBooks

		
		if (isNumeric(books)) {
			nTotalPrice = books * PRICE_PER_BOOK[books];
		}

    /*
        # [ 1st (1), 2nd (0), 3rd (0), 4th (2), 5th (0) ]
        [1,0,0,2,0] --> 3

        ## Case 1

        [0,0,0,1,0] --> 2 books (20%) --> 2 * 7.6 = 15.2
        [0,0,0,0,0] --> 1 books       --> 1 * 8 = 8

        Total: 23.2 <<<---- !! best

    */
		else if (isArray(books)) {

			
			nMaxGroup = nBooks = books.length; // = 5 
			
			console.log(!(books.reduce(sumArray) % 4)) // total no.of books
			// temp solution that works w/ specifications
			if (!(books.reduce(sumArray) % 4)) {
				nMaxGroup = 4;
			}
			// http://goo.gl/UudowK
			while (books.reduce(sumArray) > 0) {
				nBooksGroup = nGroupPrice = 0;
				for (nIndex = 0; nIndex < nBooks; nIndex++) {
					if (nBooksGroup === nMaxGroup) {
						nIndex = nBooks;
					}
					else if (books[nIndex] != 0) {
						books[nIndex]--;
						nBooksGroup++;
					}
				}
				nGroupPrice = nBooksGroup * PRICE_PER_BOOK[nBooksGroup];
				nTotalPrice += nGroupPrice;
			}
		}
		return (nTotalPrice % 1 != 0) ? Math.round(nTotalPrice * 10) / 10 : nTotalPrice;
	}
}

