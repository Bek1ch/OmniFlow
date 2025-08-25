import React, { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid,
  CardContent,
  Pagination,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CreateFolderModal from "../../../components/CreateFolderModal";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import useTablePagination from "../../../hooks/useTablePagination";
import TablePaginationCustom from "../../../components/TableCustom/TablePaginationCustom";
import Card from "../../../components/Card";

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

const ProcessList: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [processCards] = useState<ProcessCard[]>([
    { id: 1, title: "HR", icon: "📁", type: "department" },
    { id: 2, title: "Документы", icon: "📄", type: "department" },
    { id: 3, title: "Бухгалтерия", icon: "🏢", type: "department" },
    { id: 4, title: "АПП", icon: "📊", type: "department" },
    { id: 5, title: "Реселлинг", icon: "👥", type: "department" },
    { id: 6, title: "Юридический отдел", icon: "⚖️", type: "department" },
    { id: 7, title: "ЮРО - АРХИВ", icon: "📋", type: "process" },
    { id: 8, title: "Сметный отдел", icon: "💰", type: "department" },
    { id: 9, title: "Справочник", icon: "📖", type: "department" },
    { id: 10, title: "Создать", icon: "➕", type: "action" },
    { id: 11, title: "IT-отдел", icon: "💻", type: "department" },
    { id: 12, title: "Маркетинг", icon: "📢", type: "department" },
    { id: 13, title: "Продажи", icon: "💼", type: "department" },
    { id: 14, title: "Склад", icon: "📦", type: "department" },
    { id: 15, title: "Производство", icon: "🏭", type: "department" },
    { id: 16, title: "CRM", icon: "🗂️", type: "process" },
    { id: 17, title: "Заявки", icon: "📝", type: "process" },
    { id: 18, title: "Поддержка", icon: "☎️", type: "department" },
    { id: 19, title: "Обучение", icon: "🎓", type: "process" },
    { id: 20, title: "Аналитика", icon: "📈", type: "process" },
    { id: 21, title: "Настройки", icon: "⚙️", type: "action" },
    { id: 22, title: "Импорт", icon: "⬇️", type: "action" },
    { id: 23, title: "Экспорт", icon: "⬆️", type: "action" },
  ]);

  const { pageNo, pageSize, handleChangePage, handleChangeRowsPerPage } =
    useTablePagination(1, 25);

  // const handleCreateClick = () => setIsCreateModalOpen(true);
  const handleCloseModal = () => setIsCreateModalOpen(false);

  const handleSaveFolder = (folderData: {
    name: string;
    hrEmployee: string;
    selectedFiles: File[];
    accessUsers: string[];
    readingUsers: string[];
    functionalAutoBlocking: boolean;
  }) => {
    console.log("Создание папки:", folderData);
  };

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
      <Stack
        alignItems="center"
        direction="row"
        gap={(theme) => theme.spacing(1.5)}
      >
        Search Field
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
          {processCards.map((card) => (
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3, xxl: 2 }} key={card.id}>
              <Card title={card.title} />
            </Grid>
          ))}
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

  return (
    <Stack spacing={3} p={3}>
      {/* Заголовок */}
      <Typography variant="h4" fontWeight="bold">
        Процессы
      </Typography>

      {/* Поиск + кнопка */}
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          placeholder="Поиск по процессам"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" startIcon={<AddIcon />}>
          Добавить новый процесс
        </Button>
      </Stack>

      {/* Сетка карточек */}
      <Grid container spacing={2}>
        {processCards.map((card) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={card.id}>
            <Stack>
              <CardContent>
                <Typography fontSize={32}>{card.icon}</Typography>
                <Typography variant="body1">{card.title}</Typography>
              </CardContent>
            </Stack>
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="flex-end"
      >
        <Typography variant="body2">На странице:</Typography>
        <Select size="small" defaultValue={1}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
        <Pagination count={10} shape="rounded" color="primary" />
      </Stack>

      {/* Модалка */}
      <CreateFolderModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveFolder}
      />
    </Stack>
  );
};

export default ProcessList;
