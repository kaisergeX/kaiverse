import {isNullist} from '../common.ts'

type Cell = {
  value: number | null
  fixed: boolean
}

export type SudokuBoard = Cell[][]

/** Checks if a value can be placed in a sudoku cell */
export function isValidSudokuCell(
  board: SudokuBoard,
  row: number,
  col: number,
  value: number,
): boolean {
  const boxRowStart = ((row / 3) | 0) * 3
  const boxColStart = ((col / 3) | 0) * 3

  return (
    !board[row]?.some((cell) => cell.value === value) &&
    !board.some((eachRow) => eachRow[col]?.value === value) &&
    !board
      .slice(boxRowStart, boxRowStart + 3)
      .some((subRow) =>
        subRow.slice(boxColStart, boxColStart + 3).some((cell) => cell.value === value),
      )
  )
}

/**
 * Generates a solved sudoku board
 * @returns a solved sudoku board
 */
export function generateSolvedSudokuBoard(): SudokuBoard {
  // const sudokuBoard: SudokuBoard = Array<Cell[]>(9).fill(
  //   Array<Cell>(9).fill({value: null, fixed: false}),
  // )

  const sudokuBoard: SudokuBoard = Array.from({length: 9}, () =>
    Array.from({length: 9}, () => ({value: null, fixed: false})),
  )

  console.log('initial board', sudokuBoard)

  function fillBoard(row = 0, col = 0): boolean {
    if (row === 9) return true
    if (col === 9) return fillBoard(row + 1, 0)

    if (!Array.isArray(sudokuBoard[row])) {
      throw new Error('Invalid Sudoku board')
    }

    const numbers = Array.from({length: 9}, (_, i) => i + 1).sort(() => Math.random() - 0.5)
    for (const number of numbers) {
      if (isValidSudokuCell(sudokuBoard, row, col, number)) {
        sudokuBoard[row][col] = {value: number, fixed: true}
        if (fillBoard(row, col + 1)) {
          return true
        }

        sudokuBoard[row][col] = {value: null, fixed: false}
      }
    }
    return false
  }

  fillBoard()
  return sudokuBoard
}

/** Generate Sudoku puzzle with a given number of clues */
export function generateSudokuPuzzle(board: SudokuBoard, clues: number): SudokuBoard {
  const puzzleBoard = structuredClone(board)

  let removed = 0
  while (removed < 81 - clues) {
    const row = (Math.random() * 9) | 0
    const col = (Math.random() * 9) | 0

    if (!puzzleBoard[row] || !puzzleBoard[row][col]) {
      throw new Error('Invalid Sudoku board')
    }

    if (!isNullist(puzzleBoard[row][col].value)) {
      puzzleBoard[row][col] = {value: null, fixed: false}
      removed++
    }
  }

  return puzzleBoard
}

const SUDOKU_LEVELS = {
  easy: 36,
  medium: 32,
  hard: 28,
} as const

/**
 * Creates a sudoku level with the given difficulty
 *
 * @param difficulty The difficulty of the sudoku puzzle
 * @returns Sudoku level with the given difficulty
 */
export function createSudokuLevel(difficulty: keyof typeof SUDOKU_LEVELS): SudokuBoard {
  return generateSudokuPuzzle(generateSolvedSudokuBoard(), SUDOKU_LEVELS[difficulty])
}
