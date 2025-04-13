import markdownProcessAsync from '$lib/plugin/markdown.js';
import { deLocalizeHref } from '$lib/paraglide/runtime.js';

export default class Post {
	static #posts = /** @type {Map<string, Post>} */ (new Map());
	/** @type {Promise<unknown>} */ #markdownAsync;
	/** @type {string} */ #absolutePath;
	#serialized;

	/**
	 * Post 클래스의 생성자입니다. 이 생성자는 포스트의 제목, 내용, 작성 날짜, 그리고 슬러그를 인자로 받아 Post 인스턴스를 생성합니다.
	 * @param {{ absolutePath: string, markdownAsync: Promise<unknown> }} param0
	 */
	constructor({ absolutePath, markdownAsync }) {
		Post.#posts.set(absolutePath, this);
		this.#absolutePath = deLocalizeHref(absolutePath);
		this.#markdownAsync = markdownAsync;
	}

	/** 대체 언어가 없는 경우, 원본을 반환 합니다 */
	static getPosts(absolutePath) {
		return Post.#posts.get(absolutePath) ?? Post.#posts.get(deLocalizeHref(absolutePath));
	}

	get absolutePath() {
		return this.#absolutePath;
	}

	async toSerialize() {
		if (this.#serialized) {
			return this.#serialized;
		}

		const markdownPromise = this.#markdownAsync();
		const markdownVFile = await markdownPromise;
		const htmlFilePromise = markdownProcessAsync({
			markdown: markdownVFile.default
		});

		return (this.#serialized = {
			absolutePath: this.#absolutePath,
			gitLog: markdownVFile.gitLog,
			...(await htmlFilePromise)
		});
	}
}
