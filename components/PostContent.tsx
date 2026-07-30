"use client";

import { useEffect, useRef } from "react";

function stripEmptyParagraphs(html: string): string {
  return html
    .replace(/<div id="more-\d+"><\/div>(?:\s*<br\s*\/?>)?/gi, "")
    .replace(/<p(?:\s[^>]*)?>(?:\s|&nbsp;|&#160;|<br\s*\/?>)*<\/p>/gi, "");
}

function looksLikeHtml(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "<a href=\"$2\" target=\"_blank\" rel=\"noopener noreferrer\">$1</a>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function isTableLine(line: string): boolean {
  return /^\|.+\|$/.test(line.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\|[\s:|\-]+\|$/.test(line.trim());
}

function tableCells(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function renderTable(rows: string[]): string {
  const usable = rows.filter((row) => isTableLine(row));
  if (usable.length < 2 || !isTableSeparator(usable[1])) {
    return usable.map((row) => `<p>${inlineMarkdown(row)}</p>`).join("\n");
  }

  const headers = tableCells(usable[0]);
  const bodyRows = usable.slice(2).map(tableCells).filter((cells) => cells.some(Boolean));
  const thead = `<thead><tr>${headers.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${bodyRows.map((cells) => `<tr>${headers.map((_, index) => `<td>${inlineMarkdown(cells[index] || "")}</td>`).join("")}</tr>`).join("")}</tbody>`;
  return `<div class="post-table-wrap"><table>${thead}${tbody}</table></div>`;
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let list: string[] = [];
  let table: string[] = [];
  let ordered = false;

  const flushList = () => {
    if (!list.length) return;
    const tag = ordered ? "ol" : "ul";
    out.push(`<${tag}>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</${tag}>`);
    list = [];
  };

  const flushTable = () => {
    if (!table.length) return;
    out.push(renderTable(table));
    table = [];
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      if (table.length) continue;
      flushList();
      continue;
    }

    if (isTableLine(line)) {
      flushList();
      table.push(line);
      continue;
    }

    flushTable();

    if (/^---+$/.test(line)) { flushList(); out.push("<hr />"); continue; }
    const h = line.match(/^(#{2,4})\s+(.+)$/);
    if (h) { flushList(); out.push(`<h${h[1].length}>${inlineMarkdown(h[2])}</h${h[1].length}>`); continue; }
    const b = line.match(/^[-*]\s+(.+)$/);
    if (b) { if (list.length && ordered) flushList(); ordered = false; list.push(b[1]); continue; }
    const n = line.match(/^\d+[.)]\s+(.+)$/);
    if (n) { if (list.length && !ordered) flushList(); ordered = true; list.push(n[1]); continue; }
    flushList();
    out.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  flushTable();
  flushList();
  return out.join("\n");
}

function normalizeContent(content: string): string {
  const trimmed = String(content || "").trim();
  const rendered = looksLikeHtml(trimmed) ? trimmed : markdownToHtml(trimmed);
  return stripEmptyParagraphs(rendered.replace(/<script\b[^>]*type=["\x27]application\/ld\+json["\x27][^>]*>[\s\S]*?<\/script>/gi, ""));
}

export default function PostContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const cleanedHtml = normalizeContent(html);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLElement>(".gs-accordion-item").forEach((item) => {
      item.classList.add("gsclose");
      const title = item.querySelector<HTMLElement>(".gs-accordion-item__title");
      if (!title) return;
      title.setAttribute("role", "button");
      title.setAttribute("tabindex", "0");
      title.setAttribute("aria-expanded", "false");
      const onActivate = (e: Event) => {
        if (e instanceof KeyboardEvent && e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        item.classList.toggle("gsclose");
        title.setAttribute("aria-expanded", String(!item.classList.contains("gsclose")));
      };
      title.addEventListener("click", onActivate);
      title.addEventListener("keydown", onActivate);
      cleanups.push(() => {
        title.removeEventListener("click", onActivate);
        title.removeEventListener("keydown", onActivate);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [html]);

  return <div ref={ref} className="post-content" data-testid="post-content" dangerouslySetInnerHTML={{ __html: cleanedHtml }} />;
}
