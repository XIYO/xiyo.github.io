export default class Post {
	static #posts = new Map();
	#resolvedSerialize;

	static get posts() {
		return Array.from(this.#posts.values());
	}

	/**
	 * Post 클래스의 생성자입니다. 이 생성자는 포스트의 제목, 내용, 작성 날짜, 그리고 슬러그를 인자로 받아 Post 인스턴스를 생성합니다.
	 * @param {string} absolutePath 포스트의 슬러그
	 * @param {promise<object>} markdown 마크다운 원본
	 */
	constructor({ absolutePath, markdown }) {
		Post.#posts.set(absolutePath, this);

		this.absolutePath = absolutePath;
		this.name = absolutePath.split('/').at(-1);

		this.markdown = markdown;

		Object.freeze(this);
	}

	/**
	 * 포스트의 카테고리를 반환
	 * @param absolutePath
	 * @returns {Post | undefined}
	 */
	static getPosts(absolutePath) {
		return Post.#posts.get(absolutePath);
	}

	async toSerialize() {
		if (this.#resolvedSerialize) {
			return this.#resolvedSerialize;
		}

		const simpleSerializePromise = this.toSimpleSerialize();
		const markdownPromise = this.markdown();

		const [simpleSerialize, markdown] = await Promise.all([
			simpleSerializePromise,
			markdownPromise
		]);

		this.#resolvedSerialize = {
			...simpleSerialize,
			...markdown
		};

		return this.#resolvedSerialize;
	}

	async toSimpleSerialize() {
		return {
			absolutePath: this.absolutePath,
			name: this.name
		};
	}
}
