import { Box, styled, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(2),
  gap: theme.spacing(1.5),
  width: 461,
  height: 56,
  backgroundColor: theme.palette.background.default,
  borderRadius: 16,
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "22px",
  color: theme.palette.text.primary,
  width: "100%",
}));

const SearchIconStyled = styled(SearchIcon)(({ theme }) => ({
  width: 24,
  height: 24,
  color: theme.palette.text.disabled,
  flex: "none",
}));

const SearchBarMini = () => {
  return (
    <SearchContainer>
      <SearchIconStyled />
      <SearchInput placeholder="Поиск" />
    </SearchContainer>
  );
};

export default SearchBarMini;
