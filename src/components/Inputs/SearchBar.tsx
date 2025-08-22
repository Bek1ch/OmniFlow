import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "16px",
        gap: "12px",
        margin: "0 auto",
        width: "461px",
        height: "56px",
        background: "#FFFFFF",
        borderRadius: "16px",
      }}
    >
      {/* Иконка поиска */}
      <SearchIcon
        sx={{
          width: 24,
          height: 24,
          color: "rgba(73, 73, 73, 0.2)",
          flex: "none",
        }}
      />

      {/* Поле ввода */}
      <InputBase
        placeholder="Поиск"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "22px",
          color: "rgba(73, 73, 73, 0.8)",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default SearchBar;
