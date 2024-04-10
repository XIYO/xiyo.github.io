import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import Category from "$lib/post/Category.js";

export default class Post {
    static #posts = new Map();
    /** @type {string} */
    #absolutePath;
    /** @type {string} */
    #name;
    /** @type {string} HTML 로 변환된 마크다운 */
    #convertedMarkdown;

    /**
     * Post 클래스의 생성자입니다. 이 생성자는 포스트의 제목, 내용, 작성 날짜, 그리고 슬러그를 인자로 받아 Post 인스턴스를 생성합니다.
     * @param {string} absolutePath 포스트의 슬러그
     * @param {string} markdown 마크다운 원본
     */
    constructor({absolutePath, markdown}) {
        Post.#posts.set(absolutePath, this);

        this.#absolutePath = absolutePath;
        this.#name = absolutePath.split('/').at(-1);

        // 마크다운을 HTML로 변환합니다.
        this.#convertedMarkdown = unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeStringify)
            .processSync(markdown).toString();
    }

    get absolutePath() {
        return this.#absolutePath;
    }

    /**
     * 포스트가 가지는 실제 파일 명
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * 웹에 노출될 제목
     * @returns {string}
     */
    get title() {
        return this.#name; // TODO 제목은 마크다운 문장에서 한글로 된 문장 추출
    }

    /**
     * HTML 로 변환된 마크다운
     * @returns {string}
     */
    get convertedMarkdown() {
        return this.#convertedMarkdown;
    }

    /**
     * 포스트의 부모 카테고리 목록을 반환
     * @returns {Category[]}
     */
    get parentCategories() {
        const paths = this.#absolutePath.split('/');
        paths.pop();
        const parentAbsolutePath = paths.join('/');
        return Category.getCategory(parentAbsolutePath).parentCategories;
    }

    /**
     * 포스트의 카테고리를 반환
     * @param absolutePath
     * @returns {Post | undefined}
     */
    static getPosts(absolutePath) {
        return Post.#posts.get(absolutePath);
    }
}