import { visit } from 'unist-util-visit';

export function removeStaticPath() {
	return (tree) => {
		visit(tree, (node) => {
			if (
				(node.type === 'element' &&
					(node.tagName === 'img' || node.tagName === 'video' || node.tagName === 'audio')) &&
				typeof node.properties?.src === 'string' &&
				node.properties.src.startsWith('/static/')
			) {
				node.properties.src = node.properties.src.replace('/static/', '/');
			}
		});
	};
}

