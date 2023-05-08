import { useContext } from "react";
import { CsvContext } from "./providers/CSVContextProvider";

function CSVTable() {
  const { parsedRows } = useContext(CsvContext);
  return (
    <>
      {parsedRows.length > 0 ? (
        <div>
          <h1>Parsed CSV table: </h1>
          <table>
            <tbody>
              {parsedRows.map((row, i) => {
                return (
                  <tr key={`row-${i}`}>
                    {row.map((el, j) =>
                      i === 0 ? (
                        <th key={`th-${j}`}>{el}</th>
                      ) : (
                        <td key={`td-${j}`}>{el}</td>
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Failed to render the table. Please upload the file: </h1>
      )}
    </>
  );
}

export default CSVTable;
