// TableWithSkeletonLoader.js

import { FC } from 'react';
import { TableCell, TableRow, Skeleton } from '@mui/material';
interface SkeletonLoaderProps {
    row: number;
    column: number;
}
const TableWithSkeletonLoader: FC<SkeletonLoaderProps> = ({ row, column }) => {
    const rows = Array.from({ length: row }, (_, index) => index);
    const columns = Array.from({ length: column }, (_, index) => index);
    return (<>
        {rows.map((row: number) => {
            console.log(row)
            return (<TableRow key={row}>
                {columns.map((column: number) => {
                    return <TableCell key={column}>
                        <Skeleton animation="wave" width={120} />
                    </TableCell>
                })}
            </TableRow>)
        })}
    </>)
    };

export default TableWithSkeletonLoader;
