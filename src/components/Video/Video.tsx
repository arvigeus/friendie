import React from "react";
import styled from "styled-components/macro";

import getEmbeddedLink from "./getEmbeddedLink";

interface VideoProps extends React.HTMLProps<HTMLIFrameElement> {
  /**
   * Address of video
   */
  src: string;
  /**
   * Title of iframe
   */
  title: string;
}

const Video = ({ src, title, ...props }: VideoProps): React.ReactChild => (
  <Filmstrip>
    <iframe
      src={getEmbeddedLink(src)}
      {...props}
      title={title}
      frameBorder="0"
      allowFullScreen
    />
  </Filmstrip>
);

const Filmstrip = styled.div`
  position: relative;
  height: 0;
  padding-top: 25px;
  padding-bottom: 56.25%;
  background-color: #000;

  & > iframe {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 99%;
    height: 98%;
    margin: 0.5%;
  }

  &::before {
    left: -20px;
    background: linear-gradient(to bottom, #000 10px, rgba(0, 0, 0, 0) 10px),
      linear-gradient(to right, #000 10px, rgba(0, 0, 0, 0) 10px);
  }

  &::after {
    right: -20px;
    background: linear-gradient(to bottom, #000 10px, rgba(0, 0, 0, 0) 10px),
      linear-gradient(to left, #000 10px, rgba(0, 0, 0, 0) 10px);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    display: block;
    width: 20px;
    height: 100%;
    background-size: 100% 20px;
    background-repeat: repeat-y;
  }
`;

export default Video;
