import { useState } from "react";

export interface ITablePagination {
  pageNo: number;
  pageSize: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useTablePagination = (
  page: number,
  rowsPerPage: number,
): ITablePagination => {
  const [pageNo, setPageNo] = useState(page);
  const [pageSize, setPageSize] = useState(rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNo(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(+event.target.value);
    setPageNo(1);
  };

  return {
    pageNo,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
export default useTablePagination;
