import type { ClassKeyList } from "@/declare/Collect";
import { SortCollectArticles } from "@/utils/SortArticle";
import type { CollectionEntry } from "astro:content";

function CategoryItemFactory(l: CollectionEntry<"blog">[], name: string) {
  return l.filter((e) => e.data.categories === name)
}

function TagItemFactory(l: CollectionEntry<"blog">[], name: string) {
  return l.filter((e) => e.data.tags && e.data.tags.indexOf(name) != -1)
}

export default function (l: CollectionEntry<"blog">[], classify: ClassKeyList, name: string) {
  switch (classify as ClassKeyList) {
    case 'tags':
      return SortCollectArticles(TagItemFactory(l, name))

    case 'categories':
      return SortCollectArticles(CategoryItemFactory(l, name))

    default:
      break;
  }
}

export async function getStaticPaths() {
  return [];
}