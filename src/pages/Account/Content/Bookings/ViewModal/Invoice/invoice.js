
import React from 'react';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../../../shared/utility';

const ClientDetails = styled.div`
	padding-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const ClientImg = styled.img`
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    margin-bottom: 10px;
    cursor: pointer;
`
const ClientName = styled.p`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const ClientAddress = styled.p`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const ClientBill = styled.p`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const ClientDate = styled.p`
    display: block;
    font-size: 12px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const ClientInfos = styled.p`
	width: 90%;
    display: flex;
	align-items: center;
	justify-content: space-between;
    font-size: 13px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin: 10px 0;
    cursor: pointer;
`
const BillTotal = styled.p`
	width: 85%;
    display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: auto;
	margin-right: auto;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin: 10px 0;
    cursor: pointer;
`


const BookingDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 5px;
	margin-top: 10px;
	text-align: center;
`
const BookingDataBody = styled.p`
    font-size: 12px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
	text-align: center;
`
const QrWrapper = styled.div`
	margin-top: 40px;
`

const Invoice = React.forwardRef((props, ref) => {
	const { t } = useTranslation();

	const { bookingData, userData } = props


	return (
		<div style={{ display: 'none' }} >
			<div ref={ref} > 
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<ClientDetails>
							<ClientImg />
							<ClientName>{userData.user.company.companyName}</ClientName>
							<ClientAddress>{userData.user.company.address}</ClientAddress>
							<ClientBill>رقم الفاتورة : {bookingData.id}</ClientBill>
							<ClientDate>تاريخ الفاتورة : {bookingData.date}</ClientDate>
							<ClientInfos>
								<span>{t(bookingData.user.name)}</span>
								<span>: دفع الي</span>
							</ClientInfos>
							<ClientInfos>
								<span>{t(bookingData.status)}</span>
								<span>: حالة الحجز</span>
							</ClientInfos>
							<BookingDataHeading>{t('booking items')}</BookingDataHeading>
							<TableContainer component={Paper} sx={{ my: 2 }}>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>{<BookingDataBody>{t('item')}</BookingDataBody>}</TableCell>
											<TableCell>{<BookingDataBody>{t('quantity')}</BookingDataBody>}</TableCell>
											<TableCell>{<BookingDataBody>{t('price')}</BookingDataBody>}</TableCell>
											<TableCell>{<BookingDataBody>{t('amount')}</BookingDataBody>}</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											bookingData.items && bookingData.items.map( (item, index) => {
												return (
													<TableRow
														sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
													>
														<TableCell component="th" scope="row">
															{<BookingDataBody>{item.item.name}</BookingDataBody>}
														</TableCell>
														<TableCell>{<BookingDataBody>{item.quantity}</BookingDataBody>}</TableCell>
														<TableCell>{<BookingDataBody>{item.price}</BookingDataBody>}</TableCell>
														<TableCell>{<BookingDataBody>{item.amount}</BookingDataBody>}</TableCell>
													</TableRow>
												)
											})
										}
									</TableBody>
								</Table>
							</TableContainer>
							<BillTotal>
								<span>{formatCurrency(bookingData.vat)}</span>
								<span>:ضريبة القيمة المضافة %15</span>
							</BillTotal>
							<BillTotal>
								<span>{formatCurrency(bookingData.price)}</span>
								<span>:المجموع الكلي</span>
							</BillTotal>
							<QrWrapper>
								<QRCode value="http://facebook.github.io/react/" />
							</QrWrapper>
						</ClientDetails>
					</Grid>
				</Grid>
			</div>
		</div>
	)
})
export default Invoice;