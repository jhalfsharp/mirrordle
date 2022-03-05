import { getStatuses, hasBeenGuessed } from '../../lib/statuses';
import { Key } from './Key';
import { useEffect } from 'react';
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings';
import { localeAwareUpperCase } from '../../lib/words';

type Props = {
	onChar: (value: string) => void;
	onDelete: () => void;
	onEnter: () => void;
	guesses: string[];
	isRevealing?: boolean;
};

export const Keyboard = ({
	onChar,
	onDelete,
	onEnter,
	guesses,
	isRevealing,
}: Props) => {
	const onClick = (value: string) => {
		if (value === 'ENTER') {
			onEnter();
		} else if (value === 'DELETE') {
			onDelete();
		} else {
			onChar(value);
		}
	};

	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.code === 'Enter') {
				onEnter();
			} else if (e.code === 'Backspace') {
				onDelete();
			} else {
				const key = localeAwareUpperCase(e.key);
				// TODO: check this test if the range works with non-english letters
				if (key.length === 1 && key >= 'A' && key <= 'Z') {
					onChar(key);
				}
			}
		};
		window.addEventListener('keyup', listener);
		return () => {
			window.removeEventListener('keyup', listener);
		};
	}, [onEnter, onDelete, onChar]);

	return (
		<div className="fixed bottom-0 left-0 right-0 justify-center bg-white dark:bg-slate-900 py-4">
			<div className="flex justify-center mb-1">
				{['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(
					(key) => (
						<Key
							value={key}
							key={key}
							onClick={onClick}
							status={
								hasBeenGuessed(guesses, key)
									? [
											getStatuses(guesses, 0)[key],
											getStatuses(guesses, 1)[key],
											getStatuses(guesses, 2)[key],
											getStatuses(guesses, 3)[key],
									  ]
									: undefined
							}
							isRevealing={isRevealing}
						/>
					)
				)}
			</div>
			<div className="flex justify-center mb-1">
				{['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
					<Key
						value={key}
						key={key}
						onClick={onClick}
						status={
							hasBeenGuessed(guesses, key)
								? [
										getStatuses(guesses, 0)[key],
										getStatuses(guesses, 1)[key],
										getStatuses(guesses, 2)[key],
										getStatuses(guesses, 3)[key],
								  ]
								: undefined
						}
						isRevealing={isRevealing}
					/>
				))}
			</div>
			<div className="flex justify-center">
				<Key
					width={65.4}
					value="ENTER"
					onClick={onClick}
					isSpecial={true}
				>
					{ENTER_TEXT}
				</Key>
				{['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
					<Key
						value={key}
						key={key}
						onClick={onClick}
						status={
							hasBeenGuessed(guesses, key)
								? [
										getStatuses(guesses, 0)[key],
										getStatuses(guesses, 1)[key],
										getStatuses(guesses, 2)[key],
										getStatuses(guesses, 3)[key],
								  ]
								: undefined
						}
						isRevealing={isRevealing}
					/>
				))}
				<Key
					width={65.4}
					value="DELETE"
					onClick={onClick}
					isSpecial={true}
				>
					{DELETE_TEXT}
				</Key>
			</div>
		</div>
	);
};
