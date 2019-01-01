import React from "react";
import styled, { css } from "styled-components/macro";
import { ImgResource } from "the-platform";

import { colors, fonts } from "../../style/theme";

import Text, { IText } from "../Text";

interface IPhoto {
  src: string;
  grayscale?: boolean;
  aspectRatio: number;
}

interface IPicture extends IText {
  src: string;
  name?: string;
  grayscale?: boolean;
  aspectRatio?: number;
}

const Picture = ({
  src,
  name,
  grayscale = false,
  aspectRatio,
  color = colors.black,
  fontFamily = fonts.interface,
  fontSize = "32px"
}: IPicture) => {
  ImgResource.read(src);
  return (
    <Polaroid>
      {aspectRatio ? (
        <Photo src={src} aspectRatio={aspectRatio} grayscale={grayscale} />
      ) : (
        <Img grayscale={grayscale}>
          <img alt={name} src={src} />
        </Img>
      )}
      {name && (
        <Text color={color} fontFamily={fontFamily} fontSize={fontSize}>
          {name}
        </Text>
      )}
    </Polaroid>
  );
};

Picture.defaultProps = {
  grayscale: false,
  color: "#495057",
  fontFamily: "Neucha, cursive",
  fontSize: "32px"
};

const Polaroid = styled.div`
  padding: 10px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6), inset 0 -5px 50px rgba(0, 0, 0, 0.4);
  text-align: center;
  text-decoration: none;
`;

const imgStyle = css`
  display: block;
  width: 100%;
  box-shadow: 2px 2px 2px 0 #e7e8e8 inset, -2px -2px 2px 0 #e7e8e8 inset;
  filter: ${({ grayscale }: { grayscale?: boolean }) =>
    grayscale ? "grayscale(100%)" : "none"};
`;

const Photo = styled.div`
  padding-bottom: ${({ aspectRatio }: IPhoto) => `${aspectRatio}%`};
  background-image: url('${({ src }: IPhoto) => src}');
  border-radius: 2px;
  ${imgStyle};
`;

const Img = styled.div`
  position: relative;
  z-index: 1;
  ${imgStyle};

  > img {
    position: relative;
    z-index: 0;
    display: block;
    width: 100%;
  }
`;

export default Picture;
