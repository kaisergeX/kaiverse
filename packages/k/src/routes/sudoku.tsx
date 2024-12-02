import {classNames, createSudokuLevel, isSomeTruthy} from '#utils'
import {createFileRoute} from '@tanstack/react-router'
import {useCallback, useState} from 'react'
import {createSignal} from '@kaiverse/signal'

export const Route = createFileRoute('/sudoku')({
  component: SudokuPlayground,
})

const [board] = createSignal(createSudokuLevel('easy'))

function SudokuPlayground() {
  const [selectedCell, setSelectedCell] = useState({row: 0, col: 0})

  const selectCell = useCallback(
    (row: number, col: number) => () => {
      setSelectedCell({row, col})
    },
    [],
  )

  return (
    <div className="container mx-auto space-y-8">
      <h2 className="text-center text-3xl">Sudoku</h2>
      <p className="font-light">
        Selected cell: Row <strong>{selectedCell.row}</strong> - Col:{' '}
        <strong>{selectedCell.col}</strong>
      </p>
      <div className="k-sudoku mx-auto text-2xl text-sky-950 outline outline-2 outline-[rgba(var(--k-sudoku-theme))]">
        {board().map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <button
              key={`${rowIdx}-${colIdx}`}
              className={classNames(
                'k-sudoku-cell',
                selectedCell.col === colIdx && selectedCell.row === rowIdx
                  ? 'bg-[rgba(var(--k-sudoku-theme),0.4)]'
                  : isSomeTruthy(selectedCell.col === colIdx, selectedCell.row === rowIdx)
                    ? 'bg-[rgba(var(--k-sudoku-theme),0.2)]'
                    : 'bg-transparent hover:bg-[rgba(var(--k-sudoku-theme),0.15)]',
              )}
              type="button"
              data-row={rowIdx}
              data-col={colIdx}
              onClick={selectCell(rowIdx, colIdx)}
            >
              <span>{cell.value}</span>
            </button>
          )),
        )}
      </div>
    </div>
  )
}
