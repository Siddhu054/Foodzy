import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";

const AddressContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const AddressForm = styled.form`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #e23744;
  }
`;

const MapContainer = styled.div`
  height: 300px;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
`;

const Button = styled.button`
  background: #e23744;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background: #d13238;
  }
`;

const SavedAddress = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function AddressManager() {
  const { userData, updateAddress } = useUser();
  const { showToast } = useToast();
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    lat: null,
    lng: null,
  });

  useEffect(() => {
    // Initialize map
    const initMap = () => {
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: 20.5937, lng: 78.9629 }, // Default to India
          zoom: 5,
        }
      );

      const markerInstance = new window.google.maps.Marker({
        map: mapInstance,
        draggable: true,
      });

      setMap(mapInstance);
      setMarker(markerInstance);

      // Add click listener to map
      mapInstance.addListener("click", (e) => {
        markerInstance.setPosition(e.latLng);
        updateAddressFromLatLng(e.latLng);
      });

      // Add dragend listener to marker
      markerInstance.addListener("dragend", () => {
        updateAddressFromLatLng(markerInstance.getPosition());
      });
    };

    if (window.google) {
      initMap();
    }
  }, []);

  const updateAddressFromLatLng = async (latLng) => {
    const geocoder = new window.google.maps.Geocoder();
    try {
      const result = await geocoder.geocode({ location: latLng });
      if (result.results[0]) {
        const addressComponents = result.results[0].address_components;
        const formattedAddress = {
          street: getAddressComponent(
            addressComponents,
            "street_number",
            "route"
          ),
          city: getAddressComponent(addressComponents, "locality"),
          state: getAddressComponent(
            addressComponents,
            "administrative_area_level_1"
          ),
          zipCode: getAddressComponent(addressComponents, "postal_code"),
          lat: latLng.lat(),
          lng: latLng.lng(),
        };
        setAddress(formattedAddress);
      }
    } catch (error) {
      showToast("Error getting address details", "error");
    }
  };

  const getAddressComponent = (components, ...types) => {
    const component = components.find((comp) =>
      types.some((type) => comp.types.includes(type))
    );
    return component ? component.long_name : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAddress(address);
    showToast("Address saved successfully!", "success");
  };

  return (
    <AddressContainer>
      <h2>Manage Delivery Addresses</h2>
      <AddressForm onSubmit={handleSubmit}>
        <MapContainer id="map" />
        <Input
          type="text"
          placeholder="Street Address"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="State"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="ZIP Code"
          value={address.zipCode}
          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
          required
        />
        <Button type="submit">Save Address</Button>
      </AddressForm>

      <h3>Saved Addresses</h3>
      {userData.addresses?.map((addr, index) => (
        <SavedAddress key={index}>
          <div>
            <p>{addr.street}</p>
            <p>{`${addr.city}, ${addr.state} ${addr.zipCode}`}</p>
          </div>
          <Button onClick={() => updateAddress(addr)}>Use This Address</Button>
        </SavedAddress>
      ))}
    </AddressContainer>
  );
}

export default AddressManager;
