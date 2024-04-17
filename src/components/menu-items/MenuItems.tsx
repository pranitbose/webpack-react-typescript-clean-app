import { Item } from "@app/components/item";
import { useCartItems, type CartItem } from "@app/hooks/useCartItems";
import { type ReactElement } from "react";
import { FaShoppingCart } from "react-icons/fa";

const MenuItems = (): ReactElement => {
    const items = getAllItems();
    const [cartItems, updateCartItems] = useCartItems([]);
    const totalCartItems = cartItems.length;

    const updateCart = (itemId: number, newQuantity: number): void => {
        updateCartItems(items, itemId, newQuantity);
    };

    return (
        <>
            <h1 className="cart-info-header">
                <span>Street Foods Menu</span>
                <div className="cart-icon">
                    <FaShoppingCart />
                    <span className="badge">{totalCartItems}</span>
                </div>
            </h1>
            {items?.length > 0 &&
                items.map(item => (
                    <section key={item.id}>
                        <Item
                            id={item.id}
                            price={item.price}
                            description={item.description}
                            updateCart={updateCart}
                        />
                    </section>
                ))}
        </>
    );
};

const getAllItems = (): CartItem[] => {
    const pizza: CartItem = {
        id: 1,
        price: 500,
        quantity: 0,
        description: "Pizza"
    };
    const burger: CartItem = {
        id: 2,
        price: 300,
        quantity: 0,
        description: "Burger"
    };
    return [pizza, burger];
};

export { MenuItems };
