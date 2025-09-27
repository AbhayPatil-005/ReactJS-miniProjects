import { useSelector } from "react-redux";

export const ExportCSV = () => {
  const expenses = useSelector((state) => state.expenses.expenses);

  if (!expenses || expenses.length === 0) return null;

  const downloadCSV = () => {
    const headers = `"Amount","Description","Category"\n`;
    const escape = (value) =>
    `"${String(value).replace(/"/g, '""')}"`;
    
    const rows = expenses
      .map((exp, index) => [exp.amount, exp.description, exp.category].map(escape).join(","))
      .join("\n");
    const csvContent = headers + rows;


    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "userdata.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.amount}</td>
              <td>{row.description}</td>
              <td>{row.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};