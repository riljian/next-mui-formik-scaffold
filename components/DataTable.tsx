import {
  Checkbox,
  CheckboxProps,
  SortDirection,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'

type Direction = Exclude<SortDirection, false>
interface Column<T> {
  readonly field: keyof T
  readonly label: string
  readonly sortable?: boolean
  readonly defaultSortDirection?: Direction
  readonly renderer?: (value: any, context: T) => JSX.Element
  readonly align?: TableCellProps['align']
  readonly padding?: TableCellProps['padding']
}
interface Props<T> {
  readonly keyField: keyof T
  readonly columns: readonly Column<T>[]
  readonly dataset: readonly T[]
  readonly selected?: readonly T[]
  readonly selectable?: boolean
  readonly onSelectedChange?: (selected: readonly T[]) => void
  readonly order?: Direction
  readonly orderBy?: keyof T | null
  readonly onOrderChange?: (key: keyof T, direction: Direction) => void
}

const defaultConfig: {
  checkboxColor: CheckboxProps['color']
  sortable: boolean
  sortDirection: Direction
} = {
  checkboxColor: 'primary',
  sortable: false,
  sortDirection: 'asc',
}

const DataTable = <T extends any>({
  dataset,
  selected = [],
  selectable = false,
  onSelectedChange,
  columns,
  order,
  orderBy = null,
  keyField,
  onOrderChange,
}: Props<T>) => {
  const numSelected = selected.length
  const rowCount = dataset.length
  const isAnySelected = numSelected > 0
  const isTotalSelected = isAnySelected && numSelected === rowCount
  const isPartialSelected = isAnySelected && !isTotalSelected
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  color={defaultConfig.checkboxColor}
                  indeterminate={isPartialSelected}
                  checked={isTotalSelected}
                  onChange={() => {
                    onSelectedChange &&
                      onSelectedChange(isTotalSelected ? [] : dataset)
                  }}
                />
              </TableCell>
            )}
            {columns.map(
              ({
                field,
                align,
                padding,
                sortable = defaultConfig.sortable,
                label,
                defaultSortDirection = defaultConfig.sortDirection,
              }) => {
                const isOrderByThisField = orderBy === field
                return (
                  <TableCell
                    key={String(field)}
                    align={align}
                    padding={padding}
                    sortDirection={isOrderByThisField ? order : false}
                  >
                    {sortable ? (
                      <TableSortLabel
                        active={isOrderByThisField}
                        direction={
                          isOrderByThisField ? order : defaultSortDirection
                        }
                        onClick={() => {
                          let newDirection = defaultSortDirection
                          if (isOrderByThisField) {
                            newDirection = order === 'asc' ? 'desc' : 'asc'
                          }
                          onOrderChange && onOrderChange(field, newDirection)
                        }}
                      >
                        {label}
                      </TableSortLabel>
                    ) : (
                      label
                    )}
                  </TableCell>
                )
              }
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataset.map((data) => {
            const isRowSelected = selected?.indexOf(data) > -1
            return (
              <TableRow
                key={String(data[keyField])}
                hover
                role="checkbox"
                aria-checked={isRowSelected}
                tabIndex={-1}
                selected={isRowSelected}
              >
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color={defaultConfig.checkboxColor}
                      checked={isRowSelected}
                      onChange={() => {
                        onSelectedChange &&
                          onSelectedChange(
                            isRowSelected
                              ? selected.filter((value) => value !== data)
                              : [...selected, data]
                          )
                      }}
                    />
                  </TableCell>
                )}
                {columns.map(({ align, field, renderer }) => (
                  <TableCell align={align} key={String(field)}>
                    {renderer ? renderer(data[field], data) : data[field]}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
