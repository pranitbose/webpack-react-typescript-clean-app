import { useState } from "react";

type CartItem = {
    id: number;
    price: number;
    quantity: number;
    description: string;
};

const useCartItems = (
    initialCartItems: CartItem[] = []
): readonly [
    CartItem[],
    (items: CartItem[], itemId: number, newQuantity: number) => void
] => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const updateCartItems = (
        items: CartItem[],
        itemId: number,
        newQuantity: number
    ): void => {
        const itemFound = cartItems.find(item => item.id === itemId);
        if (itemFound === undefined) {
            // add to cart
            const newCartItem = items.find(item => item.id === itemId);
            if (newCartItem !== undefined) {
                setCartItems([...cartItems, { ...newCartItem, quantity: 1 }]);
            }
        } else if (newQuantity === 0) {
            // remove from cart
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } else {
            // update item quanity in cart
            setCartItems(
                cartItems.map(item => {
                    return item.id === itemId
                        ? { ...item, quantity: newQuantity }
                        : item;
                })
            );
        }
    };

    return [cartItems, updateCartItems] as const;
};

export { useCartItems, type CartItem };
