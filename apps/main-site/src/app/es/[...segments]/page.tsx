import { editorialMetadata, editorialPaths, renderEditorialRoute } from "@/lib/editorial-routes";
type Props = { params: Promise<{ segments: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return editorialPaths("es").map(path => ({ segments: path.split("/").filter(Boolean).slice(1) })); }
export async function generateMetadata({ params }: Props) { return editorialMetadata(`/es/${(await params).segments.join("/")}`, "es"); }
export default async function Page({ params }: Props) { return renderEditorialRoute(`/es/${(await params).segments.join("/")}`, "es"); }
