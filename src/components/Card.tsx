import { type FC } from "react";
import {
  Box,
  styled,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder"; // пример иконки

interface CardProps {
  title: string;
  Icon?: React.ElementType;
  sx?: SxProps<Theme>;
}

const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  minWidth: 220,
  height: 110,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.1s ease",
  "&:hover": {
    boxShadow: theme.shadows[3],
    cursor: "pointer",
  },
}));

const Card: FC<CardProps> = ({ title, sx, Icon = StarBorderIcon }) => {
  return (
    <CardContainer sx={sx}>
      <Icon fontSize="large" />
      <Typography variant="body1" fontWeight={500}>
        {title}
      </Typography>
    </CardContainer>
  );
};

export default Card;
