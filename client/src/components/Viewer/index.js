import TestPDF from './PDF-document.js'
import { PDFViewer } from '@react-pdf/renderer'

function Viewer() {
	return (
		<PDFViewer 
			style = {{
				width: '100%',
				height: '100vh'
			}}
		>
			<TestPDF />
		</PDFViewer>
	);
}

export default Viewer;
