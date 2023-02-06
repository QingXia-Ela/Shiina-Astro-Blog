export interface SearchResultItem {
  title: string
  content: string
  hl?: string
}

export interface SearchResult {
  code?: string
  msg?: string
  end: boolean
  data: SearchResultItem[]
}