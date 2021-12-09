
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

const ClientDetails = styled.div`
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
const ClientBooking = styled.p`
    display: block;
    font-size: 13px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 700;
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
	text-align: center;
`
const BookingDataBody = styled.p`
    font-size: 13px;
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
	return (
		<div style={{ display: 'none' }} >
			<div ref={ref} > 
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<ClientDetails>
							<ClientImg />
							<ClientName>اسم المحل</ClientName>
							<ClientAddress>العنوان كاملا </ClientAddress>
							<ClientBill>رقم الفاتورة : #123456789</ClientBill>
							<ClientDate>تاريخ الفاتورة : 12/12/2020</ClientDate>
							<ClientBooking>رقم الحجز : #37</ClientBooking>
							<ClientInfos>
								<span>العميل</span>
								<span>: دفع الي</span>
							</ClientInfos>
							<ClientInfos>
								<span>موافقة</span>
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
										<TableRow
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{<BookingDataBody>العنصر</BookingDataBody>}
											</TableCell>
											<TableCell>{<BookingDataBody>5</BookingDataBody>}</TableCell>
											<TableCell>{<BookingDataBody>50 ريال</BookingDataBody>}</TableCell>
											<TableCell>{<BookingDataBody>1000 ريال</BookingDataBody>}</TableCell>
										</TableRow>
										{/* {
											props.items && props.items.map( (item, index) => {
												return (
												)
											})
										} */}
									</TableBody>
								</Table>
							</TableContainer>
							<BillTotal>
								<span>ضريبة القيمة المضافة %15</span>
								<span>10 ريال</span>
							</BillTotal>
							<BillTotal>
								<span>المجموع الكلي</span>
								<span>500 ريال</span>
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