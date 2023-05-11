import { Table } from "flowbite-react";

export const DataTable = ({ tableInstance } ) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  
  return (
    <Table {...getTableProps()} hoverable={true}>
      {headerGroups.map(headerGroup => (
        <Table.Head {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <Table.HeadCell {...column.getHeaderProps()}>
              {column.render('Header')}
            </Table.HeadCell>
          ))}
          <Table.HeadCell>
            Opciones
          </Table.HeadCell>
        </Table.Head>
      ))}

      <Table.Body {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <Table.Row {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <Table.Cell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Table.Cell>
                )
              })}
              <Table.Cell>
                <a href="/tables" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}