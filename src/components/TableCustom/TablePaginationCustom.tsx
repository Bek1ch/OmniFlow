import { type FC, type ChangeEvent } from "react";
import { TablePagination } from "@mui/material";

interface ITablePaginationProps {
  pageNo: number;
  pageSize: number;
  currentPages: number;
  handleChangePage: (_: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TablePaginationCustom: FC<ITablePaginationProps> = ({
  pageNo,
  pageSize,
  currentPages,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[25, 50, 100]}
      count={currentPages * pageSize}
      rowsPerPage={pageSize}
      page={pageNo - 1}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage=""
      labelDisplayedRows={({ page }) =>
        `${page + 1} из ${Math.max(pageSize, 1)}`
      }
    />
  );
};

export default TablePaginationCustom;
