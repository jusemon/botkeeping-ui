import * as React from 'react';
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import CustomTablePaginationActions from './CustomTablePaginationActions';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';

export type Row = { id: number } & Record<string, any>;

export type CustomTableColumns = ReadonlyArray<{
  title: string;
  property: string;
  props: {
    style?: Record<string, string | number>;
    align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
  };
}>;

export type DetailsConfig = {
  title: string;
  property: string;
  columns: CustomTableColumns;
};

export type CustomTableProps = {
  rows: ReadonlyArray<Row>;
  columns: CustomTableColumns;
  totalElements: number;
  isLoading: boolean;
  details?: DetailsConfig;
  onPageChange: (page: number, pageSize: number) => void;
};

const MasterDetailRow = (props: {
  row: Row;
  columns: CustomTableColumns;
  details: DetailsConfig;
}) => {
  const { row, columns, details } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell style={{width: 66}}>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((col) => (
          <TableCell
            key={`${row.id}-${col.property}`}
            {...col.props}
          >
            {row[col.property]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                {details.title}
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    {details.columns.map((col) => (
                      <TableCell key={col.property} {...col.props}>{col.title}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row[details.property].map((detailRow: Row) => (
                    <TableRow key={detailRow.id}>
                      {details.columns.map((col) => (
                        <TableCell
                          key={`${row.id}-${col.property}`}
                          {...col.props}
                        >
                          {detailRow[col.property]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CustomTable = ({
  onPageChange,
  columns,
  rows,
  totalElements,
  isLoading,
  details,
}: CustomTableProps) => {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    onPageChange(newPage, pageSize);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(0);
    onPageChange(0, newPageSize);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
        <TableHead>
          <TableRow>
            {details && <TableCell />}
            {columns.map((col) => (
              <TableCell {...col.props} key={col.property}>
                {col.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableRow style={{ height: 53 * pageSize }}>
              <TableCell
                style={{ textAlign: 'center' }}
                rowSpan={pageSize}
                colSpan={columns.length}
              >
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length}>No data available</TableCell>
            </TableRow>
          )}
          {!isLoading &&
            !details &&
            rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={`${row.id}-${col.property}`} {...col.props}>
                    {row[col.property]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!isLoading &&
            details &&
            rows.map((row) => (
              <MasterDetailRow
                key={row.id}
                row={row}
                columns={columns}
                details={details}
              ></MasterDetailRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={columns.length}
              count={totalElements}
              rowsPerPage={pageSize}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={CustomTablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
