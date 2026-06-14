import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { getRecipes, recipeTotal } from "@/lib/data";
import { sar } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export default async function RecipesPage() {
  const recipes = await getRecipes();
  return (
    <>
      <PageHeader title="الوصفات" description="مكوّنات كل منتج والتكلفة النهائية للوصفة الواحدة" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recipes.map((r) => {
          const total = recipeTotal(r);
          return (
            <Card key={r.productId} className="flex flex-col">
              <div className="flex items-center justify-between border-b border-beige-line p-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-caramel/12 text-caramel-dark">
                    <BookOpen className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">{r.productName}</h3>
                </div>
              </div>
              <CardContent className="flex-1 p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-muted">
                      <th className="px-4 py-2 text-right font-medium">المكوّن</th>
                      <th className="px-2 py-2 text-center font-medium">الكمية</th>
                      <th className="px-2 py-2 text-center font-medium">الوحدة</th>
                      <th className="px-4 py-2 text-left font-medium">التكلفة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.items.map((it, i) => (
                      <tr key={i} className="border-t border-beige-line/60">
                        <td className="px-4 py-2 text-ink">{it.material}</td>
                        <td className="px-2 py-2 text-center text-espresso-600">{it.qty}</td>
                        <td className="px-2 py-2 text-center text-muted">{it.unit}</td>
                        <td className="px-4 py-2 text-left text-espresso-600">{sar(it.qty * it.unitCost, 3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
              <div className="flex items-center justify-between border-t border-beige-line bg-beige/50 px-4 py-3">
                <span className="text-sm font-bold text-ink">التكلفة النهائية للوصفة</span>
                <span className="font-display text-base font-extrabold text-caramel-dark">{sar(total, 2)}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
