declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		typeof entryMap[C][keyof typeof entryMap[C]] & Render;

	type BaseCollectionConfig<S extends import('astro/zod').ZodRawShape> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<import('astro/zod').ZodObject<S>>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends import('astro/zod').ZodRawShape>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	export function getEntry<C extends keyof typeof entryMap, E extends keyof typeof entryMap[C]>(
		collection: C,
		entryKey: E
	): Promise<typeof entryMap[C][E] & Render>;
	export function getCollection<
		C extends keyof typeof entryMap,
		E extends keyof typeof entryMap[C]
	>(
		collection: C,
		filter?: (data: typeof entryMap[C][E]) => boolean
	): Promise<(typeof entryMap[C][E] & Render)[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		import('astro/zod').ZodObject<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			injectedFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"about": {
"about.mdx": {
  id: "about.mdx",
  slug: "about",
  body: string,
  collection: "about",
  data: any
},
},
"blog": {
"基于ThreeJs实现的网页3D粒子效果经验分享/基于ThreeJs实现的网页3D粒子效果经验分享.md": {
  id: "基于ThreeJs实现的网页3D粒子效果经验分享/基于ThreeJs实现的网页3D粒子效果经验分享.md",
  slug: "基于ThreeJs实现的网页3D粒子效果经验分享/基于ThreeJs实现的网页3D粒子效果经验分享",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},

	};

	type ContentConfig = typeof import("./config");
}
