import markdownProcessAsync from '$lib/plugin/markdown.js';
import { deLocalizeHref } from '$lib/paraglide/runtime.js';

/**
 * 게시글(Post) 클래스
 */
export default class Post {
	/** @type {Map<string, Post>} */
	static #posts = new Map();
	/** @type {() => Promise<any>} */
	#markdownAsync;
	/** @type {string} */
	#absolutePath;

	/**
	 * Post 클래스의 생성자입니다.
	 * @param {{ absolutePath: string, markdownAsync: () => Promise<any> }} param0
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
	 * 포스트를 직렬화하여 반환합니다.
	 * @returns {Promise<{ absolutePath: string, [key: string]: any }>}
	 */
	async toSerialize() {
		const markdownPromise = this.#markdownAsync();
		const markdownVFile = await markdownPromise;
		const htmlFilePromise = markdownProcessAsync({
			markdown: markdownVFile.default
		});

		return {
			absolutePath: this.#absolutePath,
			...(await htmlFilePromise)
		};
	}
}
