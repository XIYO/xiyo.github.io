import markdownProcessAsync from '$lib/plugin/markdown.js';
import { i18n } from '$lib/i18n.js';

export default class Post {
	static #posts = /** @type {Map<symbol, Post>} */ (new Map());
	#serialized;
	#markdownAsync;
	#absolutePath;
	get absolutePath() {
		return this.#absolutePath;
	}

	/**
	 * Post 클래스의 생성자입니다. 이 생성자는 포스트의 제목, 내용, 작성 날짜, 그리고 슬러그를 인자로 받아 Post 인스턴스를 생성합니다.
	 * @param {string} absolutePath 포스트의 슬러그
	 * @param {promise<object>} markdownAsync 마크다운 원본
	 */
	constructor({ absolutePath, markdownAsync }) {
		const key = Symbol.for(absolutePath);
		Post.#posts.set(key, this);

		this.#absolutePath = i18n.route(absolutePath);
		this.#markdownAsync = markdownAsync;
	}

	/**
	 * Post 인스턴스를 반환합니다.
	 * @param absolutePath
	 * @returns { Post }
	 */
	static getPosts(absolutePath) {
		const key = Symbol.for(absolutePath);
		return Post.#posts.get(key) ?? this.#originPost(absolutePath);
	}

	/**
	 * 원본 포스트 반환
	 * @return {Post}
	 */
	static #originPost(absolutePath) {
		const alternativePath = i18n.route(absolutePath);
		const key = Symbol.for(alternativePath);
		return Post.#posts.get(key);
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
