
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
import moment from 'moment'
import { Fragment } from 'react';

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
const CompanyInfo = styled.p`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: #000;
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const InvoiceNotes = styled.p`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: #000;
    transition: 0.3s ease-in-out;
    margin-top: 25px;
	text-align: center;
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
const BookingTimeInfo = styled.p`
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
const BookingStatusInfo = styled.p`
    display: flex;
	align-items: center;
	justify-content: flex-start;
    font-size: 11px;
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
const BillPricesWrapper = styled.div`

`

const BillPrice = styled.p`
    display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: auto;
	margin-right: auto;
    font-size: 13px;
    line-height:1;
    text-transform: capitalize;
    font-weight: 700;
    color: #000;
    transition: 0.3s ease-in-out;
	margin-bottom: 10px;
	&:last-child {
		margin-bottom: 0px;
	}
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
	color: #000;
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
	margin-top: 20px;
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

	const { data, userData, qrCode } = props



	let billTitle = (
		<Fragment>
			<span>فاتورة استرجاع</span>
			<span>Refunded Invoice</span>
		</Fragment>
	)
	let billNumber = (
		<Fragment>
			<ClientBill>رقم فاتورة الاسترجاع : {data.id}</ClientBill>
			<ClientBill>رقم الفاتورة الأصلية : {data.booking_id}</ClientBill>
		</Fragment>
	)


	let BookingPlace;

	if (data.booking_place) {
		BookingPlace = (
			<Fragment>
				<BookingTimeInfo>
					{data.booking_place === 'in_house' && <span>{t('in house')}</span>}
					{data.booking_place === 'in_saloon' && <span>{t('in saloon')}</span>}
					{data.booking_place === 'in_customer_house' && <span>{t('in customer house')}</span>}
					<span> : مكان الحجز</span>
				</BookingTimeInfo>
			</Fragment>
		)
	}

	let customer = (
		<BookingStatusInfo>
			<span>{t(userData.user.name)}</span>
			<span>: الموظف</span>
		</BookingStatusInfo>
	)
	let paidTo = (
		<BookingStatusInfo>
			<span>{t(data.user.name)}</span>
			<span>: دفع الي</span>
		</BookingStatusInfo>
	)
	
	let total = data.total;

	return (
		<div style={{ display: 'none' }} >
			<Wrapper ref={ref} >
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<ClientDetails>
							<InvoiceTitle>
								{billTitle}
							</InvoiceTitle>
							<ClientImg src={userData.user.company?.logo_url} />
							<ClientName>{userData.user.company?.companyName}</ClientName>
							<CompanyInfo>{userData.user.company?.address}</CompanyInfo>
							<CompanyInfo>رقم التليفون : {userData.user.company?.companyPhone}</CompanyInfo>
							<CompanyInfo><span>{userData.user.company?.tax_record}</span> : الرقم الضريبي</CompanyInfo>
							{billNumber}
							<BookingTimeInfo>
								تاريخ الفاتورة : {moment.utc(data.date_time).format('YYYY-MM-DD')}
							</BookingTimeInfo>
							<BookingTimeInfo>
								<span>{moment.utc(data.date_time).format('hh:mm a')}</span>
								<span> : وقت الفاتورة</span>
							</BookingTimeInfo>
							{BookingPlace}
							<Grid sx={{ width: '100%' }} container spacing={1}>
								<Grid item xs={6}>
									{paidTo}
									<BookingStatusInfo>
										<span>{t(data.payment_status)}</span>
										<span>: حالة الدفع</span>
									</BookingStatusInfo>
								</Grid>
								<Grid item xs={6}>
									{customer}
								</Grid>
							</Grid>
							<BookingDataHeading>{t('returned items')}</BookingDataHeading>
							<TableContainer sx={{ my: 2, bakground: 'transparent' }}>
								<Table aria-label="simple table"size="small" >
									<TableHead>
										<TableRow>
											<CustomTableHead align="center">
												<span>Item</span>
												<span>{t('item')}</span>
											</CustomTableHead>
											<CustomTableHead align="center">
												<span>Price x Quantity</span>
												<span>الكمية X السعر</span>
											</CustomTableHead>
											<CustomTableHead align="center">
												<span>Amount</span>
												<span>{t('amount')}</span>
											</CustomTableHead>
										</TableRow>
									</TableHead>
									<TableBody>
										{data.items && data.items.map((item, index) => {
											return (
												<TableRow
													key={index}
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
												>
													<CustomTableCell component="th" scope="row" align="center">
														{<BookingDataBody>{item.name}</BookingDataBody>}
														{item.employee && <ItemEmployee>( {item.employee.name} )</ItemEmployee>}
													</CustomTableCell>
													<CustomTableCell align="center">
														{<BookingDataBody>{`${item.quantity} x - ${item.price}`}</BookingDataBody>}
													</CustomTableCell>
													<CustomTableCell align="center">
														{<BookingDataBody>{`- ${item.amount} SAR`}</BookingDataBody>}
													</CustomTableCell>
												</TableRow>
											)
										})
										}
									</TableBody>
								</Table>
							</TableContainer>
							<BillPricesWrapper>
								<BillPrice>
									<i>المجموع قبل الضريبة :</i>
									<span>{`- ${(total + (data.discount || 0) - data.vat)} SAR`}</span>
								</BillPrice>
								<BillPrice>
									<i>ضريبة القيمة المضافة %15 : </i>
									<span>{`- ${(data.vat)} SAR`}</span>
								</BillPrice>
								<BillPrice>
									<span>الاجمالي : </span>
									<span>{`- ${(total)} SAR`}</span>
								</BillPrice>
								{data.remaining_amount > 0 && (
									<BillPrice>
										<span>المبلغ المدفوع : </span>
										<span>{`- ${(total - data.remaining_amount)} SAR`}</span>
									</BillPrice>
								)}
								{data.remaining_amount > 0 && (
									<BillPrice>
										<span>المبلغ المتبقي : </span>
										<span>{`- ${(data.remaining_amount)} SAR`}</span>
									</BillPrice>
								)}
								<TableContainer sx={{ mt: 2, bakground: 'transparent'}}>
									<Table aria-label="payment-table" size="small">
										<TableHead>
											<TableRow>
												<CustomTableHead align="center">
													<span>Amount</span>
													<span>{t('amount')}</span>
												</CustomTableHead>
												<CustomTableHead align="center">
													<span>Type</span>
													<span>{t('type')}</span>
												</CustomTableHead>
											</TableRow>
										</TableHead>
										<TableBody>
											{data.payments.map((payment, index) => {
												return (
													<TableRow key={index} >
														<CustomTableCell component="th" scope="row" align="center">
															<span>{`- ${(payment.amount)} SAR`}</span>
														</CustomTableCell>
														<CustomTableCell component="th" scope="row" align="center">
															<span>{t(payment.gateway)}</span>
														</CustomTableCell>
													</TableRow>
												)
											})}
										</TableBody>
									</Table>
								</TableContainer>
							</BillPricesWrapper>
							<InvoiceNotes>
								{userData.user.company.invoice_notes}
							</InvoiceNotes>
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
export default Invoice;