import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [styleState, setStyleState] = useState({
		font: defaultArticleState.fontFamilyOption.value,
		size: defaultArticleState.fontSizeOption.value,
		color: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleState.font,
					'--font-size': styleState.size,
					'--font-color': styleState.color,
					'--container-width': styleState.contentWidth,
					'--bg-color': styleState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm setStyleState={setStyleState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
