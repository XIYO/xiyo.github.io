import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit, EXIT } from 'unist-util-visit';
import Category from '$lib/post/Category.js';
import remarkMermaid from 'remark-mermaidjs';
import rehypeShiki from '@shikijs/rehype';
import remarkFrontmatter from 'remark-frontmatter'
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import callouts from "remark-callouts";
import { removeStaticPath } from '$lib/unifiedPlugin/removeStaticPath.js';

export default class Post {
	static #posts = new Map();
	/** @type {string} */
	#absolutePath;
	/** @type {string} */
	#name;
	/** @type {string} HTML 로 변환된 마크다운 */
	#convertedMarkdown;
	#promise;
	/** @type {string} 타이틀 */
	#title;

	/**
	 * Post 클래스의 생성자입니다. 이 생성자는 포스트의 제목, 내용, 작성 날짜, 그리고 슬러그를 인자로 받아 Post 인스턴스를 생성합니다.
	 * @param {string} absolutePath 포스트의 슬러그
	 * @param {string} markdown 마크다운 원본
	 */
	constructor({ absolutePath, markdown }) {
		Post.#posts.set(absolutePath, this);

		this.#absolutePath = absolutePath;
		this.#name = absolutePath.split('/').at(-1);

		// 마크다운을 HTML로 변환합니다. title 은 여기서 추출합니다.
		this.#promise = unified()
			.use(remarkParse)
			.use(remarkFrontmatter)
			.use(remarkParseFrontmatter)
			.use(this.extractTitle.bind(this))
			.use(remarkGfm)
			.use(callouts)
			.use(remarkMermaid, {
				mermaidConfig: {
					theme: 'dark'
				}
			})
			.use(remarkRehype)
			.use(rehypeShiki, {
				theme: 'vitesse-dark'
			})
			.use(removeStaticPath)
			.use(rehypeStringify)
			.process(markdown);
	}

	get absolutePath() {
		return this.#absolutePath;
	}

	/**
	 * 포스트가 가지는 실제 파일 명
	 * @returns {string}
	 */
	get name() {
		return this.#name;
	}

	/**
	 * 웹에 노출될 제목
	 * @returns {string}
	 */
	get title() {
		return this.#title;
	}

	/**
	 * HTML 로 변환된 마크다운
	 * @returns {string}
	 */
	get convertedMarkdown() {
		return this.#convertedMarkdown;
	}

	/**
	 * 포스트의 부모 카테고리 목록을 반환
	 * @returns {Category[]}
	 */
	get parentCategories() {
		const paths = this.#absolutePath.split('/');
		paths.pop();
		const parentAbsolutePath = paths.join('/');
		return Category.getCategory(parentAbsolutePath).parentCategories;
	}

	/**
	 * 포스트의 카테고리를 반환
	 * @param absolutePath
	 * @returns {Post | undefined}
	 */
	static getPosts(absolutePath) {
		return Post.#posts.get(absolutePath);
	}

	#firstCommitDate;
	#lastCommitDate;
	async isReady() {
		const vfile = await this.#promise;
		this.#convertedMarkdown = vfile.value;

		this.#firstCommitDate = new Date(vfile.data.frontmatter.firstCommitDate);
		this.#lastCommitDate = new Date(vfile.data.frontmatter.lastCommitDate);
	}

	extractTitle() {
		return (tree) => {
			let found = false;

			visit(tree, 'heading', (node, index, parent) => {
				if (!found && node.depth === 1) {
					this.#title = node.children[0]?.value;
					found = true;
					if (parent) {
						parent.children.splice(index, 1); // 노드 제거
						return EXIT; // 순회 중단
					}
				}
			});
		};
	}


	toSerialize() {
		const simpleSerialize = this.toSimpleSerialize();
		simpleSerialize.convertedMarkdown = this.#convertedMarkdown;

		return simpleSerialize;
	}

	toSimpleSerialize() {
		return {
			absolutePath: this.#absolutePath, name: this.#name, title: this.#title,
			firstCommitDate: this.#firstCommitDate, lastCommitDate: this.#lastCommitDate
		};
	}

}
