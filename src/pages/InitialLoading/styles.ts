import styled from "styled-components";

type props = {
  isVisible: boolean;
};

export const Container = styled.div<props>`
  text-align: center;
  background-image: linear-gradient(11.68deg, #ed815f 10%, var(--primary) 90%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: white;
  box-shadow: -40px 60px 150px rgba(71, 79, 83, 0.7);
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  transition: opacity 2s ease;
`;

export const Logo = styled.img.attrs(() => ({
  alt: "logo",
  src: "./logo_extended.png",
}))`
  pointer-events: none;
`;
