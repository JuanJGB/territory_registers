import styled, { css } from "styled-components";
import { SwatchesPicker } from "react-color";

const hoverCSS = css`
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

type ContainerProps = {
  colorCount: number;
};

export const Container = styled.div<ContainerProps>`
  border: 1px solid #c9bfbf;
  border-radius: 13px;
  display: flex;
  width: 81px;
  margin: 8px;
  align-items: center;
  padding: 0 18px 0 19px;
  position: relative;
  justify-content: ${({ colorCount }) =>
    colorCount > 0 ? "space-between" : "center"};
`;

export const ColorPicker = styled(SwatchesPicker)`
  width: 278px !important;
`;

export const ColorPickerContainer = styled.div`
  z-index: 1000;
  position: absolute;
  left: 2px;
  top: 2px;
`;

export const ColorActionButton = styled.div`
  display: flex;
  ${hoverCSS}
`;

export const ColorLabel = styled.div`
  position: absolute;
  top: -12px;
  color: #7a7878;
  background: white;
  width: 42px;
  text-align: center;
  left: 9px;
  font-size: 14px;
`;

export const ColorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

type ColorProps = {
  color: string;
};

export const Color = styled.div<ColorProps>`
  background-color: ${({ color }) => color};
  border-radius: 24px;
  ${({ color }) =>
    color === "#ffffff" ? "box-shadow: 0px 0px 5px #b3b1b1;" : ""}
  width: 24px;
  height: 24px;
  margin-left: 3px;
`;

export const ColorOption = styled(Color)`
  ${hoverCSS}
  margin-left: 0
`;
