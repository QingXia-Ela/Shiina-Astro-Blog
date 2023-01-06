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
"Cypress-前端E2E测试工具初体验/Cypress-前端E2E测试工具初体验.md": {
  id: "Cypress-前端E2E测试工具初体验/Cypress-前端E2E测试工具初体验.md",
  slug: "cypress-前端e2e测试工具初体验/cypress-前端e2e测试工具初体验",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"Hello-World/Hello-World.mdx": {
  id: "Hello-World/Hello-World.mdx",
  slug: "hello-world/hello-world",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"JS浅入学习笔记/JS浅入学习笔记.md": {
  id: "JS浅入学习笔记/JS浅入学习笔记.md",
  slug: "js浅入学习笔记/js浅入学习笔记",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"Pinia-Vue全局状态管理的一种新方案/Pinia-Vue全局状态管理的一种新方案.md": {
  id: "Pinia-Vue全局状态管理的一种新方案/Pinia-Vue全局状态管理的一种新方案.md",
  slug: "pinia-vue全局状态管理的一种新方案/pinia-vue全局状态管理的一种新方案",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"React制作音乐播放器日记总结-1/React制作音乐播放器日记总结-1.md": {
  id: "React制作音乐播放器日记总结-1/React制作音乐播放器日记总结-1.md",
  slug: "react制作音乐播放器日记总结-1/react制作音乐播放器日记总结-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"React制作音乐播放器日记总结-2/React制作音乐播放器日记总结-2.md": {
  id: "React制作音乐播放器日记总结-2/React制作音乐播放器日记总结-2.md",
  slug: "react制作音乐播放器日记总结-2/react制作音乐播放器日记总结-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"React制作音乐播放器日记总结-3/React制作音乐播放器日记总结-3.md": {
  id: "React制作音乐播放器日记总结-3/React制作音乐播放器日记总结-3.md",
  slug: "react制作音乐播放器日记总结-3/react制作音乐播放器日记总结-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"Typescript学习笔记/Typescript学习笔记.md": {
  id: "Typescript学习笔记/Typescript学习笔记.md",
  slug: "typescript学习笔记/typescript学习笔记",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"hexo-搭建个人博客记录/hexo-搭建个人博客记录.md": {
  id: "hexo-搭建个人博客记录/hexo-搭建个人博客记录.md",
  slug: "hexo-搭建个人博客记录/hexo-搭建个人博客记录",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"一个基于petite-vue的简易播放器/一个基于petite-vue的简易播放器.md": {
  id: "一个基于petite-vue的简易播放器/一个基于petite-vue的简易播放器.md",
  slug: "一个基于petite-vue的简易播放器/一个基于petite-vue的简易播放器",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"一个简单的React网易云音乐播放器/一个简单的React网易云音乐播放器.md": {
  id: "一个简单的React网易云音乐播放器/一个简单的React网易云音乐播放器.md",
  slug: "一个简单的react网易云音乐播放器/一个简单的react网易云音乐播放器",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"个人的前端学习路线/个人的前端学习路线.md": {
  id: "个人的前端学习路线/个人的前端学习路线.md",
  slug: "个人的前端学习路线/个人的前端学习路线",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"关于本站下一代播放器的重构计划.md": {
  id: "关于本站下一代播放器的重构计划.md",
  slug: "关于本站下一代播放器的重构计划",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"前端常用的小工具和插件总结/前端常用的小工具和插件总结.md": {
  id: "前端常用的小工具和插件总结/前端常用的小工具和插件总结.md",
  slug: "前端常用的小工具和插件总结/前端常用的小工具和插件总结",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"团队学习方向介绍/团队学习方向介绍.mdx": {
  id: "团队学习方向介绍/团队学习方向介绍.mdx",
  slug: "团队学习方向介绍/团队学习方向介绍",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"基于ThreeJs实现的网页3D粒子效果经验分享/基于ThreeJs实现的网页3D粒子效果经验分享.mdx": {
  id: "基于ThreeJs实现的网页3D粒子效果经验分享/基于ThreeJs实现的网页3D粒子效果经验分享.mdx",
  slug: "基于threejs实现的网页3d粒子效果经验分享/基于threejs实现的网页3d粒子效果经验分享",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"对于未来的路的思考/对于未来的路的思考.md": {
  id: "对于未来的路的思考/对于未来的路的思考.md",
  slug: "对于未来的路的思考/对于未来的路的思考",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"未来的一些计划/未来的一些计划.md": {
  id: "未来的一些计划/未来的一些计划.md",
  slug: "未来的一些计划/未来的一些计划",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"网络协议学习笔记/网络协议学习笔记.md": {
  id: "网络协议学习笔记/网络协议学习笔记.md",
  slug: "网络协议学习笔记/网络协议学习笔记",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"莱茵生命风格主页/莱茵生命风格主页.md": {
  id: "莱茵生命风格主页/莱茵生命风格主页.md",
  slug: "莱茵生命风格主页/莱茵生命风格主页",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"记一次Gitblit+Jenkins实现前端自动化部署上线经历/记一次Gitblit+Jenkins实现前端自动化部署上线经历.md": {
  id: "记一次Gitblit+Jenkins实现前端自动化部署上线经历/记一次Gitblit+Jenkins实现前端自动化部署上线经历.md",
  slug: "记一次gitblitjenkins实现前端自动化部署上线经历/记一次gitblitjenkins实现前端自动化部署上线经历",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"记一次vue3项目转nuxtjs项目实践/记一次vue3项目转nuxtjs项目实践.md": {
  id: "记一次vue3项目转nuxtjs项目实践/记一次vue3项目转nuxtjs项目实践.md",
  slug: "记一次vue3项目转nuxtjs项目实践/记一次vue3项目转nuxtjs项目实践",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"记一次前端Canvas粒子效果实战-1/记一次前端Canvas粒子效果实战-1.mdx": {
  id: "记一次前端Canvas粒子效果实战-1/记一次前端Canvas粒子效果实战-1.mdx",
  slug: "记一次前端canvas粒子效果实战-1/记一次前端canvas粒子效果实战-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"记一次前端Canvas粒子效果实战-2/记一次前端Canvas粒子效果实战-2.md": {
  id: "记一次前端Canvas粒子效果实战-2/记一次前端Canvas粒子效果实战-2.md",
  slug: "记一次前端canvas粒子效果实战-2/记一次前端canvas粒子效果实战-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"记一次前端Canvas粒子效果实战-3/记一次前端Canvas粒子效果实战-3.md": {
  id: "记一次前端Canvas粒子效果实战-3/记一次前端Canvas粒子效果实战-3.md",
  slug: "记一次前端canvas粒子效果实战-3/记一次前端canvas粒子效果实战-3",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},
"friends": {
"friends.md": {
  id: "friends.md",
  slug: "friends",
  body: string,
  collection: "friends",
  data: any
},
},

	};

	type ContentConfig = typeof import("./config");
}
