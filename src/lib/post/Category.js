import { execSync } from 'child_process';
import Post from '$lib/post/Post.js';

const symbol = Symbol('Category initialization');

export default class Category {
	static #categories = new Map();
	static rootCategory = new Category(); // 순서 중요. 모든 static 필드가 초기화 된 후 초기화 되어야 함
	/** @type {string} */
	#absolutePath;
	/** @type {Map<string, Category>} */
	#childCategories = new Map();
	/** @type {Map<string, Post>} */
	#posts = new Map();

	/**
	 * 카테고리 생성자
	 * @param {string} [absolutePath] 접근 가능한 절대 경로
	 */
	constructor(absolutePath = '') {
		Category.#categories.set(absolutePath, this);
		this.#absolutePath = absolutePath;
	}

	get name() {
		const name = this.#absolutePath.split('/').at(-1);
		return name || 'root';
	}

	get absolutePath() {
		return this.#absolutePath || '/';
	}

	get parentCategories() {
		let parents = [];

		let paths = this.#absolutePath.split('/');

		for (let i = 0; i < paths.length; i++) {
			let parentAbsolutePath = paths.slice(0, i + 1).join('/');
			parents.push(Category.getCategory(parentAbsolutePath));
		}

		return parents.slice(0, -1); // 루트와 자신 제외
	}

	/**
	 * 자식 카테고리 목록 반환
	 * @returns {Category[]}
	 */
	get childCategories() {
		return Array.from(this.#childCategories.values());
	}

	/**
	 * 자신의 포스트 목록 반환
	 * @returns {Post[]}
	 */
	get posts() {
		return Array.from(this.#posts.values());
	}

	/**
	 * 자신과 하위 카테고리의 포스트 반환
	 * @returns {Post[]} 포스트 목록
	 */
	get allPosts() {
		let posts = Array.from(this.#posts.values());

		for (let childCategory of this.#childCategories.values()) {
			posts = posts.concat(childCategory.allPosts);
		}

		// TODO 카테고리에서 post를 호출 할때 정렬 기능 추가
		// 내부에서 맵으로 저장하기 떄문에 꺼낼때만 정렬 가능

		return posts;
	}

	static hasCategory(absolutePath) {
		return this.#categories.has(absolutePath);
	}

	static getCategory(absolutePath) {
		return this.#categories.get(absolutePath);
	}

	static [symbol]() {
		const markdowns = import.meta.glob('/static/**/*.md', {
			eager: true,
			import: 'default'
		});

		Object.entries(markdowns).forEach(([path, markdown]) => {
			let absolutePath = path
				.replace(/^\/static/, '') // 스태틱 경로 제거
				.replace(/\.md$/, ''); // 확장자 제거
			this.#initCategories({ absolutePath, markdown });
		});
	}

	static #initCategories(
		{ absolutePath, markdown },
		{ category = this.rootCategory, index = 0 } = {}
	) {
		const absolutePaths = absolutePath.split('/');
		const categoryAbsolutePath = absolutePath
			.split('/')
			.slice(0, index + 1)
			.join('/');
		if (absolutePaths.length > index + 1) {
			if (!this.hasCategory(categoryAbsolutePath))
				category.addChildCategory(new Category(categoryAbsolutePath));
			const childCategory = this.getCategory(categoryAbsolutePath);
			this.#initCategories(
				{ absolutePath, markdown },
				{ category: childCategory, index: index + 1 }
			);
		} else {
			const post = new Post({ absolutePath, markdown });
			category.addPost(post);
		}
	}

	hasChildCategories() {
		return this.#childCategories.size > 0;
	}

	/**
	 * 카테고리 추가
	 * @param {Category} category
	 */
	addChildCategory(category) {
		this.#childCategories.set(category.#absolutePath, category);
	}

	/**
	 * 포스트 추가
	 * @param {Post} post 추가할 포스트
	 */
	addPost(post) {
		this.#posts.set(post.absolutePath, post);
	}

	toSerialize() {
		return {
			name: this.name,
			absolutePath: this.#absolutePath,
			childCategories: this.childCategories.map((category) => category.toSerialize()),
			posts: this.allPosts.map((post) => post.toSimpleSerialize())
		};
	}
}

Category[symbol]();
