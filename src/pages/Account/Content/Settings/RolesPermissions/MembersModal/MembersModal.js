import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import v1 from '../../../../../../utils/axios-instance-v1'
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components'

const Loader = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100px;
    flex-grow: 1;
`

const MembersModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedRoles } = props;

    const selectedRole = fetchedRoles.find(role => role.id === id);

    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        v1.get(`/vendors/settings/roles/${id}/users`)
            .then(res => {
                setMembers(res.data)
                setLoading(false)
            })
    }, [id])

    let content = (
            <Loader>
                <CircularProgress color="secondary" />
            </Loader>
        )
        
    if (!loading && members.length > 0) {
        content = (
            <TableContainer component={Paper} sx={{ my: 2 }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{t('name')}</TableCell>
                            <TableCell align="center">{t('role')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            members.map((member, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {member.name}
                                        </TableCell>
                                        <TableCell align="center">{t(selectedRole.name)}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

export default MembersModal;
