
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
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../../../shared/utility';

const Wrapper = styled.div`
	max-width: 95%;
	margin-left: auto;
	margin-right: auto;
`

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
    color: #000;
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const ClientAddress = styled.p`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: #000;
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const ClientBill = styled.p`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: #000;
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const ClientDate = styled.p`
    display: block;
    font-size: 12px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: #000;
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const ClientInfos = styled.p`
    display: flex;
	align-items: center;
	justify-content: flex-end;
    font-size: 12px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 700;
    color: #000;
    transition: 0.3s ease-in-out;
    margin: 10px auto;
	span {
		&:first-child {
			margin-left: 5px;
		}
	}
`
const BillTotal = styled.p`
    display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: auto;
	margin-right: auto;
    font-size: 14px;
    line-height:1;
    text-transform: capitalize;
    font-weight: 700;
    color: #000;
    transition: 0.3s ease-in-out;
    cursor: pointer;
	i {
		font-style: normal;
		font-size: 13px;
	}
	span {
		&:last-child {
			display: inline-block;
			margin-right: 10px;
		}
	}
`


const BookingDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: #000;
    margin-bottom: 5px;
	margin-top: 10px;
	text-align: center;
`
const CustomTableHead = styled(TableCell)`
	text-align: center;
	background-color: #333;
	padding-left: 5px;
	padding-right: 5px;
	span {
		color: #fff;
		font-size: 12px;
		line-height:1.3;
		font-weight: 600;
		display: block;
		text-transform: capitalize;
	}
`
const CustomTableCell = styled(TableCell)`
	padding-left: 5px;
	padding-right: 5px;
`

const BookingDataBody = styled.p`
    font-size: 12px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: #000;
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
	color: #000;
	text-align: center;
	margin-top: 10px;
`

const Invoice = React.forwardRef((props, ref) => {
	const { t } = useTranslation();

	const { bookingData, userData, qrCode } = props


	return (
		<div style={{ display: 'none' }} >
			<Wrapper ref={ref} > 
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<ClientDetails>
							<ClientImg src={userData.user.company?.logo_url} />
							<ClientName>{userData.user.company?.companyName}</ClientName>
							<ClientAddress>{userData.user.company?.address}</ClientAddress>
							<ClientAddress>رقم التليفون : {userData.user.company?.companyPhone}</ClientAddress>
							<ClientAddress><span>{userData.user.company?.tax_record}</span> : الرقم الضريبي</ClientAddress>
							<ClientBill>رقم الحجز : {bookingData.id}</ClientBill>
							<ClientDate>تاريخ الفاتورة : {bookingData.date}</ClientDate>
							<Grid sx={{ width: '100%'}}  container spacing={2}>
								<Grid item xs={6}>
									<ClientInfos>
										<span>{t(userData.user.name)}</span>
										<span>: دفع الي</span>
									</ClientInfos>
									<ClientInfos>
										<span>{t(bookingData.payment_status)}</span>
										<span>: حالة الدفع</span>
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
							<TableContainer sx={{ my: 2, bakground: 'transparent' }}>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<CustomTableHead align="center">
												<span>item</span>
												<span>{t('item')}</span>
											</CustomTableHead>
											<CustomTableHead align="center">
												<span>price x quantity</span>
												<span>الكمية X السعر</span>
											</CustomTableHead>
											<CustomTableHead align="center">
												<span>amount</span>
												<span>{t('amount')}</span>
											</CustomTableHead>
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
														<CustomTableCell component="th" scope="row" align="center">
															{<BookingDataBody>{item.item.name}</BookingDataBody>}
														</CustomTableCell>
														<CustomTableCell align="center">{<BookingDataBody>{`${item.quantity} x ${item.price}`}</BookingDataBody>}</CustomTableCell>
														<CustomTableCell align="center">{<BookingDataBody>{formatCurrency(item.amount)}</BookingDataBody>}</CustomTableCell>
													</TableRow>
												)
											})
										}
									</TableBody>
								</Table>
							</TableContainer>
							<Grid sx={{ width: '100%'}}  container spacing={2}>
								<Grid item xs={12} md={6} >
									<BillTotal>
										<i>الاجمالي قبل الضريبة :</i>
										<span>{formatCurrency((bookingData.price - bookingData.vat))}</span>
									</BillTotal>
								</Grid>
								<Grid item xs={12} md={6} >
									<BillTotal>
										<i>ضريبة القيمة المضافة %15 : </i>
										<span>{formatCurrency(bookingData.vat)}</span>
									</BillTotal>
								</Grid>
								{/* <Grid item xs={12} md={6} >
									<BillTotal>
										<i>الخصم : </i>
										<span>{`${bookingData.discount_percent} %`}</span>
									</BillTotal>
								</Grid> */}
								<Grid item xs={12} md={6} >
									<BillTotal>
										<span>قيمة الخصم : </span>
										<span>{formatCurrency(bookingData.discount)}</span>
									</BillTotal>
								</Grid>
								<Grid item xs={12} md={6} >
									<BillTotal>
										<span>المجموع الكلي : </span>
										<span>{formatCurrency(bookingData.price)}</span>
									</BillTotal>
								</Grid>
								<Grid item xs={12} md={6} >
									<BillTotal>
										<span>طريقة الدفع : </span>
										<span>{t(bookingData.payment_gateway)}</span>
									</BillTotal>
								</Grid>
							</Grid>
							<QrWrapper>
								{qrCode && <QRCode value={qrCode} />}
							</QrWrapper>
							<BookingCopyright>Powered By Beauty Point</BookingCopyright>
						</ClientDetails>
					</Grid>
				</Grid>
			</Wrapper>
		</div>
	)
})
export default Invoice;