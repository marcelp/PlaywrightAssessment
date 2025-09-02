import {test, expect } from "@playwright/test";
const RequestPacketData = require("../../API/data/RequestPacketData.js");

test('Get auth token', async ({request}) => {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            username: "admin",
            password: "password123"
        }
    });

    const responseData = await response.json();
    const token = responseData.token;

    // Assert
    expect(response.status()).toBe(200);
    expect(token).toBeDefined();
});

test('Get all bookings', async ({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');    

    // Parse the response as JSON
    const bookings = await response.json();
    
    //Assert
    expect(response.status()).toBe(200);    
    expect(bookings.length).toBeGreaterThan(0);
});

test('Create a new booking', async ({request}) => {
    const bookingData = RequestPacketData.createDefaultBookingData();
    
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: bookingData
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
    const createBookingData = RequestPacketData.createDefaultBookingData();
    
    const createBookingresponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: createBookingData
    });

    const createBookingresponseData = await createBookingresponse.json();
    const bookingId = createBookingresponseData.bookingid;

    expect(createBookingresponse.status()).toBe(200);  
    expect(createBookingresponseData.bookingid).toBe(bookingId);

    //Update the booking
    const updateBookingData = RequestPacketData.createUpdatedBookingData();
    
    const updateBookingresponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        data: updateBookingData,
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
    const createBookingData = RequestPacketData.createDefaultBookingData();
    
    const createBookingresponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: createBookingData
    });

    const createBookingresponseData = await createBookingresponse.json();
    const bookingId = createBookingresponseData.bookingid;

    expect(createBookingresponse.status()).toBe(200);  
    expect(createBookingresponseData.bookingid).toBe(bookingId);

    //Now we need to delete the booking
    const deleteBookingresponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
            accept: 'application/json',
            Cookie: 'token=82e60388749a064'
        }
    });

    // Make sure the response is a 204
    expect(deleteBookingresponse.status()).toBe(201);
});