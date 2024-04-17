import { useState, type ReactElement } from "react";
import { FaMinus, FaPlus, FaRupeeSign } from "react-icons/fa";

type ItemProps = {
    id: number;
    price: number;
    description: string;
    updateCart: (itemId: number, newQuantity: number) => void;
};

const Item = ({
    id,
    price,
    description,
    updateCart
}: ItemProps): ReactElement => {
    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = (): void => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateCart(id, newQuantity);
    };

    const decreaseQuantity = (): void => {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        updateCart(id, newQuantity);
    };

    return (
        <div className="item-action-row">
            <p className="item-info">
                {description}
                <span>&nbsp;-&nbsp;</span>
                <FaRupeeSign />
                {price}
            </p>
            {quantity > 0 ? (
                <div className="action-btn-wrapper">
                    <FaMinus onClick={decreaseQuantity} />
                    <span>{quantity}</span>
                    <FaPlus onClick={increaseQuantity} />
                </div>
            ) : null}
            {quantity === 0 ? (
                <button
                    type="button"
                    className="action-btn"
                    onClick={increaseQuantity}
                >
                    Add
                </button>
            ) : null}
        </div>
    );
};

export { Item };
