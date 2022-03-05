import { solution, unicodeSplit } from './words';

export type CharStatus = 'absent' | 'present' | 'correct';

export const getStatuses = (
	guesses: string[],
	id: number
): { [key: string]: CharStatus } => {
	const charObj: { [key: string]: CharStatus } = {};
	const splitSolution =
		id % 2 === 0
			? unicodeSplit(solution[id])
			: unicodeSplit(solution[id]).reverse();

	guesses.forEach((word) => {
		unicodeSplit(word).forEach((letter, i) => {
			if (!splitSolution.includes(letter)) {
				// make status absent
				return (charObj[letter] = 'absent');
			}

			if (letter === splitSolution[i]) {
				//make status correct
				return (charObj[letter] = 'correct');
			}

			if (charObj[letter] !== 'correct') {
				//make status present
				return (charObj[letter] = 'present');
			}
		});
	});

	return charObj;
};

export const hasBeenGuessed = (guesses: string[], letter: string): boolean => {
	let output = false;
	guesses.forEach((word) => {
		if (word.split('').includes(letter)) {
			output = true;
		}
	});
	return output;
};

export const getGuessStatuses = (guess: string, id: number): CharStatus[] => {
	const splitSolution = unicodeSplit(solution[id]);
	const splitGuess = unicodeSplit(guess);

	const solutionCharsTaken = splitSolution.map((_: any) => false);

	const statuses: CharStatus[] = Array.from(Array(guess.length));

	// handle all correct cases first
	splitGuess.forEach((letter, i) => {
		if (letter === splitSolution[i]) {
			statuses[i] = 'correct';
			solutionCharsTaken[i] = true;
			return;
		}
	});

	splitGuess.forEach((letter, i) => {
		if (statuses[i]) return;

		if (!splitSolution.includes(letter)) {
			// handles the absent case
			statuses[i] = 'absent';
			return;
		}

		// now we are left with "present"s
		const indexOfPresentChar = splitSolution.findIndex(
			(x: string, index: number) =>
				x === letter && !solutionCharsTaken[index]
		);

		if (indexOfPresentChar > -1) {
			statuses[i] = 'present';
			solutionCharsTaken[indexOfPresentChar] = true;
			return;
		} else {
			statuses[i] = 'absent';
			return;
		}
	});

	return statuses;
};
