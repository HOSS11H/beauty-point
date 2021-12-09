
import React from 'react';
import QRCode from 'qrcode.react';
import  './Invoice.css';
const Invoice = React.forwardRef((props, ref) => {
	return (
		<div style={{ display: 'none' }} >
			<div className="container" ref={ref}>
				<div id="invoice">
					{/* Logo */}
					<img style={{maxHeight: '150px', width: 'auto'}} alt='logo' src={props.log} className="img img-responsive mx-auto d-block" />
					{/* Header text */}
					{/* business information here */}
					<div className="row">
						<div className="col-12 text-center">
							<h2 className="text-center" style={{fontSize: '6rem'}}>
								{/* Shop & Location Name  */}
								{props.shop}
							</h2>
							{/* Address */}
							<h4 style={{fontSize: '4rem'}}>
								<div className="text-center">
									{props.address}
								</div>
								<br />
								{props.mobile}
								<br />
								الرقم الضريبي
								<br />
								###
								<br />
							</h4>
							{/* Title of receipt */}
							<h2 className="text-center" style={{fontSize: '6rem'}}>
								فاتورة						
							</h2>
							{/* Invoice  number, Date  */}
							<p style={{width: '100% !important'}} className="word-wrap">
								<span className="pull-left text-left word-wrap">
									<b style={{fontSize: '4rem'}}> #37</b>
									{/* Table information*/}
									{/* customer info */}
									<br />
									<b style={{fontSize: '4rem'}}>دفع إلى:</b> <span style={{fontSize: '4rem'}}>{props.agent}</span>
									<br />
									<b style={{fontSize: '4rem'}}>حالة الحجز :</b><span style={{fontSize: '4rem'}}>{props.status}</span>
									<br />
								</span>
								<span className="pull-right text-left" style={{fontSize: '3.6rem'}}>
									<b>تاريخ الحجز</b>
									{props.date}
								</span>
							</p>
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-12">
							<br />
							<table className="table table-responsive w-100 d-print-block d-print-table">
								<thead>
									<tr>
										<th style={{fontSize: '4rem'}} width="25%">عنصر</th>
										<th className="text-right" style={{fontSize: '4rem'}} width="25%">الكمية</th>
										<th className="text-right" style={{fontSize: '4rem'}} width="25%">السعر</th>
										<th className="text-right" style={{fontSize: '4rem'}} width="25%">الإجمالي</th>
									</tr>
								</thead>
								<tbody>
									{ props.items && props.items.map((item, index) => {
										return (
											<tr key={index}>
												<td style={{fontSize: '3rem'}}>
													{item.name}
												</td>
												<td className="text-right" style={{fontSize: '4rem'}}>{item.quantity}</td>
												<td className="text-right" style={{fontSize: '4rem'}}>{item.price}</td>
												<td className="text-right" style={{fontSize: '4rem'}}>
													{item.total}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<hr />
						</div>
						<div className="col-6 offset-6">
							<table className="table table-slim">
								<tbody>
									<tr>
										<td style={{fontSize: '4rem'}}>ضريبة القيمة المضافة %15</td>
										<td className="text-right" style={{fontSize: '4rem'}}>{props.vat}</td>
									</tr>
									{/* Total Paid*/}
									<tr>
										<th style={{fontSize: '4rem'}}>
											المجموع الكلي								
										</th>
										<td className="text-right" style={{fontSize: '4rem'}}>
											{props.total}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="col-12 text-center" style={{fontSize: '4rem'}}>
							<p style={{fontSize: '2rem'}}>{props.employee}</p>
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-12 text-center">
							{/*?xml version="1.0" encoding="UTF-8"?*/}
							<QRCode value='http://facebook.github.io/react/' size={200} />
						</div>
					</div>
					<div className="row">
						.
						<br />
						.
						<br />
						.
						<br />
						.
						<br />
						.
						<br />
						.
						<br />
						.
						<br />
						.
						<br />
						.
						<br />
						.
						<br />
						.
						<br />
						.
						<br />
						....................
					</div>
				</div>
			</div>
		</div>
	)
})
export default Invoice;