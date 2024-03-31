export default class Category {
	/** @type {string} */
	#name;
	/** @type {Category | undefined} */
	parent;
	/** @type {Map<string, Category>} */
	children = new Map();
	/** @type {Map<string, Function>} */
	posts = new Map();

	constructor(name = 'root', parent = undefined) {
		this.#name = name;
		this.parent = parent;
	}

	get name() {return this.#name;}

	get size() {return this.children.size + this.posts.size;}

	get allPosts() {return this.#collectPosts(this);}

	get allParents() {
		if (this.parent.name === 'root') {
			return [];
		} else if (this.parent) {
			return [...this.parent.allParents, this.parent];
		}
		return [];
	}

	/** 
	 * @param {string} parentName
	 * @returns {string[]}
	 */
	getCategoryPath(parentName = 'root') {
		if (this.parent?.name !== parentName) {
			return [...this.parent.getCategoryPath(parentName), this.name];
		} else {
			return [this.#name];
		}
	}

	getPathname() {
		if (this.parent) {
			return [this.parent.getPathname(), this.#name].join('/');
		}

		return '';
	}

	/**
	 * @param {Category} category
	 * @param {Map<string, Function>} posts
	 * @param {number} parentDepth
	 * @returns {Map<string, Function>}
	 */
	#collectPosts(category, posts = new Map(), parentDepth = 0) {

		// 현재 카테고리의 포스트 추가
		category.posts.forEach((page, path) => {

			const name = path.split('/').at(-1);
			const parentPath = [name];
			let tempCategory = category;
			for(let i = 0; i < parentDepth; i++) {
				parentPath.push(tempCategory.name);
				tempCategory = tempCategory.parent;
			}
			parentPath.reverse();

			posts.set(parentPath.join('/'), {name, page});
		});
		// 모든 하위 카테고리에 대해 재귀적으로 호출
		category.children.forEach(subCategory => {
			this.#collectPosts(subCategory, posts, parentDepth + 1);
		});

		return posts;
	};
}