import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';

const SharedTableHead = props => {

    const { name } = props
    
    const { t } = useTranslation()
    
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center" >{t(name)}</TableCell>
                <TableCell align="center">{t('price')}</TableCell>
                <TableCell align="center">{t('quantity')}</TableCell>
                <TableCell align="center">{t('total')}</TableCell>
                <TableCell align="center">{t('action')}</TableCell>
            </TableRow>
        </TableHead>
    )

}

export default SharedTableHead;