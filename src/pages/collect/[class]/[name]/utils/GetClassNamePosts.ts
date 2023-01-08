import type { ClassKeyList } from "@/declare/Collect";
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
      return TagItemFactory(l, name)

    case 'categories':
      return CategoryItemFactory(l, name)

    default:
      break;
  }
}
