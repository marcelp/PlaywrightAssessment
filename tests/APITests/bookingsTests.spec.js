import {test, expect } from "@playwright/test";
import RequestPacketData from "../../API/data/RequestPacketData.js";
import BookingApiHelper from "../../API/helpers/bookingApiHelper.js";

test('Get all bookings', async ({request}) => {
    const response = await request.get(BookingApiHelper.BASE_URL + '/booking');

    // Parse the response as JSON
    const bookings = await response.json();
    
    //Assert
    expect(response.status()).toBe(200);    
    expect(bookings.length).toBeGreaterThan(0);
});

test('Create a new booking', async ({request}) => {
    const bookingData = RequestPacketData.createDefaultBookingData();
    
    const response = await request.post(BookingApiHelper.BASE_URL + '/booking', {
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
    //Get a token by calling the getauthtoken method
    const token = await BookingApiHelper.getAuthToken(request);

    //Create a booking and store the bookingId in a variable
    const createBookingData = RequestPacketData.createDefaultBookingData();
    
    const createBookingresponse = await request.post(BookingApiHelper.BASE_URL + '/booking', {
        data: createBookingData
    });

    // Check if response is valid before proceeding
    expect(createBookingresponse.status()).toBe(200);
    
    let createBookingresponseData;
    try {
        createBookingresponseData = await createBookingresponse.json();
    } catch (error) {
        console.error("Failed to parse booking response:", await createBookingresponse.text());
        throw error;
    }
    
    const bookingId = createBookingresponseData.bookingid;

    expect(createBookingresponse.status()).toBe(200);  
    expect(createBookingresponseData.bookingid).toBe(bookingId);

    //Update the booking
    const updateBookingData = RequestPacketData.createUpdatedBookingData();
    
    const updateBookingresponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        data: updateBookingData,
        headers: {
            accept: 'application/json',
            Cookie: `token=${token}`
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
    //Get a token by calling the getauthtoken method    
    const token = await BookingApiHelper.getAuthToken(request);

    //Create a booking and store the bookingId in a variable
    const createBookingData = RequestPacketData.createDefaultBookingData();
    
    const createBookingresponse = await request.post(BookingApiHelper.BASE_URL + '/booking', {
        data: createBookingData
    });

    // Check if response is valid before proceeding
    expect(createBookingresponse.status()).toBe(200);
    
    let createBookingresponseData;
    try {
        createBookingresponseData = await createBookingresponse.json();
    } catch (error) {
        console.error("Failed to parse booking response:", await createBookingresponse.text());
        throw error;
    }
    
    const bookingId = createBookingresponseData.bookingid;

    expect(createBookingresponse.status()).toBe(200);  
    expect(createBookingresponseData.bookingid).toBe(bookingId);

    //Now we need to delete the booking
    const deleteBookingresponse = await request.delete(BookingApiHelper.BASE_URL + `/booking/${bookingId}`, {
        headers: {
            accept: 'application/json',
            Cookie: `token=${token}`
        }
    });

    // Make sure the response is a 201
    expect(deleteBookingresponse.status()).toBe(201);
});