/**
 * Helper class for Booking API operations
 */
class BookingApiHelper {
    
    /**
     * Base URL for the booking API
     */
    static BASE_URL = 'https://restful-booker.herokuapp.com';
    
    static async getAuthToken(request, username = "admin", password = "password123") {
        const response = await request.post(`${this.BASE_URL}/auth`, {
            data: {
                username: username,
                password: password
            }
        });

        if (response.status() !== 200) {
            throw new Error(`Authentication failed with status: ${response.status()}`);
        }

        const responseData = await response.json();
        const token = responseData.token;

        if (!token) {
            throw new Error('Token not found in authentication response');
        }

        return token;
    }    
}

module.exports = BookingApiHelper;