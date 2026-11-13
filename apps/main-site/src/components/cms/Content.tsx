"use client";

import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { createContext, createElement, useContext, type ComponentProps, type ReactNode } from "react";
import { resolveContent, resolveContactHref, resolveLegalMarkup, type ContentLocale, type ContentValues, type ContentField } from "@/lib/cms/resolve";

const ContentContext = createContext<{ values: ContentValues; locale: ContentLocale; dataScope?: string; fields: ContentField[] }>({ values: {}, locale: "en", fields: [] });

export function ContentProvider({ values, locale, fields = [], children }: { values: ContentValues; locale: ContentLocale; fields?: ContentField[]; children?: ReactNode }) {
  return <ContentContext.Provider value={{ values, locale, fields }}>{children}</ContentContext.Provider>;
}

export function ContentScope({ source, children }: { source: string; children?: ReactNode }) {
  const content = useContext(ContentContext);
  return <ContentContext.Provider value={{ ...content, dataScope: source }}>{children}</ContentContext.Provider>;
}

export function CmsText({ scope, children }: { scope: string; children?: ReactNode }) {
  const { values, locale, dataScope, fields } = useContext(ContentContext);
  function resolve(child: ReactNode): ReactNode {
    if (typeof child === "string") return resolveContent(child, values, `${scope}|${dataScope ?? ""}`, locale, "text", fields);
    if (Array.isArray(child)) return child.map(resolve);
    return child;
  }
  return <>{resolve(children)}</>;
}

/** Preserve native element semantics; only audited display attributes are editable. */
export function CmsElement({ element, scope, children, ...props }: { element: string; scope: string; children?: ReactNode; [key: string]: unknown }) {
  const { values, locale, dataScope, fields } = useContext(ContentContext);
  scope = `${scope}|${dataScope ?? ""}`;
  const resolved = { ...props };
  if (typeof resolved.href === "string") resolved.href = resolveContactHref(resolved.href, values, fields);
  for (const name of ["alt", "title", "placeholder", "aria-label", "aria-description", "aria-roledescription"]) {
    if (typeof resolved[name] === "string") resolved[name] = resolveContent(resolved[name], values, scope, locale, "text", fields);
  }
  for (const name of ["src", "srcSet"]) {
    if (typeof resolved[name] === "string") resolved[name] = resolveContent(resolved[name], values, scope, locale, "image", fields);
  }
  const markup = props.dangerouslySetInnerHTML as { __html?: string } | undefined;
  if (typeof markup?.__html === "string") resolved.dangerouslySetInnerHTML = { __html: resolveLegalMarkup(markup.__html, values, scope, locale, fields) };
  const content = element === "option" && typeof children === "string" ? resolveContent(children, values, scope, locale, "text", fields) : children;
  return createElement(element, resolved, content);
}

export function CmsImage({ scope, ...props }: ImageProps & { scope?: string }) {
  const { values, locale, dataScope, fields } = useContext(ContentContext);
  scope = `${scope ?? "lib/images.ts"}|${dataScope ?? ""}`;
  const source = typeof props.src === "string" ? resolveContent(props.src, values, scope ?? "lib/images.ts", locale, "image", fields) : props.src;
  return <Image {...props} src={source} alt={resolveContent(props.alt, values, scope ?? "lib/images.ts", locale, "text", fields)} unoptimized={props.unoptimized || typeof source === "string" && source.startsWith("/api/site-content/media/")} />;
}

export function CmsLink({ scope = "", ...props }: ComponentProps<typeof Link> & { scope?: string }) {
  const { values, locale, dataScope, fields } = useContext(ContentContext);
  const source = `${scope}|${dataScope ?? ""}`;
  return <Link {...props} href={typeof props.href === "string" ? resolveContactHref(props.href, values, fields) : props.href}
    aria-label={typeof props["aria-label"] === "string" ? resolveContent(props["aria-label"], values, source, locale, "text", fields) : props["aria-label"]}
    title={typeof props.title === "string" ? resolveContent(props.title, values, source, locale, "text", fields) : props.title} />;
}
