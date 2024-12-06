import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Cart from "./Cart";
import { useParams } from "react-router-dom";
import { dummyRestaurants } from "../data/restaurantData";
import { menuCategories } from "../data/menuData";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import ReviewSection from "./ReviewSection";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const RestaurantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2rem;
`;

const RestaurantInfo = styled.div`
  flex: 1;
`;

const RestaurantName = styled.h2`
  margin: 0 0 1rem 0;
  color: #333;
`;

const RestaurantMeta = styled.div`
  display: flex;
  gap: 2rem;
  color: #666;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MenuSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;

const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 120px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const ItemDescription = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

const ItemPrice = styled.span`
  color: #e23744;
  font-weight: bold;
  margin: 0 1rem;
`;

const AddToCartButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => (props.added ? "#e23744" : "white")};
  color: ${(props) => (props.added ? "white" : "#e23744")};
  border: 1px solid #e23744;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
`;

const FallbackImage = styled.div`
  width: 120px;
  height: 100px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.8rem;
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  color: #e23744;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function RestaurantDetail() {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart } = useCart();
  const { userData, addToFavorites } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return <LoadingContainer>Loading restaurant details...</LoadingContainer>;
  }

  const restaurant =
    dummyRestaurants.find((r) => r.id === parseInt(id)) || dummyRestaurants[0];

  const menu =
    menuCategories[restaurant.cuisine.toLowerCase()] ||
    dummyRestaurants[0].menu;

  const handleAddToCart = (item) => {
    addToCart(parseInt(id), {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <DetailContainer>
      <RestaurantHeader>
        <RestaurantInfo>
          <RestaurantName>{restaurant.name}</RestaurantName>
          <RestaurantMeta>
            <Rating>
              <StarIcon sx={{ color: "#e23744" }} />
              {restaurant.rating}
            </Rating>
            <span>{restaurant.cuisine}</span>
            <span>{restaurant.deliveryTime}</span>
          </RestaurantMeta>
        </RestaurantInfo>
        <FavoriteButton onClick={() => addToFavorites(parseInt(id))}>
          {userData.favorites.includes(parseInt(id)) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
          {userData.favorites.includes(parseInt(id))
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </FavoriteButton>
      </RestaurantHeader>

      {menu.map((section) => (
        <MenuSection key={section.category}>
          <SectionTitle>{section.category}</SectionTitle>
          {section.items.map((item) => (
            <MenuItem key={item.id}>
              {item.image ? (
                <ItemImage
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : (
                <FallbackImage>No image available</FallbackImage>
              )}
              <FallbackImage style={{ display: "none" }}>
                Image not available
              </FallbackImage>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemInfo>
              <ItemPrice>${item.price}</ItemPrice>
              <AddToCartButton added={cart.items[item.id]?.quantity > 0}>
                {cart.items[item.id]?.quantity > 0 && (
                  <RemoveIcon
                    onClick={() => handleRemoveFromCart(item.id)}
                    fontSize="small"
                  />
                )}
                {cart.items[item.id]?.quantity || 0}
                <AddIcon
                  onClick={() => handleAddToCart(item)}
                  fontSize="small"
                />
              </AddToCartButton>
            </MenuItem>
          ))}
        </MenuSection>
      ))}
      <Cart items={cart.items} restaurantMenu={menu} />
      <ReviewSection restaurantId={parseInt(id)} />
    </DetailContainer>
  );
}

export default RestaurantDetail;
