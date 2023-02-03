export interface SearchResultItem {
  title: string
  content: string
  hl?: string
}

export interface SearchResult {
  end: boolean
  result: SearchResultItem[]
}