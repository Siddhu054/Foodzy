import React, { useState, useCallback } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { dummyRestaurants } from "../data/restaurantData";
import debounce from "lodash/debounce";
import { useUser } from "../context/UserContext";
import { calculateDistance } from "../utils/distance";

const RestaurantsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: ${(props) => (props.active ? "none" : "1px solid #e23744")};
  border-radius: 20px;
  background: ${(props) => (props.active ? "#e23744" : "white")};
  color: ${(props) => (props.active ? "white" : "#e23744")};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? "#d13238" : "#fff5f5")};
  }
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const RestaurantCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const RestaurantImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RestaurantInfo = styled.div`
  padding: 1rem;
`;

const RestaurantName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
`;

const RestaurantRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const RestaurantCuisine = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

const SearchSuggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const Suggestion = styled.div`
  padding: 0.8rem 1rem;
  cursor: pointer;
  &:hover {
    background: #f8f8f8;
  }
`;

const DeliveryAddress = styled.div`
  background: #f8f8f8;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const cuisineFilters = ["All", "Indian", "Italian", "Japanese", "American"];

function Restaurants() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { userData } = useUser();
  const MAX_DELIVERY_DISTANCE = 10; // Maximum delivery distance in km

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const filteredRestaurants = dummyRestaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || restaurant.cuisine === activeFilter;

    const withinDeliveryRange = !userData.currentAddress
      ? true
      : calculateDistance(
          userData.currentAddress.lat,
          userData.currentAddress.lng,
          restaurant.location.lat,
          restaurant.location.lng
        ) <= MAX_DELIVERY_DISTANCE;

    return matchesSearch && matchesFilter && withinDeliveryRange;
  });

  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = dummyRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      debouncedSearch(query);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <RestaurantsContainer>
      {userData.currentAddress && (
        <DeliveryAddress>
          Delivering to: {userData.currentAddress.street},{" "}
          {userData.currentAddress.city}
        </DeliveryAddress>
      )}
      <SearchBar>
        <SearchIcon sx={{ color: "#666" }} />
        <SearchInput
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <SearchSuggestions>
            {suggestions.map((restaurant) => (
              <Suggestion
                key={restaurant.id}
                onClick={() => {
                  setSearchQuery(restaurant.name);
                  setShowSuggestions(false);
                  navigate(`/restaurant/${restaurant.id}`);
                }}
              >
                {restaurant.name} - {restaurant.cuisine}
              </Suggestion>
            ))}
          </SearchSuggestions>
        )}
      </SearchBar>

      <FiltersContainer>
        {cuisineFilters.map((filter) => (
          <FilterButton
            key={filter}
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </FiltersContainer>

      <RestaurantGrid>
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            onClick={() => handleRestaurantClick(restaurant.id)}
          >
            <RestaurantImage src={restaurant.image} alt={restaurant.name} />
            <RestaurantInfo>
              <RestaurantName>{restaurant.name}</RestaurantName>
              <RestaurantRating>
                <StarIcon sx={{ color: "#e23744" }} />
                {restaurant.rating}
              </RestaurantRating>
              <RestaurantCuisine>{restaurant.cuisine}</RestaurantCuisine>
            </RestaurantInfo>
          </RestaurantCard>
        ))}
      </RestaurantGrid>
    </RestaurantsContainer>
  );
}

export default Restaurants;
