import SalesView from "@/components/views/SalesView";
import { getInvoices, getSalesSeries } from "@/lib/data";

export default async function SalesPage() {
  const [invoices, salesDaily] = await Promise.all([getInvoices(), getSalesSeries()]);
  const last7 = salesDaily.slice(-7);
  return <SalesView invoices={invoices} last7={last7} salesDaily={salesDaily} />;
}
