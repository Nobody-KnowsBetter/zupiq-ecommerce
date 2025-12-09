const API_URL = 'http://localhost:5001/api';

async function testFlow() {
    try {
        console.log('1. Attempting Login...');
        // Try to login with a test user
        let token;

        let loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
        });

        let data = await loginRes.json();

        if (loginRes.ok) {
            token = data.token;
            console.log('Login successful! Token:', token ? 'Received' : 'Missing');
        } else {
            console.log(`Login failed (${loginRes.status}), trying signup...`);
            let signupRes = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'Test User', email: 'test@example.com', password: 'password123' })
            });
            data = await signupRes.json();
            if (signupRes.ok) {
                token = data.token;
                console.log('Signup successful! Token:', token ? 'Received' : 'Missing');
            } else {
                throw new Error('Signup failed: ' + JSON.stringify(data));
            }
        }

        if (!token) throw new Error('Could not authenticate');

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        console.log('2. Attempting to Add to Cart...');
        const cartRes = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                productId: 1,
                productTitle: 'Test Product',
                productPrice: 99.99,
                productImage: 'http://example.com/img.jpg',
                productCategory: 'test',
                quantity: 1
            })
        });

        const cartData = await cartRes.json();
        console.log('Add to Cart Status:', cartRes.status);
        console.log('Add to Cart Response:', cartData);

        if (!cartRes.ok) {
            throw new Error('Add to cart failed: ' + JSON.stringify(cartData));
        }

        console.log('3. Fetching Cart...');
        const getCartRes = await fetch(`${API_URL}/cart`, { headers });
        const getCartData = await getCartRes.json();
        console.log('Cart Items:', getCartData.length);
        console.log('Cart Data:', JSON.stringify(getCartData, null, 2));

        if (getCartData.length > 0) {
            console.log('SUCCESS: Item added and retrieved from cart.');
        } else {
            console.error('FAILURE: Cart is empty after adding item.');
        }

    } catch (error) {
        console.error('TEST FAILED:', error.message);
    }
}

testFlow();
