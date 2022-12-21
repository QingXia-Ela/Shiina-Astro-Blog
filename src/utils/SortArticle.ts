import type { MarkdownInstance } from 'astro'

export default function (List: MarkdownInstance<Record<string, any>>[]): MarkdownInstance<Record<string, any>>[] {
  return List.sort((a, b) => {
    return (
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
    );
  });
}