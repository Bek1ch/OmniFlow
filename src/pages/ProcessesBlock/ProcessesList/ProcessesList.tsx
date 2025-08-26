import { useState, type FC } from "react";
import { Stack, Typography, Grid, styled } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import useTablePagination from "../../../hooks/useTablePagination";
import TablePaginationCustom from "../../../components/TableCustom/TablePaginationCustom";
import Card from "../../../components/Card";
import SearchBarMini from "../../../components/Inputs/SearchBarMini";
import ButtonCustom from "../../../components/Inputs/Button";
import AddIcon from "@mui/icons-material/Add";

interface ProcessCard {
  id: number;
  title: string;
  icon: string;
  type: "department" | "process" | "action";
}

const ProcessBlock = styled(Stack)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  flexDirection: "column",
  gap: theme.spacing(3),
  overflow: "hidden",
  backgroundColor: theme.palette.common.white,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const ProcessList: FC = () => {
  const [processCards] = useState<ProcessCard[]>([
    { id: 1, title: "HR", icon: "Work", type: "department" },
    { id: 2, title: "Документы", icon: "Description", type: "department" },
    { id: 3, title: "Бухгалтерия", icon: "AccountBalance", type: "department" },
    { id: 4, title: "АПП", icon: "Assessment", type: "department" },
    { id: 5, title: "Реселлинг", icon: "Group", type: "department" },
    { id: 6, title: "Юридический отдел", icon: "Gavel", type: "department" },
    { id: 7, title: "ЮРО - АРХИВ", icon: "Archive", type: "process" },
    { id: 8, title: "Сметный отдел", icon: "AttachMoney", type: "department" },
    { id: 9, title: "Справочник", icon: "MenuBook", type: "department" },
  ]);

  const { pageNo, pageSize, handleChangePage, handleChangeRowsPerPage } =
    useTablePagination(1, 25);

  return (
    <ProcessBlock>
      <Stack
        alignItems="center"
        direction="row"
        gap={(theme) => theme.spacing(1.5)}
      >
        <SubTitle>Процессы</SubTitle>
        <BookmarkIcon />
      </Stack>
      <Stack justifyContent={"space-between"} direction="row">
        <SearchBarMini />
        <ButtonCustom /> {/* TODO: Add Check Permissions */}
      </Stack>
      <Stack
        flex={1}
        overflow="auto"
        sx={(theme) => ({
          flex: 1,
          overflow: "auto",
          paddingRight: theme.spacing(2),
        })}
      >
        <Grid container spacing={2}>
          {processCards.map((card) => {
            return (
              <Grid
                size={{ xs: 12, md: 6, lg: 4, xl: 3, xxl: 2 }}
                key={card.id}
              >
                <Card title={card.title} />
              </Grid>
            );
          })}
          <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3, xxl: 2 }}>
            <Card
              Icon={AddIcon}
              sx={(theme) => ({
                backgroundColor: theme.palette.common.white,
                border: `2px solid ${theme.palette.divider}`,
              })}
              title={"Создать папку"}
            />
          </Grid>
        </Grid>
      </Stack>
      <TablePaginationCustom
        pageNo={pageNo}
        pageSize={pageSize}
        currentPages={10} // Get this from API
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </ProcessBlock>
  );
};

export default ProcessList;
