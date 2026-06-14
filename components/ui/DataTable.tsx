import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  align?: "start" | "center" | "end";
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  empty = "لا توجد بيانات لعرضها",
  rowKey,
  className,
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: string;
  rowKey?: (row: T, i: number) => string;
  className?: string;
}) {
  const alignClass = (a?: string) =>
    a === "end" ? "text-left" : a === "center" ? "text-center" : "text-right";

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-beige-line bg-beige-card shadow-soft", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-beige-line bg-beige/60">
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted",
                    alignClass(c.align)
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-muted">
                  {empty}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={rowKey ? rowKey(row, i) : i}
                  className="border-b border-beige-line/70 transition last:border-0 hover:bg-beige/50"
                >
                  {columns.map((c) => (
                    <td
                      key={String(c.key)}
                      className={cn("whitespace-nowrap px-4 py-3 text-ink", alignClass(c.align), c.className)}
                    >
                      {c.render ? c.render(row) : String(row[c.key as keyof T] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
