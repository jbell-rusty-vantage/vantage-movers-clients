import { editorialMetadata, editorialPaths, renderEditorialRoute } from "@/lib/editorial-routes";
type Props = { params: Promise<{ segments: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return editorialPaths("en").map(path => ({ segments: path.split("/").filter(Boolean) })); }
export async function generateMetadata({ params }: Props) { return editorialMetadata(`/${(await params).segments.join("/")}`, "en"); }
export default async function Page({ params }: Props) { return renderEditorialRoute(`/${(await params).segments.join("/")}`, "en"); }
