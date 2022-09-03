import React, { useRef, useState } from 'react';
import useIsFocused from './hooks/useIsFocused';
import usePdfData from './hooks/usePdfData';
import VerticalPages from './VerticalPages';
import ZoomControls from './ui/ZoomControls';

export interface MiniViewerAppProps {
	pdfPath: string;
	isDarkTheme: boolean;
	anchorPage: number;
	pdfId: string;
}

export default function MiniViewerApp(props: MiniViewerAppProps) {
	const pdf = usePdfData(props.pdfPath);
	const isFocused = useIsFocused();
	const [zoom, setZoom] = useState<number>(1);
	const containerEl = useRef<HTMLDivElement>(null);

	if (!pdf) {
		return (
			<div className="mini-app loading">
				<div>Loading pdf..</div>
			</div>);
	}

	return (
		<div className={`mini-app${isFocused ? ' focused' : ''}`}>
			<div className={`app-pages${isFocused ? ' focused' : ''}`} ref={containerEl}>
				<VerticalPages
					pdf={pdf}
					isDarkTheme={props.isDarkTheme}
					anchorPage={props.anchorPage}
					pdfId={props.pdfId}
					rememberScroll={true}
					container={containerEl}
					showPageNumbers={true}
					zoom={zoom} />
			</div>
			<div className='app-bottom-bar'>
				<div className='pdf-info'>
					<div style={{ paddingRight: '0.4rem' }}>{pdf.pageCount} pages</div>
					<ZoomControls onChange={setZoom} zoom={zoom} />
				</div>
				<div>{isFocused ? '' : 'Click to enable scroll'}</div>
			</div>
		</div>
	);
}
