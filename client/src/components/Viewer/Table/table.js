import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import StandardTableView from './standard-table.js'

const SampleTable = (table, images) => {
	const defaultWidth = 100 / 5
	const columns = [{
		label: 'Number',
		name: 'number',
		width: `${defaultWidth}%`,
		align: 'left',
		showBorderLeft: true
	},{
		label: 'Vol',
		name: 'volume',
		width: `${defaultWidth}%`,
		align: 'left'
	}, {
		label: 'Speed',
		name: 'speed',
		width: `${defaultWidth}%`,
		align: 'left'
	}, {
		label: 'Mass',
		name: 'mass',
		width: `${defaultWidth}%`,
		align: 'left'
	}, {
		label: 'Price',
		name: 'price',
		width: `${defaultWidth}%`,
		align: 'left',
		showBorderRight: true
	}]

	const tableData = [{
		number: 6,
		volume: '57 gal.',
		speed: '12 mph.',
		mass: '15 lb.',
		price: '$1500'
	}, {
		number: 3,
		volume: '12 gal.',
		speed: '50 mph.',
		mass: '9 lb.',
		price: '$50'
	}, {
		number: 1,
		volume: '30 gal.',
		speed: '12 mph.',
		mass: '15 lb.',
		price: '$1500'
	}, {
		number: 16,
		volume: '12 gal.',
		speed: '88 mph.',
		mass: '10 lb.',
		price: '$3.50'
	}, {
		number: 42,
		volume: '99 gal.',
		speed: '14 mph.',
		mass: '300 lb.',
		price: '$190'
	}, {
		number: 150,
		volume: '5 gal.',
		speed: '99 mph.',
		mass: '3 lb.',
		price: '$.50'
	}]

	return (
		<View wrap={false} style={{marginBottom: 5}}>
			<Text style={{paddingBottom: 5, backgroundColor: "#fff", color: '#000', width: '100%', fontSize: 12,}}>Sample Table</Text>
			<StandardTableView tableData={tableData} columns={columns} />
		</View>
	)
}

export default SampleTable