import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import {
  ColorActionButton,
  ColorLabel,
  ColorOption,
  ColorPicker,
  ColorPickerContainer,
  Container,
} from "./styles";
import ActionConfirmDialog from "../ActionConfirmDialog";

type EditionColor = {
  color: string;
  index: number;
};

type Props = {
  colors: string[];
  onChange: (newValue: string[]) => void;
};

export default function MultipleColors({
  colors: colorsOrigin,
  onChange = () => undefined,
}: Props) {
  const maxColorsCount = 2;
  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);
  const [removeColorsConfirmDialogIsOpen, setRemoveColorsConfirmDialogIsOpen] =
    useState(false);
  const [editionColor, setEditionColor] = useState<EditionColor>();
  const colors = colorsOrigin.slice(0, maxColorsCount);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetId: string = (event.target as any)?.id;
      if (
        colorPickerIsOpen &&
        ![
          "color_picker",
          "color_option",
          "add_color",
          "add_color_icon",
          "remove_color",
          "remove_color_icon",
        ].includes(targetId)
      ) {
        setColorPickerIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [colorPickerIsOpen]);

  function editColor(editionColor: EditionColor) {
    setEditionColor(editionColor);
    openColorPicker();
  }

  function openColorPicker() {
    window.setTimeout(() => {
      setColorPickerIsOpen(true);
    }, 0);
  }

  function openRemoveColorsConfirmDialog() {
    setRemoveColorsConfirmDialogIsOpen(true);
  }

  return (
    <>
      <ActionConfirmDialog
        title="Deseja remover a(s) cor(es)?"
        isOpen={removeColorsConfirmDialogIsOpen}
        handleCancel={() => setRemoveColorsConfirmDialogIsOpen(false)}
        handleConfirm={() => {
          onChange([]);
          setRemoveColorsConfirmDialogIsOpen(false);
        }}
      />
      <Container colorCount={colors.length}>
        <ColorLabel>Cor</ColorLabel>
        <>
          {colors.map((color, index) => (
            <ColorOption
              color={color}
              key={index}
              onClick={() => editColor({ color, index })}
              id="color_option"
            />
          ))}
        </>
        {colors.length < maxColorsCount ? (
          <ColorActionButton onClick={openColorPicker} id="add_color">
            <AddCircleOutlineIcon
              sx={{ opacity: 0.7 }}
              id="add_color_icon"
              onClick={openColorPicker}
            />
          </ColorActionButton>
        ) : null}
        {colors.length ? (
          <ColorActionButton
            onClick={openRemoveColorsConfirmDialog}
            id="remove_color"
          >
            <ClearIcon
              id="remove_color_icon"
              sx={{ opacity: 0.7 }}
              onClick={openRemoveColorsConfirmDialog}
            />
          </ColorActionButton>
        ) : null}
        {colorPickerIsOpen ? (
          <ColorPickerContainer id="color_picker">
            <ColorPicker
              colors={[
                ["#5b2f2c", "#eeded3"],
                ["#d13025", "#f7739f"],
                ["#392272", "#ad8ed8"],
                ["#00256a", "#708fe4"],
                ["#e6a361", "#fcf6a7"],
                ["#117557", "#95ebdf"],
                ["black", "gray", "#ffffff"],
              ]}
              height={170}
              color={editionColor?.color}
              onChange={(newColor) => {
                if (editionColor) {
                  const currentColors = [...colors];
                  currentColors[editionColor.index] = newColor.hex;
                  currentColors.push(...["blue", "red"]);
                  onChange(currentColors);
                  setEditionColor(undefined);
                } else onChange([...colors, newColor.hex]);
                setColorPickerIsOpen(false);
              }}
            />
          </ColorPickerContainer>
        ) : null}
      </Container>
    </>
  );
}
