describe("A Harry Potter instance should have a buy method that calculates", function() {

	var harry_potter;

	beforeEach(function() {
		harry_potter = new HarryPotter();
	});

    it("when only 1 copy is sold the cost is 8 EUR (no discounts)", function() {
    	var nInput = harry_potter.buy( 1 ),
    		nExpectedResult = 8;

        expect( nInput ).toEqual( nExpectedResult );
    });

    it("when 2 different books are sold the discount is 5%", function() {
    	var nInput = harry_potter.buy( 2 ),
    		nExpectedResult = 2*7.6;

        expect( nInput ).toEqual( nExpectedResult );
    });

    it("when 3 different books are sold the discount is 10%", function() {
    	var nInput = harry_potter.buy( 3 ),
    		nExpectedResult = 3*7.2;

        expect( nInput ).toEqual( nExpectedResult );
    });

    it("when 4 different books are sold the discount is 20%", function() {
    	var nInput = harry_potter.buy( 4 ),
    		nExpectedResult = 4*6.4;

        expect( nInput ).toEqual( nExpectedResult );
    });

    it("when 5 different books are sold the discount is 25%", function() {
    	var nInput = harry_potter.buy( 5 ),
			nExpectedResult = 5*6;

        expect( nInput ).toEqual( nExpectedResult );
    });

    /*
        # [ 1st (1), 2nd (0), 3rd (0), 4th (2), 5th (0) ]
        [1,0,0,2,0] --> 3

        ## Case 1

        [0,0,0,1,0] --> 2 books (20%) --> 2 * 7.6 = 15.2
        [0,0,0,0,0] --> 1 books       --> 1 * 8 = 8

        Total: 23.2 <<<---- !! best

    */
    it("when the basket contains [ 1st (1), 2nd (0), 3rd (0), 4th (2), 5th (0) ] the final price should be 23,2 EUR (best final price grouping books and applying discounts)", function() {
    	var nInput = harry_potter.buy( [1,0,0,2,0] ),
    		nExpectedResult = 23.2;

        expect( nInput ).toEqual( nExpectedResult );
    });

    /*
        # [ 1st (1), 2nd (1), 3rd (2), 4th (2), 5th (0) ]
        [1,1,2,2,0] --> 6

        ## Case 1

        [0,0,1,1,0] --> 4 books (20%) --> 4 * 6.4 = 25.6
        [0,0,0,0,0] --> 2 books (5%)  --> 2 * 7.6 = 15.2

        Total: 40.8 <<<---- !! best

        ## Case 2

        [0,0,1,2,0] --> 3 books (20%) --> 3 * 7.2 = 21.6
        [0,0,0,1,0] --> 2 books (20%) --> 2 * 7.6 = 15.2
        [0,0,0,0,0] --> 1 books       --> 1 * 8 = 8

        Total: 44.8

    */
    it("when the basket contains [ 1st (1), 2nd (1), 3rd (2), 4th (2), 5th (0) ] the final price should be 40,8 EUR (best final price grouping books and applying discounts)", function() {
        var nInput = harry_potter.buy( [1,1,2,2,0] ),
            nExpectedResult = 40.8;

        expect( nInput ).toEqual( nExpectedResult );
    });


    /*
        # [ 1st (2), 2nd (2), 3rd (2), 4th (1), 5th (1) ]
        [2,2,2,1,1] --> 8

        ## Case 1

        [1,1,1,0,0] --> 5 books (10%) --> 5 * 6 = 30
        [0,0,0,0,0] --> 3 books (10%) --> 3 * 7.2 = 21.6

        Total: 51.6

        ## Case 2

        [1,1,1,0,1] --> 4 books (20%) --> 4 * 6.4 = 25.6
        [0,0,0,0,0] --> 4 books (20%) --> 4 * 6.4 = 25.6

        Total: 51.2 <<<---- !! best

        ## Case 3

        [1,1,1,1,1] --> 3 books (10%) --> 3 * 7.2 = 21.6
        [0,0,0,1,1] --> 3 books (10%) --> 3 * 7.2 = 21.6 //43.2
        [0,0,0,0,0] --> 2 books (5%) --> 2 * 7.6 = 15.2

        Total: 58.4
    */
    it("when the basket contains [ 1st (2), 2nd (2), 3rd (2), 4th (1), 5th (1) ] the final price should be 51,2 EUR (best final price grouping books and applying discounts)", function() {
        var nInput = harry_potter.buy( [2,2,2,1,1] ),
            nExpectedResult = 51.2;

        expect( nInput ).toEqual( nExpectedResult );
    });


    /*
        # [ 1st (1), 2nd (1), 3rd (2), 4th (1), 5th (1) ]
        [1,1,2,1,1] --> 6

        ## Case 1

        [0,0,1,1,1] --> 3 books (10%) --> 3 * 7.2 = 21.6
        [0,0,0,0,0] --> 3 books (10%) --> 3 * 7.2 = 21.6

        Total: 43.2

        ## Case 2

        [0,0,1,0,1] --> 4 books (20%) --> 4 * 6.4 = 25.6
        [0,0,0,0,0] --> 2 books (10%) --> 2 * 7.6 = 15.2

        Total: 40.8

        ## Case 3

        [0,0,1,0,0] --> 5 books (25%) --> 5 * 6 = 30
        [0,0,0,0,0] --> 1 books (10%) --> 1 * 8 = 8

        Total: 38 <<<---- !! best
    */

    it("when the basket contains [ 1st (1), 2nd (1), 3rd (2), 4th (1), 5th (1) ] the final price should be 38 EUR (best final price grouping books and applying discounts)", function() {
        var nInput = harry_potter.buy( [1,1,2,1,1] ),
            nExpectedResult = 38;

        expect( nInput ).toEqual( nExpectedResult );
    });

    /*
        # [ 1st (3), 2nd (3), 3rd (3), 4th (1), 5th (0) ]
        [3,3,3,1,0] --> 10

        ## Case 1

        [2,2,2,0,0] --> 4 books (20%) --> 4 * 6.4 = 25.6
        [1,1,1,0,0] --> 3 books (10%) --> 3 * 7.2 = 21.6
        [0,0,0,0,0] --> 3 books (10%) --> 3 * 7.2 = 21.6

        Total: 68.8

    */
    it("when the basket contains [ 1st (3), 2nd (3), 3rd (3), 4th (1), 5th (0) ] the final price should be 38 EUR (best final price grouping books and applying discounts)", function() {
        var nInput = harry_potter.buy( [3,3,3,1,0] ),
            nExpectedResult = 68.8;

        expect( nInput ).toEqual( nExpectedResult );
    });
});