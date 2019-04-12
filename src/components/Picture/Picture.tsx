import React from "react";
import styled, { css } from "styled-components/macro";
// import { ImgResource } from "the-platform";

import { colors, fonts } from "../../style/theme";

import Text from "../Text";

interface PhotoProps {
  grayscale?: boolean;
  aspectRatio?: number;
}

interface PictureProps {
  src: string;
  /**
   * Text below the picture */
  name?: string;
  /**
   * Display as black and white
   * @default false
   */
  grayscale?: boolean;
  /**
   * Height compared to width in percents. 100% is 1:1, 50% is 2:1, 120% is 6:5, etc...
   */
  aspectRatio?: number;
  /**
   * Requires name property
   * @default #495057
   */
  color?: string;
  /**
   * Requires name property
   * @default "Neucha, cursive"
   */
  fontFamily?: string;
  /**
   * Requires name property
   * @default 32px
   */
  fontSize?: string;
}

const Picture = ({
  src,
  name,
  grayscale = false,
  aspectRatio,
  color = colors.black,
  fontFamily = fonts.interface,
  fontSize = "32px",
  ...props
}: PictureProps): React.ReactChild => {
  // ImgResource.read(src);
  return (
    <Polaroid>
      {aspectRatio ? (
        <Photo
          {...props}
          src={src}
          aspectRatio={aspectRatio}
          grayscale={grayscale}
        />
      ) : (
        <Img grayscale={grayscale}>
          <img {...props} alt={name} src={src} />
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

const Polaroid = styled.div`
  padding: 10px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6), inset 0 -5px 50px rgba(0, 0, 0, 0.4);
  text-align: center;
  text-decoration: none;
`;

const imgStyle = css<PhotoProps>`
  display: block;
  width: 100%;
  box-shadow: 2px 2px 2px 0 #e7e8e8 inset, -2px -2px 2px 0 #e7e8e8 inset;
  filter: ${({ grayscale }) => (grayscale ? "grayscale(100%)" : "none")};
`;

const Photo = styled.div<PictureProps>`
  padding-bottom: ${({ aspectRatio }) => `${aspectRatio}%`};
  background-image: url('${({ src }) => src}');
  background-position: center;
  background-size: cover;
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

// export default React.memo(Picture);
export default Picture;
