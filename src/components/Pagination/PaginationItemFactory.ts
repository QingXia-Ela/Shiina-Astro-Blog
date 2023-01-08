import type { PaginationItem } from '@/declare/Pagination';

function getItem(content: string, index: number) {
  return {
    content,
    index
  }
}

export default function (currentPage: number, maxPage: number) {
  const PaginationData: PaginationItem[] = []
  // 页数小于八
  if (maxPage < 8) {
    for (let i = 1; i <= maxPage; i++) {
      PaginationData.push(
        getItem(i + '', i)
      );
    }
  }
  // 倒数第三页
  else if (maxPage - currentPage <= 2) {
    PaginationData.push(getItem('1', 1))
    PaginationData.push(getItem('...', Math.ceil((maxPage / 2 + 1) / 2)))
    for (let i = maxPage - 3; i <= maxPage; i++) PaginationData.push(getItem(i + '', i))
  }
  // 正数第三页
  else if (currentPage <= 3) {
    for (let i = 1; i <= 4; i++) {
      PaginationData.push(getItem(i + '', i))
    }
    PaginationData.push(getItem('...', Math.ceil((maxPage * 1.5 + 1) / 2)))
    PaginationData.push(getItem(maxPage + '', maxPage))
  }
  // 位于中间范围内
  else {
    const mid = currentPage
    PaginationData.push(getItem('1', 1))
    PaginationData.push(getItem('...', Math.ceil((mid + 1) / 2)))
    for (let i = mid - 1; i <= mid + 1; i++) PaginationData.push(getItem(i + '', i))
    PaginationData.push(getItem('...', Math.ceil((mid + maxPage) / 2)))
    PaginationData.push(getItem(maxPage + '', maxPage))
  }

  return PaginationData
}