import React from 'react'
import { Text, View, Image } from '@react-pdf/renderer'
import logo from '../images/testLogo.png'

const HeaderView = () => {
	return (
		<View fixed style={{flexDirection: 'row', height: 70, paddingBottom: 10, justifyContent: 'space-between', borderBottom: '1 solid black'}}>
			<Image src={logo} style={{width: 75, height: 75, paddingBottom: 10}} />
			<View style={{paddingTop: 20, alignItems: 'flex-end'}}>
				<Text style={{fontSize: 14}}>Your Company Info Could Be Here!</Text>
				<Text style={{fontSize: 10, paddingTop: 3}}>1234 NW Main Street</Text>
				<Text style={{fontSize: 10, paddingTop: 3}}>Atlanta, GA</Text>
			</View>
		</View>
	)
}

export default HeaderView