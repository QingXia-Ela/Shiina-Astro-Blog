import { COLLECT_POSITION_MAP } from '@/constant/Collect'
import type { ClassKeyList } from '@/declare/Collect'
import type { CollectionEntry } from 'astro:content'

interface PathType {
  params: Record<string, string | number>
  props?: Record<string, any>
}

const ClassList = Object.keys(COLLECT_POSITION_MAP)

const EntryList: Record<string, CollectionEntry<"blog">[]> = {}

ClassList.forEach((v) => {
  EntryList[v] = []
})

function Map2Path(m: Map<string, number>, classify: ClassKeyList, PageMaxCount = 15): PathType[] {
  const path: PathType[] = []

  m.forEach((n, k) => {
    const maxPage = Math.ceil(n / PageMaxCount);

    for (let i = 1; i <= maxPage; i++) {
      const p: PathType = {
        params: {
          class: classify,
          name: k
        }
      }
      if (i === 1) path.push(JSON.parse(JSON.stringify(p)))
      p.params.page = i + '';
      path.push(p)
    }
  })

  return path
}

export function CategoriesMapFactory(l: CollectionEntry<"blog">[]): Map<string, number> {
  const CategoriesMap = new Map<string, number>();
  l.forEach(({ data: { categories } }) => {
    if (categories != undefined)
      CategoriesMap.set(categories!, CategoriesMap.has(categories!) ? CategoriesMap.get(categories!)! + 1 : 1)
  })
  return CategoriesMap
}

export function TagMapFactory(l: CollectionEntry<"blog">[]): Map<string, number> {
  const TagMap = new Map<string, number>();
  l.forEach(({ data: { tags } }) => {
    tags!.forEach((v) => {
      if (tags != undefined)
        TagMap.set(v, TagMap.has(v) ? TagMap.get(v)! + 1 : 1)
    })
  })
  return TagMap
}

export default function (l: CollectionEntry<"blog">[], PageMaxCount = 15): PathType[] {
  let path: PathType[] = []
  // 集合数组循环
  l.forEach((e) => {
    // 判断是否包含有 COLLECT_POSITION_MAP 携带的 key
    ClassList.forEach((k: string) => {
      // @ts-expect-error: Limit key to COLLECT_POSITION_MAP
      if (e.data[k]) {
        // 根据 key 推入对应 list
        EntryList[k].push(e)
      }
    })
  });

  // 循环 key，处理对应列表
  for (const i in EntryList) {
    switch (i as ClassKeyList) {
      case 'tags':
        path = path.concat(Map2Path(TagMapFactory(EntryList[i]), "tags", PageMaxCount))
        break;

      case 'categories':
        path = path.concat(Map2Path(CategoriesMapFactory(EntryList[i]), "categories", PageMaxCount))
        break;

      default:
        break;
    }
  }

  return path
}

export async function getStaticPaths() {
  return [];
}