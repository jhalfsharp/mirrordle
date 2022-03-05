import { MAX_CHALLENGES } from '../../constants/settings';
import { CompletedRow } from './CompletedRow';
import { CurrentRow } from './CurrentRow';
import { EmptyRow } from './EmptyRow';
import { solution } from '../../lib/words';

type Props = {
	guesses: string[];
	currentGuess: string;
	isRevealing?: boolean;
	currentRowClassName: string;
	id: number;
	isReversed?: boolean;
};

export const Grid = ({
	guesses,
	currentGuess,
	isRevealing,
	currentRowClassName,
	isReversed,
	id,
}: Props) => {
	let isCompleted =
		(guesses.includes(solution[id]) && !isReversed) ||
		(guesses.includes(solution[id].split('').reverse().join('')) &&
			isReversed);
	const guessList: string[] = isCompleted
		? guesses.slice(
				0,
				isReversed
					? guesses.indexOf(
							solution[id].split('').reverse().join('')
					  ) + 1
					: guesses.indexOf(solution[id]) + 1
		  )
		: guesses;
	const empties =
		guessList.length < MAX_CHALLENGES - 1
			? Array.from(Array(MAX_CHALLENGES - 1 - guessList.length))
			: [];

	return (
		<div className="px-2 pb-6 flex-auto">
			{guessList.map((guess, i) => (
				<CompletedRow
					key={i}
					guess={
						isReversed ? guess.split('').reverse().join('') : guess
					}
					isRevealing={isRevealing && guesses.length - 1 === i}
					id={id}
				/>
			))}
			{guessList.length < MAX_CHALLENGES && (
				<CurrentRow
					guess={isCompleted ? '' : currentGuess}
					className={currentRowClassName}
					isReversed={isReversed}
				/>
			)}
			{empties.map((_, i) => (
				<EmptyRow key={i} />
			))}
		</div>
	);
};
