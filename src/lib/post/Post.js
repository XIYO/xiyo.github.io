import markdownProcessAsync from '$lib/plugin/markdown.js';
import { deLocalizeHref } from '$lib/paraglide/runtime.js';

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
	/** @type {any} */
	#metadata = null;

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
		return Post.#posts.get(absolutePath) ?? Post.#posts.get(deLocalizeHref(absolutePath));
	}

	/**
	 * 포스트의 절대 경로 반환
	 * @returns {string}
	 */
	get absolutePath() {
		return this.#absolutePath;
	}

	/**
	 * 포스트의 정렬 날짜 반환 (동기)
	 * @returns {Date}
	 */
	get sortDate() {
		// 메타데이터가 아직 로드되지 않았으면 기본값
		if (!this.#metadata) {
			return new Date(0);
		}
		
		// published 필드가 있으면 우선 사용
		if (this.#metadata.data?.published) {
			return new Date(this.#metadata.data.published);
		}
		// dates 배열의 첫 번째 값을 published로 사용
		if (this.#metadata.data?.dates?.length > 0) {
			return new Date(this.#metadata.data.dates[0]);
		}
		// 날짜가 없으면 기본값
		return new Date(0);
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
		this.#metadata = {
			absolutePath: this.#absolutePath,
			data: processed.data
		};
		return this.#metadata;
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
