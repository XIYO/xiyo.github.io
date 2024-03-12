import Category from '$lib/Category.js';

export default class CategoryManager {
	/** @type {CategoryManager} */
	static #instance;
	/** @type {Category} */
	category = new Category(); // root category
	#metaMarkdown = import.meta.glob('/static/**/*.md', { query: '?raw'});

	/**
	 * 싱글톤 입니다. 직접 생성하지마십시오. instance를 사용하십시오.
	 * @returns {CategoryManager}
	 */
	constructor() {
		if (CategoryManager.#instance) {
			return CategoryManager.#instance;
		}
		Object.entries(this.#metaMarkdown).forEach(([path, page]) => {
			const paths = path.split('/').slice(2); // [0]은 빈 문자열, [1]은 data, 이 둘을 삭제
			const postKey = paths.pop().split('.')[0]; // 패스에서 파일명을 분리하고, 확장자, md를 제거
			this.initCategories(paths, {postKey, page});
		});
	}

	/**
	 *
	 * @returns {CategoryManager}
	 */
	static get instance() {
		if (!this.#instance) {
			this.#instance = new this();
		}
		return this.#instance;
	}

	/**
	 * 자식 카테고리와 포스트 데이터를 초기화 합니다.
	 * 
	 * @param {string[]} paths - 접근 경로
	 * @param {string} postKey - 포스트 맵에 넣을 키
	 * @param {Function} page - 마크 다운 문서
	 * @param {number} index - 현재 경로의 인덱스
	 * @param {Category} category - 현재 카테고리 객체
	 */
	initCategories(paths, {postKey, page}, category = this.category, index = 0) {
		if (index < paths.length) {
			const keyName = paths[index];
			let subCategory = category.children.get(keyName) || new Category(keyName, category);
			category.children.set(keyName, subCategory);
			this.initCategories(paths, {postKey, page}, subCategory, index + 1);
		} else {
			category.posts.set(postKey, page);
		}
	}
}