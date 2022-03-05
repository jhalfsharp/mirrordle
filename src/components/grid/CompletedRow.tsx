import { getGuessStatuses } from '../../lib/statuses';
import { Cell } from './Cell';
import { unicodeSplit } from '../../lib/words';

type Props = {
  guess: string;
  isRevealing?: boolean;
  id: number;
};

export const CompletedRow = ({ guess, isRevealing, id }: Props) => {
  const statuses = getGuessStatuses(guess, id);
  const splitGuess = unicodeSplit(guess);

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  );
};
