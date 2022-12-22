import type Frontmatter from '@/declare/Frontmatter';
import type { MarkdownInstance } from 'astro'

export default function (List: MarkdownInstance<Frontmatter>[]): MarkdownInstance<Frontmatter>[] {
  return List.sort((a, b) => {
    return (
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
    );
  });
}