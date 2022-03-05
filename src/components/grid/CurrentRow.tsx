import { MAX_WORD_LENGTH } from '../../constants/settings';
import { Cell } from './Cell';
import { unicodeSplit } from '../../lib/words';

type Props = {
  guess: string;
  className: string;
  isReversed?: boolean;
};

export const CurrentRow = ({ guess, className, isReversed }: Props) => {
  const splitGuess = unicodeSplit(guess);
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length));
  const classes = `flex justify-center mb-1 ${className}`;
  let list = splitGuess.map((letter, i) => <Cell key={i} value={letter} />);

  return (
    <div className={classes}>
      {isReversed ? emptyCells.map((_, i) => <Cell key={i} />) : ''}
      {isReversed ? list.reverse() : list}
      {!isReversed ? emptyCells.map((_, i) => <Cell key={i} />) : ''}{' '}
    </div>
  );
};
