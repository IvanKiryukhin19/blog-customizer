import { ElementType } from 'react';
import { clsx } from 'clsx';

import styles from './index.module.scss';

type TextProps = {
	/** Тэг которым отрендерить текст */
	as?: ElementType;
	/** Высота spicing */
	height?: 4 | 24 | 50 | 90 | 137;
};

export const Spacing = ({ as: Tag = 'div', height = 50 }: TextProps) => {
	const className = clsx(styles[`height${height}`]);
	return <Tag className={className}></Tag>;
};
