import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import moment from 'moment';

const Footer = () => {
	const date = moment().format('MM/DD/YYYY')
	return (
			<View 
				fixed
				style={{
					width:'100%', 
					display: 'flex', 
					flexDirection: 'row', 
					alignItems: 'flex-end',
					borderTop: '1 solid #000', 
					height: 17,
					paddingTop: 7, 
					marginTop: 10,
					fontSize: 7,
				}}
			>
				<Text style={{width: '75%'}}>
					Testing 123
				</Text>
				<Text style={{width: '10%',}}>
					{date}
				</Text>
				<Text
					style={{
						marginBottom: -11,
						paddingLeft: 50,
						minHeight: 20, 
						width: '15%',
					}}
					render={(
						{ pageNumber, totalPages }) => {
							return `pg. ${pageNumber} / ${totalPages}`
					}} 
				/>
			</View>
	)
}

export default Footer

