import markdownProcessAsync from '$lib/plugin/markdown.js';
import { deLocalizeHref, baseLocale } from '$lib/paraglide/runtime.js';

/**
 * 게시글(Post) 클래스
 */
export default class Post {
	/** @type {Map<string, Post>} */
	static #posts = new Map();
	/** @type {() => Promise<string>} */
	#markdownAsync;
	/** @type {string} */
	#absolutePath;
	/** @type {Promise<any> | null} */
	#processedMarkdownCache = null;

	/**
	 * Post 클래스의 생성자입니다.
	 * @param {{ absolutePath: string, markdownAsync: () => Promise<string> }} param0
	 */
	constructor({ absolutePath, markdownAsync }) {
		Post.#posts.set(absolutePath, this);
		this.#absolutePath = deLocalizeHref(absolutePath);
		this.#markdownAsync = markdownAsync;
	}

	/**
	 * 절대 경로로 포스트를 반환합니다.
	 * @param {string} absolutePath 절대 경로
	 * @returns {Post | undefined} Post 인스턴스 또는 undefined
	 */
	static getPosts(absolutePath) {
		return Post.#posts.get(absolutePath) ?? 
			Post.#posts.get(`/${baseLocale.toLowerCase()}${absolutePath}`) ??
			Post.#posts.get(deLocalizeHref(absolutePath));
	}

	/**
	 * 포스트의 절대 경로 반환
	 * @returns {string}
	 */
	get absolutePath() {
		return this.#absolutePath;
	}

	/**
	 * 마크다운을 처리하고 캐시합니다.
	 * @returns {Promise<any>}
	 */
	async #getProcessedMarkdown() {
		if (!this.#processedMarkdownCache) {
			const markdownContent = await this.#markdownAsync();
			this.#processedMarkdownCache = markdownProcessAsync({
				markdown: markdownContent
			});
		}
		return this.#processedMarkdownCache;
	}

	/**
	 * 포스트의 메타데이터만 반환합니다.
	 * @returns {Promise<{ absolutePath: string, data: any }>}
	 */
	async getMetadata() {
		const processed = await this.#getProcessedMarkdown();
		return {
			absolutePath: this.#absolutePath,
			data: processed.data
		};
	}

	/**
	 * 포스트의 콘텐츠(HTML)만 반환합니다.
	 * @returns {Promise<{ absolutePath: string, value: string }>}
	 */
	async getContent() {
		const processed = await this.#getProcessedMarkdown();
		return {
			absolutePath: this.#absolutePath,
			value: processed.value
		};
	}

	/**
	 * 포스트의 메타데이터와 콘텐츠를 모두 반환합니다.
	 * @returns {Promise<{ absolutePath: string, data: any, value: string }>}
	 */
	async getBoth() {
		const processed = await this.#getProcessedMarkdown();
		return {
			absolutePath: this.#absolutePath,
			data: processed.data,
			value: processed.value
		};
	}

	/**
	 * 포스트를 직렬화하여 반환합니다. (하위 호환성을 위해)
	 * @returns {Promise<{ absolutePath: string, [key: string]: any }>}
	 */
	async toSerialize() {
		return this.getBoth();
	}
}
