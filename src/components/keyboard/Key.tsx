import { ReactNode } from 'react';
import classnames from 'classnames';
import { CharStatus } from '../../lib/statuses';
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings';
import { getStoredIsHighContrastMode } from '../../lib/localStorage';

type Props = {
	children?: ReactNode;
	value: string;
	width?: number;
	status?: CharStatus[];
	onClick: (value: string) => void;
	isRevealing?: boolean;
	isSpecial?: boolean;
};

export const Key = ({
	children,
	status,
	width = 40,
	value,
	onClick,
	isRevealing,
	isSpecial,
}: Props) => {
	const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH;
	const isHighContrast = getStoredIsHighContrastMode();

	const classes = classnames(
		'group relative grid place-items-center h-screen justify-center rounded mx-0.5 font-bold cursor-pointer select-none dark:text-white',
		{
			'transition ease-in-out': isRevealing,
			'text-sm': isSpecial,
			'text-lg': !isSpecial,
		}
	);

	const getColor = (id: number) => {
		return classnames('absolute order-first w-1/2 h-1/2 ', {
			'transition ease-in-out': isRevealing,
			'bg-slate-200 dark:bg-slate-600 group-hover:bg-slate-300 group-active:bg-slate-400':
				!status,
			'bg-slate-400 dark:bg-slate-800': status?.[id] === 'absent',
			'bg-orange-500 group-hover:bg-orange-600 group-active:bg-orange-700':
				status?.[id] === 'correct' && isHighContrast,
			'bg-cyan-500 group-hover:bg-cyan-600 group-active:bg-cyan-700':
				status?.[id] === 'present' && isHighContrast,
			'bg-green-500 group-hover:bg-green-600 group-active:bg-green-700 text-white':
				status?.[id] === 'correct' && !isHighContrast,
			'bg-yellow-500 group-hover:bg-yellow-600 group-active:bg-yellow-700 text-white':
				status?.[id] === 'present' && !isHighContrast,
		});
	};

	const styles = {
		transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
		width: `${width}px`,
		height: '58px',
	};

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		onClick(value);
		event.currentTarget.blur();
	};

	return (
		<button style={styles} className={classes} onClick={handleClick}>
			<div className={'top-0 left-0 rounded-tl ' + getColor(0)}></div>
			<div className={'top-0 right-0 rounded-tr ' + getColor(1)}></div>
			<div className={'bottom-0 left-0 rounded-bl ' + getColor(2)}></div>
			<div className={'bottom-0 right-0 rounded-br ' + getColor(3)}></div>
			<div className="absolute w-full object-center">
				{children || value}
			</div>
		</button>
	);
};
