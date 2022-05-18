import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
	tableWrapper: {
		flex: 1,
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		paddingBottom: 10,
		marginBottom: 25,
		fontSize: 11,
		borderTop: '3 solid #494949',
	},
	columnHeader: {
		display: 'flex',
		flexWrap: 'wrap',
		borderBottom: '1 solid #494949',
		textAlign: 'left',
	},
	rowVal: {
		color: 'black', 
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	}
});


const StandardTableView = ({tableData, columns}) => {
	return (
		<View style={{...styles.tableWrapper, width: '100%'}}>
			{columns?.map((header, index) => {
				let borderRight = index === columns?.length - 1 ? '1 solid #808080' : 'none'
				let textAlign = header?.align ? header?.align : 'left'
				return (
					<Text 
						wrap={false}
						key={index} 
						style={{
							...styles.columnHeader,
							fontSize: 10,
							width: header.width, 
							textAlign: textAlign,
							paddingHorizontal: 6,
							paddingVertical: 7,
							borderRight: header?.showBorderRight ? '1 solid #494949' : 'none',
							borderLeft: header?.showBorderLeft ? '1 solid #494949' : 'none'
					}}>
						{header.label}
					</Text>
				)
			})}
			{tableData?.map((data, rowIndex) => {
				var rowKey = `table-data-${rowIndex}`
				{if (data.header) {
					return (
						<View 
							key={rowKey} 
							style={{
								borderRight: data?.showBorderRight ? '1 solid #494949' : 'none',
								borderLeft: data?.showBorderLeft ? '1 solid #494949' : 'none',
								display: 'flex', 
								flexDirection: 'row', 
								backgroundColor: 'lightgrey', 
								height: 16, 
								alignItems: 'center', 
								borderBottom: '1 solid #494949',
								borderTop: '1 solid #494949'
							}}>
							<Text 
								wrap={false}
								style={{
									color: 'black',
									width: '100%',
									marginLeft: 13,
									fontSize: 7,
									fontFamily: 'Helvetica Neue Bold'
								}}
							>	
								{data.label}
							</Text>
						</View>
					)
				}}

				let lastRow = rowIndex == tableData.length - 1 ? true : false
				const cells = columns?.map(column => {
					let columnAttr = column?.name
					let value = data?.[columnAttr]
					return  {
						...column,
						value: value,
						lastRow: lastRow
					}
				})

				return cells?.map((item, valueIndex)=> {
					var cellKey = `${rowKey}-${valueIndex}`
					let textAlign = item?.align ? item?.align : 'left'
					let standardStyle = {
						...styles.rowVal, 
						width: item?.width,
						fontSize: 8,
						borderBottom: '1 solid #494949',
						textAlign: textAlign, 
						padding: 6,
						paddingVertical: 3,
						paddingRight: 15,
						borderRight: item?.showBorderRight ? '1 solid #494949' : 'none',
						borderLeft: item?.showBorderLeft ? '1 solid #494949' : 'none'
					}
					return (
						<Text
							wrap={false}
							key={cellKey}
							style={{
								...standardStyle,
							}}
						>
							{item?.value}
						</Text>
					)
				})
			})}
		</View>
	)
}

export default StandardTableView