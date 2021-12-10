
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
	padding-top: 50px;
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
	object-fit: contain;
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
	width: 95%;
    display: flex;
	align-items: center;
	justify-content: space-between;
    font-size: 12px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin: 10px auto;
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
	i {
		font-style: normal;
		font-size: 13px;
	}
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
const BookingCopyright = styled.p`
	font-size: 11px;
	line-height:1.5;
	text-transform: capitalize;
	font-weight: 600;
	color: ${({ theme }) => theme.palette.text.primary};
	text-align: center;
	margin-top: 10px;
`

const Invoice = React.forwardRef((props, ref) => {
	const { t } = useTranslation();

	const { bookingData, userData, qrCode } = props


	return (
		<div style={{ display: 'none' }} >
			<div ref={ref} > 
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<ClientDetails>
							<ClientImg src="https://beautypoint.sa/user-uploads/front-logo/4a9e78fbfa8114184790b9c9702744d4.png" />
							<ClientName>{userData.user.company.companyName}</ClientName>
							<ClientAddress>{userData.user.company.address}</ClientAddress>
							<ClientAddress>رقم التليفون : {userData.user.company.companyPhone}</ClientAddress>
							<ClientAddress><span>{userData.user.company.tax_record}</span> : الرقم الضريبي</ClientAddress>
							<ClientBill>رقم الحجز : {bookingData.id}</ClientBill>
							<ClientDate>تاريخ الفاتورة : {bookingData.date}</ClientDate>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<ClientInfos>
										<span>{t(userData.user.name)}</span>
										<span>: دفع الي</span>
									</ClientInfos>
								</Grid>
								<Grid item xs={6}>
									<ClientInfos>
										<span>{t(bookingData.user.name)}</span>
										<span>: العميل</span>
									</ClientInfos>
									<ClientInfos>
										<span>{t(bookingData.status)}</span>
										<span>: حالة الحجز</span>
									</ClientInfos>
								</Grid>
							</Grid>
							<BookingDataHeading>{t('booking items')}</BookingDataHeading>
							<TableContainer component={Paper} sx={{ my: 2 }}>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell align="left">{<BookingDataBody>{t('item')}</BookingDataBody>}</TableCell>
											<TableCell align="left">{<BookingDataBody>{t('price')}</BookingDataBody>}</TableCell>
											<TableCell align="left">{<BookingDataBody>{t('amount')}</BookingDataBody>}</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											bookingData.items && bookingData.items.map( (item, index) => {
												return (
													<TableRow
														key={index}
														sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
													>
														<TableCell component="th" scope="row" align="left">
															{<BookingDataBody>{item.item.name}</BookingDataBody>}
														</TableCell>
														<TableCell align="left">{<BookingDataBody>{`${item.quantity} x ${item.price}`}</BookingDataBody>}</TableCell>
														<TableCell align="left">{<BookingDataBody>{item.amount}</BookingDataBody>}</TableCell>
													</TableRow>
												)
											})
										}
									</TableBody>
								</Table>
							</TableContainer>
							<BillTotal>
								<i>:ضريبة القيمة المضافة %15</i>
								<span>{formatCurrency(bookingData.vat)}</span>
							</BillTotal>
							<BillTotal>
								<span>المجموع الكلي : </span>
								<span>{formatCurrency(bookingData.price)}</span>
							</BillTotal>
							<QrWrapper>
								{qrCode && <QRCode value={qrCode} />}
							</QrWrapper>
							<BookingCopyright>Powered By Beauty Point</BookingCopyright>
						</ClientDetails>
					</Grid>
				</Grid>
			</div>
		</div>
	)
})
export default Invoice;