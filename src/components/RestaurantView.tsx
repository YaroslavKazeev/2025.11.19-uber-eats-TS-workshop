import React from "react";
import { Button, SHAPE, SIZE, KIND } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";

import { FlexGrid } from "baseui/flex-grid";
import Cart from "./Cart";
import MenuItem, { RestaurantItem } from "./MenuItem";
import { getRestaurantItems } from "../utils/getRestaurantData";

export default function RestaurantView() {
  const [viewCart, setViewCart] = React.useState(false);
  const [cart, setCart] = React.useState<RestaurantItem[]>([]);

  const restaurantItems = getRestaurantItems();

  const addToCart = (item: RestaurantItem) => {
    setCart([...cart, item]);
  };

  let totalPrice: number = 0;
  cart.forEach((item) => {
    totalPrice += item.priceAmount;
  });

  return (
    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>McDonald's</h1>
        <Button
          kind={KIND.secondary}
          style={{ height: "50px" }}
          onClick={() => setViewCart(true)}
        >
          View Cart
        </Button>
      </div>

      {/* Filters */}
      <ButtonGroup shape={SHAPE.pill} size={SIZE.compact}>
        <Button>Burger</Button>
        <Button>Fries</Button>
        <Button>Drinks</Button>
      </ButtonGroup>

      <FlexGrid>
        {restaurantItems.map((item, index) => (
          <MenuItem key={index} item={item} addToCart={addToCart} />
        ))}
      </FlexGrid>

      <Cart
        viewCart={viewCart}
        setViewCart={setViewCart}
        cart={cart}
        totalPrice={totalPrice}
      ></Cart>
    </div>
  );
}
