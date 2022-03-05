import { Cell } from '../grid/Cell';
import { BaseModal } from './BaseModal';

type Props = {
	isOpen: boolean;
	handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
	return (
		<BaseModal
			title="How to play"
			isOpen={isOpen}
			handleClose={handleClose}
		>
			<p className="text-sm text-gray-500 dark:text-gray-300">
				Guess the words in 9 tries. After each guess, the color of the
				tiles will change to show how close your guess was to the word.
			</p>

			<div className="flex justify-center mb-1 mt-4">
				<Cell
					isRevealing={true}
					isCompleted={true}
					value="W"
					status="correct"
				/>
				<Cell value="E" />
				<Cell value="A" />
				<Cell value="R" />
				<Cell value="Y" />
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-300">
				The letter W is in the word and in the correct spot.
			</p>

			<div className="flex justify-center mb-1 mt-4">
				<Cell value="P" />
				<Cell value="I" />
				<Cell
					isRevealing={true}
					isCompleted={true}
					value="L"
					status="present"
				/>
				<Cell value="O" />
				<Cell value="T" />
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-300">
				The letter L is in the word but in the wrong spot.
			</p>

			<div className="flex justify-center mb-1 mt-4">
				<Cell value="V" />
				<Cell value="A" />
				<Cell value="G" />
				<Cell
					isRevealing={true}
					isCompleted={true}
					value="U"
					status="absent"
				/>
				<Cell value="E" />
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-300">
				The letter U is not in the word in any spot.
			</p>

			<p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
				There will be 4 Wordle grids at the same time, controlled with
				the same key inputs. The two leftmost grids behave normally, but
				the grids on the right will reverse the word you enter.
			</p>

			<p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
				This is a ripoff of Josh Wardle's{' '}
				<span className="not-italic">Wordle</span>, made with love.
			</p>
		</BaseModal>
	);
};
