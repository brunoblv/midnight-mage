export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "image"; label: string }
  | { type: "quote"; text: string };

export function parseBlocks(raw: string): ContentBlock[] {
  try {
    const parsed = JSON.parse(raw) as ContentBlock[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [{ type: "p", text: raw }];
  }
}

export function parseStringList(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
