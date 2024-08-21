import { spawnSync } from 'child_process';

export default function gitLog({ filePath }) {
	return (tree, file) => {
		try {
			file.data.gitLog = getGitLog(filePath);
		} catch (error) {
			console.error('Failed to retrieve git log:', error);
		}
	};
}

const dummyDatetime = [
	{
		datetime: new Date().toISOString(),
		comment: 'dummy'
	}
];

/**
 * Git 로그 정보를 추출하는 함수
 * @param filePath
 * @returns {{date: *, subject: *}[]|*[]}
 */
function getGitLog(filePath) {
	const gitCommand = [
		'log',
		'--follow',
		'--pretty=format:%ad,%s',
		'--date=format:%Y-%m-%dT%H:%M%z',
		filePath
	];
	const { stdout } = spawnSync('git', gitCommand, { shell: false, encoding: 'utf8' });

	return stdout
		? stdout.split('\n').map((line) => {
				const [datetime, comment] = line.split(',');
				return { datetime, comment };
			})
		: dummyDatetime;
}
