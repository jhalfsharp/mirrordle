import { CharStatus } from '../../lib/statuses';
import classnames from 'classnames';
import { REVEAL_TIME_MS } from '../../constants/settings';
import { getStoredIsHighContrastMode } from '../../lib/localStorage';

type Props = {
  value?: string;
  status?: CharStatus;
  isRevealing?: boolean;
  isCompleted?: boolean;
  position?: number;
};

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted;
  const shouldReveal = isRevealing && isCompleted;
  const animationDelay = `${position * REVEAL_TIME_MS}ms`;
  const isHighContrast = getStoredIsHighContrastMode();

  const classes = classnames(
    'box-border relative flex-auto max-w-[3.5rem] aspect-square border-solid border-2 items-center justify-center m-0.5 text-[1.5rem] lg:text-4xl text-center font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-green-500 text-white border-green-500':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-yellow-500 text-white border-yellow-500':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  );

  return (
    <div className={classes} style={{ animationDelay }}>
      <div
        className="letter-container aspect-square absolute top-0 right-0 bottom-0 left-0 grid place-items-center"
        style={{ animationDelay }}
      >
        {value}
      </div>
    </div>
  );
};
