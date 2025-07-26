/**
 * TypeScript definitions for markdown processing
 * These types provide better type safety for unified, mdast, and hast
 */

// Basic unified AST node structure
export interface UnistNode {
	type: string;
	data?: Record<string, any>;
	position?: {
		start: { line: number; column: number; offset?: number };
		end: { line: number; column: number; offset?: number };
	};
}

// Markdown AST (mdast) node types
export interface MdastNode extends UnistNode {
	children?: MdastNode[];
}

export interface MdastRoot extends MdastNode {
	type: 'root';
	children: MdastNode[];
}

export interface MdastImage extends MdastNode {
	type: 'image';
	url: string;
	title?: string;
	alt?: string;
}

export interface MdastText extends MdastNode {
	type: 'text';
	value: string;
}

export interface MdastParagraph extends MdastNode {
	type: 'paragraph';
	children: MdastNode[];
}

export interface MdastHeading extends MdastNode {
	type: 'heading';
	depth: 1 | 2 | 3 | 4 | 5 | 6;
	children: MdastNode[];
}

export interface MdastLink extends MdastNode {
	type: 'link';
	url: string;
	title?: string;
	children: MdastNode[];
}

export interface MdastCode extends MdastNode {
	type: 'code';
	lang?: string;
	meta?: string;
	value: string;
}

export interface MdastInlineCode extends MdastNode {
	type: 'inlineCode';
	value: string;
}

// HTML AST (hast) node types
export interface HastNode extends UnistNode {
	children?: HastNode[];
}

export interface HastRoot extends HastNode {
	type: 'root';
	children: HastNode[];
}

export interface HastElement extends HastNode {
	type: 'element';
	tagName: string;
	properties?: Record<string, any>;
	children: HastNode[];
}

export interface HastText extends HastNode {
	type: 'text';
	value: string;
}

// Post metadata interface
export interface PostMetadata {
	title?: string;
	description?: string;
	tags?: string[];
	published?: string;
	modified?: string;
	created?: string;
	dates?: string[];
	authors?: string[];
	slug?: string;
	draft?: boolean;
	[key: string]: any;
}

// Processed markdown result
export interface ProcessedMarkdown {
	value: string;
	data: PostMetadata;
}

// Post data interface
export interface PostData {
	absolutePath: string;
	data: PostMetadata;
}

// Post content interface
export interface PostContent {
	absolutePath: string;
	value: string;
}

// Combined post interface
export interface PostWithContent extends PostData {
	value: string;
}

// Category serialization interface
export interface SerializedCategory {
	name: string;
	absolutePath: string;
	childCategories: SerializedCategory[];
	allPosts: PostData[];
}

// Unified processor result
export interface UnifiedResult {
	value: string;
	data: Record<string, any>;
}

// Plugin function type for unified
export type UnifiedPlugin = (tree: MdastNode | HastNode) => void;

// Visitor function type for unist-util-visit
export type VisitorFunction<T extends UnistNode = UnistNode> = (
	node: T,
	index?: number,
	parent?: UnistNode
) => void;
