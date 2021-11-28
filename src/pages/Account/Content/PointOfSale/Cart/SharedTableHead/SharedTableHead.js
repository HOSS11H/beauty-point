import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SharedTableHead = props => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center" >services</TableCell>
                <TableCell align="center">price</TableCell>
                <TableCell align="center">quantity</TableCell>
                <TableCell align="center">price including taxes</TableCell>
                <TableCell align="center">employees</TableCell>
                <TableCell align="center">action</TableCell>
            </TableRow>
        </TableHead>
    )

}

export default SharedTableHead;