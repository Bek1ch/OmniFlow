import { Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.buttons.buttonGreenBack,
  color: theme.palette.buttons.buttonGreenText,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  flexShrink: 0,
}));

// TODO: Add Props
const ButtonCustom = () => {
  return (
    <StyledButton startIcon={<AddIcon />} variant="contained">
      Добавить новый процесс
    </StyledButton>
  );
};

export default ButtonCustom;
