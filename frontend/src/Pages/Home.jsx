import ImageSlider from "../Components/common/ImageSlider";
import { styled } from "styled-components";
import ProductCategoryCard from "../Components/cards/ProductCategoryCard";
import { category } from "../utils/data";
import Footer from "../Components/common/Footer"

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const HeroWrapper = styled.div`
  position: relative;
  margin-top: 15px;
  overflow: hidden;
  height: 70vh;

  @media (max-width: 768px) {
    height: 50vh; // Adjust for smaller screens
  }
`;

const Section = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  font-family: "Arial", sans-serif;
  display: flex;
  justify-content: ${(props) => (props.center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;

  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const Home = () => {
  return (
    <Container>
      <HeroWrapper>
        <ImageSlider />
      </HeroWrapper>

      <Section>
        <Title center={true}>Explore Our Services</Title>
        <CardWrapper>
          {category.map((item, index) => (
            <ProductCategoryCard key={index} category={item} />
          ))}
        </CardWrapper>
      </Section>
    <Footer />
    
    </Container>
  );
};

export default Home;
