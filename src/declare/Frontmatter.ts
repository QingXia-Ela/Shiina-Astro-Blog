export default interface Frontmatter {
  title: string
  date: string | Date
  updated?: string | Date
  tags?: string[]
  categories?: string
  description?: string
}