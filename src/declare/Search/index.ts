export interface SearchResultItem {
  title: string
  content: string
  html?: boolean
}

export interface SearchResult {
  end: boolean
  result: SearchResultItem[]
}