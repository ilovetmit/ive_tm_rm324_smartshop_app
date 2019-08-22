export const addToCart = (order_part, total_price, quantity) => {
    return {
        type: "ADD_TO_CART",
        order_part,
        total_price,
        quantity
        
    }
}

export const clearCart = () => {
    return {
        type: "CLEAR_CART",

    }
}

export const deleteCartItem = (name, total_price, quantity) => {
    return {
        type: "DELETE_CART_ITEM",
        name,
        total_price,
        quantity

    }
}