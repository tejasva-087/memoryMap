import { ReactElement } from "react";

interface TableRowProps {
  children: ReactElement;
  padding: string;
}
function TableRow({ children, padding }: TableRowProps) {
  return <div style={{ padding }}>{children}</div>;
}

export default TableRow;
