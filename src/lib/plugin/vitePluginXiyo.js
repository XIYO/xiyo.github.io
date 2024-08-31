import { getGitLogAsync } from './gitLog.js';

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

			// Git 로그를 별도의 export로 추가
			const resultCode = `
        export default ${JSON.stringify(code)}
        export const gitLog = ${JSON.stringify(gitLog)};
      `;

			return {
				code: resultCode,
				map: null
			};
		}
	};
}
