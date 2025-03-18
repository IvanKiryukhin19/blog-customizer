import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from '../../ui/separator/Separator';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Select } from '../../ui/select/Select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from '../../constants/articleProps';
import { Text } from '../../ui/text/Text';
import { clsx } from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useLocalStorage } from '../hooks/useLocalStorage';

type OptionsStyle = {
	font: string;
	size: string;
	color: string;
	backgroundColor: string;
	contentWidth: string;
};

type ArticleParamsFormProps = {
	setStyleState: ({}: OptionsStyle) => void;
};

export const ArticleParamsForm = ({
	setStyleState,
}: ArticleParamsFormProps) => {
	const [arrowIsOpen, setArrowIsOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement>(null);

	const TitleList = {
		font: 'шрифт',
		size: 'размер шрифта',
		color: 'цвет шрифта',
		backgroundColor: 'цвет фона',
		contentWidth: 'ширина контента',
	};

	const [valueFont, setValueFont] = useLocalStorage(
		'font',
		defaultArticleState.fontFamilyOption
	);
	const [valueSize, setValueSize] = useLocalStorage(
		'size',
		defaultArticleState.fontSizeOption
	);
	const [valueColor, setValueColor] = useLocalStorage(
		'color',
		defaultArticleState.fontColor
	);
	const [valueBackgroundColor, setValueBackgroundColor] = useLocalStorage(
		'backgroundColor',
		defaultArticleState.backgroundColor
	);
	const [valueContentWidth, setValueContentWidth] = useLocalStorage(
		'contentWidth',
		defaultArticleState.contentWidth
	);

	useEffect(() => {
		if (!arrowIsOpen) return;

		const handleClose = (evt: MouseEvent) => {
			if (
				arrowIsOpen &&
				asideRef.current &&
				!asideRef.current?.contains(evt.target as HTMLElement)
			) {
				setArrowIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClose);

		return () => {
			document.removeEventListener('mousedown', handleClose);
		};
	}, [arrowIsOpen]);

	const handleApplyStyle = () => {
		setStyleState({
			font: JSON.parse(localStorage.font).value,
			size: JSON.parse(localStorage.size).value,
			color: JSON.parse(localStorage.color).value,
			backgroundColor: JSON.parse(localStorage.backgroundColor).value,
			contentWidth: JSON.parse(localStorage.contentWidth).value,
		});
	};

	const handleReset = () => {
		setStyleState({
			font: defaultArticleState.fontFamilyOption.value,
			size: defaultArticleState.fontSizeOption.value,
			color: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
		setValueFont(defaultArticleState.fontFamilyOption);
		setValueSize(defaultArticleState.fontSizeOption);
		setValueColor(defaultArticleState.fontColor);
		setValueBackgroundColor(defaultArticleState.backgroundColor);
		setValueContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<div ref={asideRef}>
			<ArrowButton
				isOpen={arrowIsOpen}
				onClick={() => {
					setArrowIsOpen(!arrowIsOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: arrowIsOpen,
				})}>
				<form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
					<Text as={'h2'} weight={800} size={31} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={valueFont}
						options={fontFamilyOptions}
						title={TitleList.font}
						onChange={setValueFont}></Select>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={valueSize}
						title={TitleList.size}
						onChange={setValueSize}></RadioGroup>
					<Select
						selected={valueColor}
						options={fontColors}
						title={TitleList.color}
						onChange={setValueColor}></Select>
					<Separator />
					<Select
						selected={valueBackgroundColor}
						options={backgroundColors}
						title={TitleList.backgroundColor}
						onChange={setValueBackgroundColor}></Select>
					<Select
						selected={valueContentWidth}
						options={contentWidthArr}
						title={TitleList.contentWidth}
						onChange={setValueContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApplyStyle}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
