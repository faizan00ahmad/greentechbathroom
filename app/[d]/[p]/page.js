import { notFound } from 'next/navigation';
import { renderPage, pageTitle, PAGE_IDS, DESIGN_NAMES } from '../../../lib/site';
import Site from '../../../components/Site';

export function generateStaticParams() {
  const out = [];
  for (let d = 1; d <= 5; d++) PAGE_IDS.forEach((p) => out.push({ d: String(d), p }));
  return out;
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { d, p } = await params;
  if (!/^[1-5]$/.test(d) || !PAGE_IDS.includes(p)) return {};
  return { title: pageTitle(+d, p) };
}

export default async function Page({ params }) {
  const { d, p } = await params;
  if (!/^[1-5]$/.test(d) || !PAGE_IDS.includes(p)) notFound();
  const html = renderPage(+d, p);
  return <Site d={+d} p={p} html={html} name={DESIGN_NAMES[+d]} />;
}
