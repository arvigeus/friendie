import styled from "styled-components/macro";

interface ICursive {
  color: string;
  fontSize: string;
  fontFamily: string;
}

const Cursive = styled.span`
  display: inline-block;
  color: ${(props: ICursive) => props.color};
  font-family: ${(props: ICursive) => props.fontFamily};
  font-size: ${(props: ICursive) => props.fontSize};
  font-weight: 900;
  white-space: nowrap;
`;

export default Cursive;
