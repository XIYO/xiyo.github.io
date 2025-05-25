import { getGitLogAsync } from './gitLog.js';
import matter from 'gray-matter';

export default function () {
	return {
		name: 'vite-plugin-xiyo',
		enforce: 'pre',

		async transform(code, id) {
			if (!id.endsWith('.md')) {
				return;
			}

			// Git 로그를 비동기적으로 가져옴
			const gitLog = await getGitLogAsync(id);

			// gray-matter로 프론트매터 파싱 및 gitLog 관련 필드 주입
			const parsed = matter(code);
			parsed.data.authors = gitLog.map(x => x.author || '');
			parsed.data.dates = gitLog.map(x => x.datetime || '');
			parsed.data.messages = gitLog.map(x => x.comment || '');
			const newMarkdown = matter.stringify(parsed.content, parsed.data);

			// Git 로그를 별도의 export로 추가
			const resultCode = `
        export default ${JSON.stringify(newMarkdown)}
        export const gitLog = ${JSON.stringify(gitLog)};
      `;

			return {
				code: resultCode,
				map: null
			};
		}
	};
}
