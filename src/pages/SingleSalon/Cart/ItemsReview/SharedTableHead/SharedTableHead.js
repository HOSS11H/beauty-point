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
                <TableCell sx={{ padding: '16px 8px' }} align="center" >{t(name)}</TableCell>
                <TableCell sx={{ padding: '16px 8px' }} align="center">{t('price')}</TableCell>
                <TableCell sx={{ padding: '16px 8px' }} align="center">{t('quantity')}</TableCell>
                <TableCell sx={{ padding: '16px 8px' }} align="center">{t('price including taxes')}</TableCell>
                <TableCell sx={{ padding: '16px 8px' }} align="center">{t('action')}</TableCell>
            </TableRow>
        </TableHead>
    )

}

export default SharedTableHead;