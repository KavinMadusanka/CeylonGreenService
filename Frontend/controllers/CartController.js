import Cart from '../models/CartModel.js';

// Add to cart
export const addToCart = async (req, res) => {
    try {
        let cart = await Cart.findOne();

        if (!cart) {
            cart = new Cart();
        }

        const { product, quantity } = req.body;

        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === product);

        if (itemIndex !== -1) {
            cart.cartItems[itemIndex].quantity += quantity;
        } else {
            cart.cartItems.push({ product, quantity });
        }

        await cart.save();
        res.status(201).json({ success: true, data: cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}; 

// Get cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne()
            .populate({
                path: 'cartItems.product',
                populate: {
                    path: 'category',
                    select: 'name'
                }
            });
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


// Update cart item quantity by ID
export const updateCartItemQuantity = async (req, res) => {
    try {
        const { itemId } = req.params; // Extract the item ID from request parameters
        const { quantity } = req.body; // Extract the new quantity from request body

        const cart = await Cart.findOne();

        // Find the cart item by its ID
        const cartItem = cart.cartItems.find(item => item._id.toString() === itemId);

        if (cartItem) {
            // Update the quantity of the cart item
            cartItem.quantity = quantity;
            await cart.save();
            res.status(200).json({ success: true, data: cart });
        } else {
            // If the cart item with the provided ID is not found
            res.status(404).json({ success: false, error: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};



// Delete item from cart
export const deleteCartItem = async (req, res) => {
    try {
        const { itemId } = req.params; // Extract the item ID from request parameters
        const cart = await Cart.findOne();

        // Find the index of the cart item with the provided ID
        const itemIndex = cart.cartItems.findIndex(item => item._id.toString() === itemId);

        if (itemIndex !== -1) {
            // If the cart item with the provided ID is found, remove it from the cartItems array
            const deletedItem = cart.cartItems.splice(itemIndex, 1)[0]; // Remove the item and store the deleted item
            await cart.save();
            res.status(200).json({ success: true, deletedItem, data: cart });
        } else {
            // If the cart item with the provided ID is not found
            res.status(404).json({ success: false, error: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};



