import {test, expect } from "@playwright/test";

test('Get all bookings', async ({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');    

    // Parse the response as JSON
    const bookings = await response.json();
    
    //Assert
    expect(response.status()).toBe(200);    
    expect(bookings.length).toBeGreaterThan(0);
});

test('Create a new booking', async ({request}) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            firstname: "John",
            lastname: "Doe",
            totalprice: 123,
            depositpaid: true,
            bookingdates: {
                checkin: "2023-01-01",
                checkout: "2023-01-02"
            },
            additionalneeds: "Breakfast"
        }
    });

    const responseData = await response.json();
    const bookingId = responseData.bookingid;

    //Assert
    expect(response.status()).toBe(200);  
    expect(responseData.bookingid).toBe(bookingId);
    expect(responseData.booking.firstname).toBe("John");
    expect(responseData.booking.lastname).toBe("Doe");
    expect(responseData.booking.totalprice).toBe(123);
    expect(responseData.booking.depositpaid).toBe(true);
});

test('Update a booking', async ({request}) => {
    //Create a booking and store the bookingId in a variable
    const createBookingresponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            firstname: "John",
            lastname: "Doe",
            totalprice: 123,
            depositpaid: true,
            bookingdates: {
                checkin: "2023-01-01",
                checkout: "2023-01-02"
            },
            additionalneeds: "Breakfast"
        }
    });

    const createBookingresponseData = await createBookingresponse.json();
    const bookingId = createBookingresponseData.bookingid;

    expect(createBookingresponse.status()).toBe(200);  
    expect(createBookingresponseData.bookingid).toBe(bookingId);

    //Update the booking
    const updateBookingresponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        data: {
            firstname: "Jane",
            lastname: "Doe",
            totalprice: 456,
            depositpaid: false,
            bookingdates: {
                checkin: "2023-01-03",
                checkout: "2023-01-04"
            },
            additionalneeds: "Dinner"
        },
        headers: {
            accept: 'application/json',
            Cookie: 'token=6b149390e60bd6b'
        }
    });

    // Make sure the response is a 200
    expect(updateBookingresponse.status()).toBe(200);
    const updateBookingresponseData = await updateBookingresponse.json();
    
    // Assert the response data
    expect(updateBookingresponseData.firstname).toBe("Jane");
    expect(updateBookingresponseData.lastname).toBe("Doe");
    expect(updateBookingresponseData.totalprice).toBe(456);
    expect(updateBookingresponseData.depositpaid).toBe(false);
    expect(updateBookingresponseData.additionalneeds).toBe("Dinner");
});

test('Delete a booking', async ({request}) => {
    //Create a booking and store the bookingId in a variable
    const createBookingresponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            firstname: "John",
            lastname: "Doe",
            totalprice: 123,
            depositpaid: true,
            bookingdates: {
                checkin: "2023-01-01",
                checkout: "2023-01-02"
            },
            additionalneeds: "Breakfast"
        }
    });

    const createBookingresponseData = await createBookingresponse.json();
    const bookingId = createBookingresponseData.bookingid;

    expect(createBookingresponse.status()).toBe(200);  
    expect(createBookingresponseData.bookingid).toBe(bookingId);

    //Now we need to delete the booking
    const deleteBookingresponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
            accept: 'application/json',
            Cookie: 'token=6b149390e60bd6b'
        }
    });

    // Make sure the response is a 204
    expect(deleteBookingresponse.status()).toBe(201);
});