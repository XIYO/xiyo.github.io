import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

export default class Markdown {
    constructor() {
        throw new Error('Markdown is a static class and cannot be instantiated.')
    }

    static async toHtml(markdown) {
        return await unified()
            .use(remarkParse)
            .use(remarkFrontmatter)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(markdown)
    }
}