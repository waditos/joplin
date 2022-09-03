import React from 'react';
import shim from '@joplin/lib/shim';
shim.setReact(React);
import { render } from 'react-dom';
import * as pdfjsLib from 'pdfjs-dist';
import MiniViewerApp from './miniViewer';

require('./viewer.css');

// Setting worker path to worker bundle.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

const url = window.frameElement.getAttribute('x-url');
const type = window.frameElement.getAttribute('x-type');
const appearance = window.frameElement.getAttribute('x-appearance');
const anchorPage = window.frameElement.getAttribute('x-anchorPage');
const pdfId = window.frameElement.getAttribute('id');

document.documentElement.setAttribute('data-theme', appearance);

function App() {
	if (type === 'mini') {
		return <MiniViewerApp pdfPath={url} isDarkTheme={appearance === 'dark'} anchorPage={anchorPage ? Number(anchorPage) : null} pdfId={pdfId} />;
	}
	return <div>Error: Unknown app type "{type}"</div>;
}

render(
	<App/>,
	document.getElementById('pdf-root')
);
