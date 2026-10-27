import { createContext, useContext, useState as useReactState, type CSSProperties, type ReactNode } from "react";

export { useEffect, useMemo, useRef, useState } from "react";

const InsideText = createContext(false);

type Align = "start" | "center" | "end" | "stretch";
const alignMap: Record<Align, CSSProperties["alignItems"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};
const justifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  "space-between": "space-between",
} as const;

export function Stack({ children, gap = 8, style }: { children?: ReactNode; gap?: number; style?: CSSProperties }) {
  return (
    <div className="cv-stack" style={{ gap, ...style }}>
      {children}
    </div>
  );
}

export function Row({
  children,
  gap = 8,
  align = "center",
  justify = "start",
  wrap = false,
  style,
}: {
  children?: ReactNode;
  gap?: number;
  align?: Align;
  justify?: keyof typeof justifyMap;
  wrap?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className="cv-row"
      style={{
        gap,
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Text({
  children,
  tone = "primary",
  size = "body",
  as,
  weight = "normal",
  italic = false,
  style,
}: {
  children?: ReactNode;
  tone?: "primary" | "secondary" | "tertiary" | "quaternary";
  size?: "body" | "small";
  as?: "p" | "span";
  weight?: "normal" | "medium" | "semibold" | "bold";
  italic?: boolean;
  style?: CSSProperties;
}) {
  const nested = useContext(InsideText);
  const Tag = as ?? (nested ? "span" : "p");
  const className = `cv-text cv-${size} cv-tone-${tone} cv-w-${weight}${italic ? " cv-italic" : ""}`;
  return (
    <InsideText.Provider value={true}>
      <Tag className={className} style={style}>
        {children}
      </Tag>
    </InsideText.Provider>
  );
}

export function H1({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return (
    <h1 className="cv-h1" style={style}>
      {children}
    </h1>
  );
}

export function H2({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return (
    <h2 className="cv-h2" style={style}>
      {children}
    </h2>
  );
}

export function Link({ children, href, style }: { children?: ReactNode; href: string; style?: CSSProperties }) {
  return (
    <a className="cv-link" href={href} target="_blank" rel="noopener noreferrer" style={style}>
      {children}
    </a>
  );
}

export function Pill({
  children,
  active = false,
  disabled,
  title,
  style,
  onClick,
}: {
  children?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`cv-pill${active ? " is-active" : ""}`}
      aria-pressed={active}
      disabled={disabled}
      title={title}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Table({
  headers = [],
  rows = [],
  columnAlign,
  framed = true,
  striped = false,
  style,
}: {
  headers?: ReactNode[];
  rows?: ReactNode[][];
  columnAlign?: Array<"left" | "center" | "right" | undefined>;
  framed?: boolean;
  striped?: boolean;
  style?: CSSProperties;
}) {
  const columnCount = headers.length > 0 ? headers.length : Math.max(0, ...rows.map((r) => r.length));
  const alignOf = (i: number) => columnAlign?.[i] ?? "left";
  return (
    <div className={`cv-table-wrap${framed ? " is-framed" : ""}`} style={style}>
      <table className={`cv-table${striped ? " is-striped" : ""}`}>
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={{ textAlign: alignOf(i) }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {Array.from({ length: columnCount }, (_, ci) => (
                <td key={ci} style={{ textAlign: alignOf(ci) }}>
                  {row[ci] ?? null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type CalloutTone = "info" | "success" | "warning" | "danger" | "neutral";

function CalloutIcon({ tone }: { tone: CalloutTone }) {
  if (tone === "warning" || tone === "danger") {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 2.2 14.2 13H1.8L8 2.2Z" strokeLinejoin="round" />
        <path d="M8 6.5v3" strokeLinecap="round" />
        <circle cx="8" cy="11.3" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (tone === "success") {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="8" cy="8" r="6.2" />
        <path d="m5.3 8.2 1.8 1.8 3.6-3.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 7.2v4" strokeLinecap="round" />
      <circle cx="8" cy="4.9" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Callout({
  children,
  tone = "info",
  title,
  icon,
  style,
}: {
  children?: ReactNode;
  tone?: CalloutTone;
  title?: ReactNode;
  icon?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={`cv-callout cv-callout-${tone}`} style={style}>
      <span className="cv-callout-icon" aria-hidden="true">
        {icon ?? <CalloutIcon tone={tone} />}
      </span>
      <div className="cv-callout-body">
        {title != null && <div className="cv-callout-title">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function CollapsibleSection({
  title,
  leading,
  count,
  trailing,
  children,
  defaultOpen = false,
  style,
}: {
  title: string;
  leading?: ReactNode;
  count?: number;
  trailing?: ReactNode;
  children?: ReactNode;
  defaultOpen?: boolean;
  style?: CSSProperties;
}) {
  const [open, setOpen] = useReactState(defaultOpen);
  return (
    <div className="cv-collapsible" style={style}>
      <button type="button" className="cv-collapsible-header" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <svg className={`cv-chevron${open ? " is-open" : ""}`} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
          <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {leading}
        <span className="cv-collapsible-title">{title}</span>
        {count != null && <span className="cv-collapsible-count">{count}</span>}
        {trailing != null && <span className="cv-collapsible-trailing">{trailing}</span>}
      </button>
      {open && <div className="cv-collapsible-body">{children}</div>}
    </div>
  );
}
