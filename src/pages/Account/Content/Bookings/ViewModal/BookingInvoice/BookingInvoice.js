
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
import { format } from 'date-fns/esm';

const Wrapper = styled.div`
	max-width: 95%;
	margin-left: auto;
	margin-right: auto;
`

const InvoiceTitle = styled.p`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: #000;
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
	span {
		display: block;
	}
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
    display: flex;
	align-items: center;
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
	justify-content: flex-start;
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
		color: ${({ theme }) => theme.palette.common.white};
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
const ItemEmployee = styled.span`
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

const BookingInvoice = React.forwardRef((props, ref) => {
	const { t } = useTranslation();

	const { bookingData, userData, qrCode, items } = props

	return (
		<div style={{ display: 'none' }} >
			<Wrapper ref={ref} >
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<ClientDetails>
							<InvoiceTitle>
								{bookingData.payment_status === 'refunded' ? (
									<>
										<span>فاتورة استرجاع</span>
										<span>Refunded Invoice</span>
									</>
								) :
									<>
										<span>فاتورة ضريبية مبسطة</span>
										<span>Simplified Tax Invoice</span>
									</>
								}
							</InvoiceTitle>
							<ClientImg src={userData.user.company?.logo_url} />
							<ClientName>{userData.user.company?.companyName}</ClientName>
							<ClientAddress>{userData.user.company?.address}</ClientAddress>
							<ClientAddress>رقم التليفون : {userData.user.company?.companyPhone}</ClientAddress>
							<ClientAddress><span>{userData.user.company?.tax_record}</span> : الرقم الضريبي</ClientAddress>
							{bookingData.payment_status === 'refunded' ? (
								<>
									<ClientBill>رقم فاتورة الاسترجاع : {bookingData.refunded_id ?? 1}</ClientBill>
									<ClientBill>رقم الفاتورة الأصلية : {bookingData.id}</ClientBill>
								</>
							) : (
								<ClientBill>رقم الفاتورة : {bookingData.id}</ClientBill>
							)}
							<ClientDate>
								تاريخ الحجز : {format(new Date(bookingData.date_time), 'dd-MM-yyyy')}
							</ClientDate>
							<ClientDate>
								<span>{format(new Date(bookingData.date_time), 'hh:ii a')}</span>
								<span> : وقت الحجز</span>
							</ClientDate>
							<Grid sx={{ width: '100%' }} container spacing={2}>
								<Grid item xs={6}>
									{
										bookingData.status === 'completed' || bookingData.status === 'approved' ? (
											<ClientInfos>
												<span>{t(userData.user.name)}</span>
												<span>: دفع الي</span>
											</ClientInfos>
										) : null
									}
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
											items && items.map((item, index) => {
												return (
													<TableRow
														key={index}
														sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
													>
														<CustomTableCell component="th" scope="row" align="center">
															{<BookingDataBody>{item.item.name}</BookingDataBody>}
															{item.employee && <ItemEmployee>( {item.employee.name} )</ItemEmployee>}
														</CustomTableCell>
														<CustomTableCell align="center">
															{<BookingDataBody>{`${item.quantity} x ${item.price}`}</BookingDataBody>}
														</CustomTableCell>
														<CustomTableCell align="center">
															{<BookingDataBody>{formatCurrency(item.amount)}</BookingDataBody>}
														</CustomTableCell>
													</TableRow>
												)
											})
										}
									</TableBody>
								</Table>
							</TableContainer>
							<Grid sx={{ width: '100%' }} container spacing={2}>
								<Grid item xs={12} md={6} >
									<BillTotal>
										<i>المجموع قبل الضريبة :</i>
										<span>{formatCurrency((bookingData.price + bookingData.discount - bookingData.vat))}</span>
									</BillTotal>
								</Grid>
								<Grid item xs={12} md={6} >
									<BillTotal>
										<i>ضريبة القيمة المضافة %15 : </i>
										<span>{formatCurrency(bookingData.vat)}</span>
									</BillTotal>
								</Grid>
								<Grid item xs={12} md={6} >
									<BillTotal>
										<span>المجموع : </span>
										<span>{formatCurrency(bookingData.price + bookingData.discount)}</span>
									</BillTotal>
								</Grid>
								<Grid item xs={12} md={6} >
									<BillTotal>
										<span>قيمة الخصم : </span>
										<span>{formatCurrency(bookingData.discount)}</span>
									</BillTotal>
								</Grid>
								<Grid item xs={12} md={6} >
									<BillTotal>
										<span>الاجمالي : </span>
										<span>{formatCurrency(bookingData.price)}</span>
									</BillTotal>
								</Grid>
								{bookingData.remaining_amount > 0 && (
									<Grid item xs={12} md={6} >
										<BillTotal>
											<span>المبلغ المدفوع : </span>
											<span>{formatCurrency(bookingData.price - bookingData.remaining_amount)}</span>
										</BillTotal>
									</Grid>
								)}
								{bookingData.remaining_amount > 0 && (
									<Grid item xs={12} md={6} >
										<BillTotal>
											<span>المبلغ المتبقي : </span>
											<span>{formatCurrency(bookingData.remaining_amount)}</span>
										</BillTotal>
									</Grid>
								)}
								{
									bookingData.payments.map(payment => {
										return (
											<Grid item xs={12} md={6} key={payment.id}>
												<BillTotal>
													<span>طريقة الدفع : </span>
													<span>{formatCurrency(payment.amount)} {t(payment.gateway)}</span>
												</BillTotal>
											</Grid>
										)
									})
								}
							</Grid>
							<QrWrapper>
								{<QRCode value={qrCode} />}
							</QrWrapper>
							<BookingCopyright>Powered By Beauty Point</BookingCopyright>
						</ClientDetails>
					</Grid>
				</Grid>
			</Wrapper>
		</div>
	)
})
export default BookingInvoice;