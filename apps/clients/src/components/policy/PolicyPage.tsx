import Link from "next/link";
import type { LegalBlock, LegalDoc, LegalContactAction } from "@/types";
import { Icon } from "@/components/ui/Icon";

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="p-callout">
          <Icon name="info" />
          <p dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    default:
      return null;
  }
}

function ContactAction({ action }: { action: LegalContactAction }) {
  const cls = `p-btn p-btn--${action.variant}`;
  const inner = (
    <>
      {action.label}
      {action.icon && <Icon name={action.icon} width={17} height={17} />}
    </>
  );
  if (action.href.startsWith("/") && !action.href.startsWith("//")) {
    return (
      <Link className={cls} href={action.href}>
        {inner}
      </Link>
    );
  }
  return (
    <a className={cls} href={action.href}>
      {inner}
    </a>
  );
}

export function PolicyPage({ doc }: { doc: LegalDoc }) {
  return (
    <main>
      <section className="p-hero">
        <div className="pwrap">
          <span className="p-hero__crumb">
            <Link href="/">Home</Link>
            <Icon name="chevronRight" />
            {doc.title}
          </span>
          <h1>{doc.title}</h1>
          <div className="p-hero__meta">
            <span className="p-hero__pill">
              <Icon name="clock" /> Last updated: {doc.lastUpdated}
            </span>
            <span>{doc.heroNote}</span>
          </div>
        </div>
      </section>

      <div className="p-main">
        <div className="pwrap p-layout">
          <nav className="p-toc" aria-label="Sections">
            <div className="p-toc__label">On this page</div>
            <ol>
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="p-content">
            <p className="lead">{doc.lead}</p>

            {doc.sections.map((s) => (
              <section className="p-sec" id={s.id} key={s.id}>
                <h2>
                  <span className="num">{s.index}</span>
                  {s.title}
                </h2>
                {s.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}

            <div className="p-contact">
              <div>
                <h3>{doc.contact.heading}</h3>
                <p dangerouslySetInnerHTML={{ __html: doc.contact.bodyHtml }} />
              </div>
              <div className="p-contact__actions">
                {doc.contact.actions.map((a) => (
                  <ContactAction key={a.label} action={a} />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
