import { exec as execCb } from 'child_process';
import { promisify } from 'util';
const exec = promisify(execCb);

function vitePluginMarkdownFrontMatter() {
	return {
		name: 'vite-plugin-markdown-front-matter',
		enforce: 'pre',
		async transform(code, id) {
			if (id.endsWith('.md?raw')) {
				const nonRawId = id.slice(0, -4);

				// Git 커밋 정보 비동기적으로 추출
				const publishedPromise = exec(`git log --reverse --format=%aI ${nonRawId}`);
				const modifiedPromise = exec(`git log -1 --format=%aI ${nonRawId}`);
				const firstAuthorPromise = exec(`git log --reverse --format=%an ${nonRawId}`);
				const lastAuthorPromise = exec(`git log -1 --format=%an ${nonRawId}`);

				// 프로미스 결과를 동시에 기다립니다.
				let [published, modified, firstAuthor, lastAuthor] = await Promise.all([
					publishedPromise,
					modifiedPromise,
					firstAuthorPromise,
					lastAuthorPromise
				]);

				published = `published: ${published.stdout.trim()}`;
				modified = `modified: ${modified.stdout.trim()}`;
				firstAuthor = `firstAuthor: ${firstAuthor.stdout.trim()}`;
				lastAuthor = `lastAuthor: ${lastAuthor.stdout.trim()}`;

				let frontMatter = `---\\r\\n${published}\\r\\n${modified}\\r\\n${firstAuthor}\\r\\n${lastAuthor}\\r\\n---\\r\\n`;

				const finalCode = code.replace(/export default "/, `export default "${frontMatter}`);
				return { code: finalCode, map: null };
			}
			return null;
		}
	};
}

export default vitePluginMarkdownFrontMatter;
