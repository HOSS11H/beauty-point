import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import DOMPurify from "dompurify";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { formatCurrency } from '../../../../../../shared/utility';

const EmployeeImg = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 10px;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`
const EmployeeData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
`
const EmployeeDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 5px;
`

const EmployeeDataInfo = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const EmployeeDesc = styled.div`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    p {
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
    }
`



const ViewModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedEmployees } = props;

    const { t } = useTranslation();

    const employeeIndex = fetchedEmployees.data.findIndex(employee => employee.id === id);

    const employeeData = fetchedEmployees.data[employeeIndex];
    
    let content;

    if (employeeData) {
        const mySafeHTML = DOMPurify.sanitize(employeeData.description);
        content = (
            <Grid container  spacing={2}>
                <Grid item xs={12} md={6}>
                    <EmployeeImg>
                        <img src={employeeData.image} alt="employee" />
                    </EmployeeImg>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <EmployeeData>
                                <EmployeeDataHeading>{t('employee name')}</EmployeeDataHeading>
                                <EmployeeDataInfo>{employeeData.name}</EmployeeDataInfo>
                            </EmployeeData>
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeData>
                                <EmployeeDataHeading>{t('quantity')}</EmployeeDataHeading>
                                <EmployeeDataInfo>{employeeData.quantity}</EmployeeDataInfo>
                            </EmployeeData>
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeData>
                                <EmployeeDataHeading>{t('original price')}</EmployeeDataHeading>
                                <EmployeeDataInfo>{formatCurrency(employeeData.price)}</EmployeeDataInfo>
                            </EmployeeData>
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeData>
                                <EmployeeDataHeading>{t('price after discount')}</EmployeeDataHeading>
                                <EmployeeDataInfo>{formatCurrency(employeeData.discount_price)}</EmployeeDataInfo>
                            </EmployeeData>
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeData>
                                <EmployeeDataHeading>{t('discount type')}</EmployeeDataHeading>
                                <EmployeeDataInfo>{t(employeeData.discount_type)}</EmployeeDataInfo>
                            </EmployeeData>
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeData>
                                <EmployeeDataHeading>{t('discount value')}</EmployeeDataHeading>
                                <EmployeeDataInfo>{employeeData.discount}</EmployeeDataInfo>
                            </EmployeeData>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <EmployeeData>
                        <EmployeeDataHeading>{t('description')}</EmployeeDataHeading>
                        <EmployeeDesc dangerouslySetInnerHTML={{ __html: mySafeHTML }} />
                    </EmployeeData>
                </Grid>
            </Grid>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

export default ViewModal;