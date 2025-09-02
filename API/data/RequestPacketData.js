/**
 * Request packet data for booking API tests
 */
class RequestPacketData {
    
    /**
     * Creates a default booking data object
     */
    static createDefaultBookingData() {
        return {
            firstname: "John",
            lastname: "Doe",
            totalprice: 123,
            depositpaid: true,
            bookingdates: {
                checkin: "2023-01-01",
                checkout: "2023-01-02"
            },
            additionalneeds: "Breakfast"
        };
    }

    /**
     * Creates a custom booking data object with specified parameters
     */
    static createCustomBookingData(firstname, lastname, totalprice, depositpaid, checkin, checkout, additionalneeds) {
        return {
            firstname,
            lastname,
            totalprice,
            depositpaid,
            bookingdates: {
                checkin,
                checkout
            },
            additionalneeds
        };
    }

    /**
     * Creates an updated booking data object for update tests
     */
    static createUpdatedBookingData() {
        return {
            firstname: "Jane",
            lastname: "Doe",
            totalprice: 456,
            depositpaid: false,
            bookingdates: {
                checkin: "2023-01-03",
                checkout: "2023-01-04"
            },
            additionalneeds: "Dinner"
        };
    }
}

module.exports = RequestPacketData;