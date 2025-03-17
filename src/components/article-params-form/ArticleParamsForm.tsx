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
} from '../../constants/articleProps';
import { Text } from '../../ui/text/Text';
import { Spacing } from '../../ui/spacing/Spacing';
import { clsx } from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState, useEffect, useRef } from 'react';

type optionsStyle = {
	font: string;
	size: string;
	color: string;
	backgroundColor: string;
	contentWidth: string;
};

type propsStyle = {
	setStyleState: ({}: optionsStyle) => void;
};

export const ArticleParamsForm = (props: propsStyle) => {
	const { setStyleState } = props;
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
		fontFamilyOptions[0]
	);
	const [valueSize, setValueSize] = useLocalStorage('size', fontSizeOptions[0]);
	const [valueColor, setValueColor] = useLocalStorage('color', fontColors[0]);
	const [valueBackgroundColor, setValueBackgroundColor] = useLocalStorage(
		'backgroundColor',
		backgroundColors[0]
	);
	const [valueContentWidth, setValueContentWidth] = useLocalStorage(
		'contentWidth',
		contentWidthArr[0]
	);

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
			font: JSON.parse(localStorage.fontInitial).value,
			size: JSON.parse(localStorage.sizeInitial).value,
			color: JSON.parse(localStorage.colorInitial).value,
			backgroundColor: JSON.parse(localStorage.backgroundColorInitial).value,
			contentWidth: JSON.parse(localStorage.contentWidthInitial).value,
		});
		setValueFont(fontFamilyOptions[0]);
		setValueSize(fontSizeOptions[0]);
		setValueColor(fontColors[0]);
		setValueBackgroundColor(backgroundColors[0]);
		setValueContentWidth(contentWidthArr[0]);
	};

	useEffect(() => {
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
	});

	return (
		<div ref={asideRef}>
			<ArrowButton
				isOpen={arrowIsOpen}
				onClick={() => {
					setArrowIsOpen(!arrowIsOpen);
				}}
			/>
			<aside
				className={
					!arrowIsOpen
						? clsx(styles.container)
						: clsx(styles.container, styles.container_open)
				}>
				<form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
					<Text weight={800} size={31} uppercase={true}>
						задайте параметры
					</Text>
					<Spacing height={50}></Spacing>
					<Select
						selected={valueFont}
						options={fontFamilyOptions}
						title={TitleList.font}
						onChange={setValueFont}></Select>
					<Spacing height={50}></Spacing>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={valueSize}
						title={TitleList.size}
						onChange={setValueSize}></RadioGroup>
					<Spacing height={50}></Spacing>
					<Select
						selected={valueColor}
						options={fontColors}
						title={TitleList.color}
						onChange={setValueColor}></Select>
					<Spacing height={50}></Spacing>
					<Separator></Separator>
					<Spacing height={50}></Spacing>
					<Select
						selected={valueBackgroundColor}
						options={backgroundColors}
						title={TitleList.backgroundColor}
						onChange={setValueBackgroundColor}></Select>
					<Spacing height={50}></Spacing>
					<Select
						selected={valueContentWidth}
						options={contentWidthArr}
						title={TitleList.contentWidth}
						onChange={setValueContentWidth}></Select>
					<Spacing height={137}></Spacing>
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
