import { getGuessStatuses } from './statuses';
import { solution, solutionIndex } from './words';
import { GAME_TITLE } from '../constants/strings';
import { MAX_CHALLENGES } from '../constants/settings';

export const shareStatus = (
	guesses: string[],
	lost: boolean,
	isHardMode: boolean,
	isDarkMode: boolean,
	isHighContrastMode: boolean
) => {
	navigator.clipboard.writeText(
		`${GAME_TITLE} ${solutionIndex} ${
			lost ? 'X' : guesses.length
		}/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` +
			generateEmojiGrid(
				guesses,
				getEmojiTiles(isDarkMode, isHighContrastMode)
			)
	);
};

export const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
	const guessesNeeded = [0, 1, 2, 3].map((i: number) => {
		return (
			(guesses.indexOf(
				i % 2 === 0
					? solution[i]
					: solution[i].split('').reverse().join('')
			) +
				20) %
			20
		);
	});
	return (
		guesses
			.map((guess, j) => {
				const status = [
					getGuessStatuses(guess, 0),
					getGuessStatuses(guess.split('').reverse().join(''), 1),
				];
				return guessesNeeded[0] < j && guessesNeeded[1] < j
					? ''
					: guess
							.split('')
							.map((_, i) => {
								if (j > guessesNeeded[0]) {
									return tiles[3];
								}
								switch (status[0][i]) {
									case 'correct':
										return tiles[0];
									case 'present':
										return tiles[1];
									default:
										return tiles[2];
								}
							})
							.join('') +
							' ' +
							guess
								.split('')
								.map((_, i) => {
									if (j > guessesNeeded[1]) {
										return tiles[3];
									}
									switch (status[1][i]) {
										case 'correct':
											return tiles[0];
										case 'present':
											return tiles[1];
										default:
											return tiles[2];
									}
								})
								.join('');
			})
			.filter((str) => str !== '')
			.join('\n') +
		'\n\n' +
		guesses
			.map((guess, j) => {
				const status = [
					getGuessStatuses(guess, 2),
					getGuessStatuses(guess.split('').reverse().join(''), 3),
				];
				return guessesNeeded[2] < j && guessesNeeded[3] < j
					? ''
					: guess
							.split('')
							.map((_, i) => {
								if (j > guessesNeeded[2]) {
									return tiles[3];
								}
								switch (status[0][i]) {
									case 'correct':
										return tiles[0];
									case 'present':
										return tiles[1];
									default:
										return tiles[2];
								}
							})
							.join('') +
							' ' +
							guess
								.split('')
								.map((_, i) => {
									if (j > guessesNeeded[3]) {
										return tiles[3];
									}
									switch (status[1][i]) {
										case 'correct':
											return tiles[0];
										case 'present':
											return tiles[1];
										default:
											return tiles[2];
									}
								})
								.join('');
			})
			.filter((str) => str !== '')
			.join('\n') +
		'\n\nhttps://jhalfsharp.github.io/mirrordle/'
	);
};

const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
	let tiles: string[] = [];
	tiles.push(isHighContrastMode ? '🟧' : '🟩');
	tiles.push(isHighContrastMode ? '🟦' : '🟨');
	tiles.push(isDarkMode ? '⬜' : '⬛');
	tiles.push(isDarkMode ? '⬛' : '⬜');
	return tiles;
};
