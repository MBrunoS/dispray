import styled from "styled-components";

export const ProjectionPreview = styled.div`
  height: 45vh;
  width: calc(
    45vh *
      ${(props) => {
        return props.aspectRatio;
      }}
  );
  margin: 0 auto;

  .projection-screen {
    width: 100%;
    height: 100%;
  }

  .projection-main-text p {
    font-size: 1.35rem;
  }

  .footer-text {
    font-size: 0.85rem;
  }
`;
