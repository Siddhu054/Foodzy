import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.div`
  text-align: center;
  padding: 8rem 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format")
      center/cover fixed;
  border-radius: 10px;
  margin-bottom: 2rem;
  color: white;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    background-attachment: scroll; // Disable parallax on mobile
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: white;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const ExploreButton = styled(Link)`
  background-color: #e23744;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.2s ease;

  &:hover {
    background-color: #d13238;
    transform: scale(1.05);
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #333;
  margin: 3rem 0 2rem;
  font-size: 2rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? 0 : "20px")});
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
`;

const Feature = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${({ delay }) => delay}ms;
  opacity: 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  color: #e23744;
  margin-bottom: 1rem;
  svg {
    font-size: 2.5rem;
  }
`;

const FeatureTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  color: #666;
`;

const CuisinesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const CuisineCard = styled.div`
  position: relative;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CuisineImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CuisineOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  font-weight: bold;
`;

const TestimonialsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  h4 {
    color: #333;
    margin: 0;
  }
  p {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
  }
`;

const cuisines = [
  {
    name: "Indian",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format",
  },
  {
    name: "Italian",
    image:
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&auto=format",
  },
  {
    name: "Japanese",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format",
  },
  {
    name: "American",
    image:
      "https://images.unsplash.com/photo-1586816001966-79b736744398?w=800&auto=format",
  },
];

const testimonials = [
  {
    text: "Amazing food delivery service! Always on time and the food is still hot.",
    author: "John Doe",
    role: "Food Enthusiast",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format",
  },
  {
    text: "The best food delivery app I've ever used. Great variety of restaurants!",
    author: "Jane Smith",
    role: "Regular Customer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format",
  },
  {
    text: "Excellent service and user-friendly interface. Highly recommended!",
    author: "Mike Johnson",
    role: "Food Blogger",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format",
  },
];

const features = [
  {
    icon: <LocalShippingIcon />,
    title: "Quick Delivery",
    text: "Fast and reliable delivery to your doorstep",
  },
  {
    icon: <RestaurantIcon />,
    title: "Best Restaurants",
    text: "Curated selection of top-rated restaurants",
  },
  {
    icon: <LocationOnIcon />,
    title: "Live Tracking",
    text: "Real-time tracking of your food delivery",
  },
  {
    icon: <SupportAgentIcon />,
    title: "24/7 Support",
    text: "Round-the-clock customer service",
  },
  {
    icon: <PaymentIcon />,
    title: "Secure Payments",
    text: "Multiple secure payment options",
  },
  {
    icon: <LocalOfferIcon />,
    title: "Special Offers",
    text: "Regular discounts and promotional deals",
  },
  {
    icon: <DeliveryDiningIcon />,
    title: "Contactless Delivery",
    text: "Safe and hygienic delivery options",
  },
  {
    icon: <FastfoodIcon />,
    title: "Wide Selection",
    text: "Diverse range of cuisines and dishes",
  },
];

function Home() {
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [cuisinesRef, cuisinesInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <HomeContainer>
      <Hero>
        <Title>Welcome to Foodzy</Title>
        <Subtitle>Discover the best food & drinks in your area</Subtitle>
        <ExploreButton to="/restaurants">Explore Restaurants</ExploreButton>
      </Hero>

      <SectionTitle>Why Choose Us</SectionTitle>
      <FeaturesContainer ref={featuresRef} isVisible={featuresInView}>
        {features.map((feature, index) => (
          <Feature key={feature.title} delay={index * 100}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureText>{feature.text}</FeatureText>
          </Feature>
        ))}
      </FeaturesContainer>

      <SectionTitle>Popular Cuisines</SectionTitle>
      <CuisinesContainer ref={cuisinesRef}>
        {cuisines.map((cuisine) => (
          <CuisineCard key={cuisine.name}>
            <CuisineImage src={cuisine.image} alt={cuisine.name} />
            <CuisineOverlay>{cuisine.name}</CuisineOverlay>
          </CuisineCard>
        ))}
      </CuisinesContainer>

      <SectionTitle>What Our Customers Say</SectionTitle>
      <TestimonialsContainer
        ref={testimonialsRef}
        style={{
          opacity: testimonialsInView ? 1 : 0,
          transform: `translateY(${testimonialsInView ? 0 : "20px"})`,
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author}>
            <TestimonialText>{testimonial.text}</TestimonialText>
            <TestimonialAuthor>
              <AuthorImage src={testimonial.image} alt={testimonial.author} />
              <AuthorInfo>
                <h4>{testimonial.author}</h4>
                <p>{testimonial.role}</p>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        ))}
      </TestimonialsContainer>
    </HomeContainer>
  );
}

export default Home;
