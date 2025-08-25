import { type FC } from "react";
import { Box, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder"; // пример иконки

interface CardProps {
  title: string;
  Icon?: React.ElementType;
}

const Card: FC<CardProps> = ({ title, Icon = StarBorderIcon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        gap: 1,
        width: 220,
        height: 110,
        backgroundColor: "#F5F5F5",
        borderRadius: "16px",
      }}
    >
      <Icon fontSize="large" />
      <Typography variant="body1" fontWeight={500}>
        {title}
      </Typography>
    </Box>
  );
};

export default Card;
