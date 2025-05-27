import Post from '$lib/post/Post.js';
import { deLocalizeHref } from '$lib/paraglide/runtime.js';

/**
 * 카테고리(Category) 클래스
 */
export default class Category {
	/** @type {Map<string, Category>} */
	static #categories = new Map();
	static #root;
	/** @type {string} */
	#absolutePath;
	/** @type {Map<string, Category>} */
	#childCategories = new Map();
	/** @type {Map<string, import('./Post.js').default>} */
	#posts = new Map();

	static {
		this.#root = new Category('');

		const markdowns = import.meta.glob('/static/**/*.md');

		Object.entries(markdowns).forEach(([path, markdownAsync]) => {
			let absolutePath = path
				.replace(/^\/static/, '') // 스태틱 경로 제거
				.replace(/\.md$/, ''); // 확장자 제거

			this.#initCategories({ absolutePath, markdownAsync });
		});
	}

	/**
	 * 카테고리 생성자
	 * @param {string} absolutePath 접근 가능한 절대 경로
	 */
	constructor(absolutePath) {
		Category.#categories.set(absolutePath, this);
		this.#absolutePath = deLocalizeHref(absolutePath);
	}

	/**
	 * 카테고리명 반환
	 * @returns {string}
	 */
	get name() {
		return this.#absolutePath.split('/').at(-1);
	}

	/**
	 * 카테고리 절대 경로 반환
	 * @returns {string}
	 */
	get absolutePath() {
		return this.#absolutePath;
	}

	/**
	 * 모든 하위 카테고리 반환
	 * @returns {Category[]}
	 */
	get allChildCategories() {
		let allChildCategories = [];
		for (const childCategory of this.#childCategories.values()) {
			allChildCategories.push(childCategory);
			allChildCategories.push(...childCategory.allChildCategories);
		}
		return allChildCategories;
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
	 * @returns {import('./Post.js').default[]}
	 */
	get posts() {
		return Array.from(this.#posts.values());
	}

	/**
	 * 자신과 하위 카테고리의 포스트 반환
	 * @returns {import('./Post.js').default[]}
	 */
	get allPosts() {
		return [
			...this.#posts.values(),
			...[...this.#childCategories.values()].flatMap((child) => child.allPosts)
		];
	}

	/**
	 * 대체 언어가 없는 경우, 원본을 반환 합니다
	 * @param {string} absolutePath
	 * @returns {Category | undefined}
	 */
	static getCategory(absolutePath) {
		return (
			this.#categories.get(absolutePath) ?? Category.#categories.get(deLocalizeHref(absolutePath))
		);
	}

	static #initCategories(
		{ absolutePath, markdownAsync },
		{ category = this.#root, index = 0 } = {}
	) {
		const splitPath = absolutePath.split('/');
		const absolutePaths = splitPath;
		const categoryAbsolutePath = splitPath.slice(0, index + 1).join('/');

		if (absolutePaths.length > index + 1) {
			if (!this.#categories.has(categoryAbsolutePath))
				category.addChildCategory(new Category(categoryAbsolutePath));
			const targetCategory = this.#categories.get(categoryAbsolutePath);

			this.#initCategories(
				{ absolutePath, markdownAsync },
				{ category: targetCategory, index: index + 1 }
			);
		} else {
			const post = new Post({ absolutePath, markdownAsync });
			category.addPost(post);
		}
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
	 * @param {import('./Post.js').default} post 추가할 포스트
	 */
	addPost(post) {
		this.#posts.set(post.absolutePath, post);
	}

	/**
	 * 카테고리 직렬화
	 * @returns {Promise<{ name: string, absolutePath: string, childCategories: any[], allPosts: any[] }>}
	 */
	async toSerialize() {
		const postsPromise = Promise.all(this.allPosts.map((post) => post.toSerialize()));
		const childCategoriesPromise = Promise.all(
			this.childCategories.map((category) => category.toSerialize())
		);

		const [posts, childCategories] = await Promise.all([postsPromise, childCategoriesPromise]);
		// 날짜 기준 내림차순 정렬 (최신 글이 앞으로)
		posts.sort((a, b) => {
			const dateA = new Date(a.data.dates.at(-1) ?? 0);
			const dateB = new Date(b.data.dates.at(-1) ?? 0);
			if (dateA > dateB) return -1;
			if (dateA < dateB) return 1;
			return 0;
		});
		const filteredPosts = posts.map((post) => ({
			absolutePath: post.absolutePath,
			date: post.date,
			data: post.data
		}));

		return {
			name: this.name,
			absolutePath: this.#absolutePath,
			childCategories: childCategories,
			allPosts: filteredPosts
		};
	}
}
