/**
 * Test data for inventory page tests
 */
class InventoryTestData {
    
    /**
     * Expected item names in default order (A-Z)
     */
    static getExpectedItemNamesAscending() {
        return [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)'
        ];
    }

    /**
     * Expected item names in descending order (Z-A)
     */
    static getExpectedItemNamesDescending() {
        return [
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Onesie',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Bike Light',
            'Sauce Labs Backpack'
        ];
    }

    static getExpectedItemNames() {
        return [
            'Sauce Labs T-Shirt (Red)',
            'Sauce Labs Onesie',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Bike Light',
            'Sauce Labs Backpack'
        ];
    }

    /**
     * Expected prices sorted low to high
     */
    static getExpectedPricesLowToHigh() {
        return [
            '$7.99',
            '$9.99',
            '$15.99',
            '$15.99',
            '$29.99',
            '$49.99'
        ];
    }

    /**
     * Expected prices sorted high to low
     */
    static getExpectedPricesHighToLow() {
        return [
            '$49.99',
            '$29.99',
            '$15.99',
            '$15.99',
            '$9.99',
            '$7.99'
        ];
    }

    /**
     * Expected item descriptions in default order
     */
    static getExpectedItemDescriptions() {
        return [
            'This is a backpack with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
            "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
            "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
            "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
            "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
            "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton."
        ];
    }

    /**
     * Get list of items
     */
    static getTestCartItems() {
        return {
            backpack: 'Sauce Labs Backpack',
            bikeLight: 'Sauce Labs Bike Light',
            tshirt: 'Sauce Labs Bolt T-Shirt',
            jacket: 'Sauce Labs Fleece Jacket',
            onesie: 'Sauce Labs Onesie',
            redTshirt: 'Sauce Labs T-Shirt (Red)'
        };
    }

    /**
     * Expected total inventory count
     */
    static getExpectedInventoryCount() {
        return 6;
    }
}

export default InventoryTestData;
