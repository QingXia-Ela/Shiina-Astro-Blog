export interface SearchResultItem {
  title: string
  content: string
}

export interface SearchResult {
  end: boolean
  result: SearchResultItem[]
}