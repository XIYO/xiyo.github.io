/**
 * TypeScript definitions for Svelte component props
 */

import type { PostData, PostContent, SerializedCategory } from './markdown.js';

// Post component props
export interface PostProps {
	postMetadata: PostData;
	postContent: PostContent;
}

// Posts component props  
export interface PostsProps {
	category: SerializedCategory;
}

// Button component props
export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	onclick?: () => void;
	children?: any;
}

// Card component props
export interface CardProps {
	negative?: boolean;
	children?: any;
}

// Navigation component props
export interface NavProps {
	// Add specific nav props as needed
}

// Footer component props
export interface FooterProps {
	// Add specific footer props as needed
}