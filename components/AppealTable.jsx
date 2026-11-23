import { appeal, appealTotals, fmt } from '@/lib/site';

export default function AppealTable() {
  const t = appealTotals();
  return (
    <div className="rounded-xl border border-slate-200 bg-white card-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-center min-w-[560px]">
          <thead className="bg-navy text-white">
            <tr>
              <th className="py-3 px-3 text-left font-semibold">Item</th>
              <th className="py-3 px-3 font-semibold">Qty</th>
              <th className="py-3 px-3 font-semibold">Unit (PKR)</th>
              <th className="py-3 px-3 font-semibold">Total (PKR)</th>
              <th className="py-3 px-3 font-semibold">Unit (USD)</th>
              <th className="py-3 px-3 font-semibold">Total (USD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appeal.items.map((r) => (
              <tr key={r.item} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3 text-left font-semibold text-navy">{r.item}</td>
                <td className="py-3 px-3 text-slate-700">{r.qty}</td>
                <td className="py-3 px-3 text-slate-700">{fmt(r.unitPkr)}</td>
                <td className="py-3 px-3 font-medium text-navy">{fmt(r.totalPkr)}</td>
                <td className="py-3 px-3 text-slate-700">${r.unitUsd.toFixed(2)}</td>
                <td className="py-3 px-3 font-medium text-leaf">${r.totalUsd.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-silver bg-bgsilver font-bold text-navy text-xs sm:text-sm">
              <td className="py-3 px-3 text-left" colSpan={3}>
                Total Estimated Budget
              </td>
              <td className="py-3 px-3 font-extrabold">{fmt(t.pkr)}</td>
              <td className="py-3 px-3"></td>
              <td className="py-3 px-3 font-extrabold text-leaf">${t.usd.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="sm:hidden text-[11px] text-slate-500 text-center py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-1.5">
        <i className="fa-solid fa-arrows-left-right text-[10px] text-slate-400"></i>
        <span>Scroll sideways to view all table columns</span>
      </div>
    </div>
  );
}
