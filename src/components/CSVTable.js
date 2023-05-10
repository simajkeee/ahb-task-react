import { useContext } from "react";
import { CsvContext } from "./providers/CSVContextProvider";
import { NavLink } from "react-router-dom";

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
        <div>
          <h1 className='message-wrapper'>
            Failed to render the table.{" "}
            <NavLink to='/'>Please try to upload a cvs file again</NavLink>.
          </h1>
        </div>
      )}
    </>
  );
}

export default CSVTable;
