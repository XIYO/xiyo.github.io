import { z } from 'zod';

export const PostFrontmatterSchema = z
	.object({
		title: z.string().min(1).optional(),
		description: z.string().optional(),
		keywords: z
			.union([z.string(), z.array(z.string())])
			.transform((v) =>
				Array.isArray(v)
					? v
					: v
						? v
								.split(',')
								.map((s) => s.trim())
								.filter(Boolean)
						: []
			)
			.optional(),
		tags: z
			.union([z.string(), z.array(z.string())])
			.transform((v) =>
				Array.isArray(v)
					? v
					: v
						? v
								.split(',')
								.map((s) => s.trim())
								.filter(Boolean)
						: []
			)
			.optional(),
		dates: z.array(z.string()).optional(),
		published: z.string().optional(),
		modified: z.string().optional(),
		lastModified: z.string().optional(),
		author: z.string().optional(),
		image: z.string().optional(),
		section: z.string().optional(),
		type: z.string().optional()
	})
	.passthrough();

/**
 * Parse/normalize frontmatter and produce stable meta fields.
 * @param {unknown} fm
 * @param {{ fallbackTitle?: string, fallbackDescription?: string }} [opts]
 */
export function parseFrontmatter(fm, opts = {}) {
	const parsed = PostFrontmatterSchema.safeParse(fm);
	const data = parsed.success ? parsed.data : {};

	const dates = Array.isArray(data.dates) ? data.dates : [];
	const publishedTime = data.published || dates[0] || null;
	const modifiedTime =
		data.lastModified || data.modified || (dates.length ? dates[dates.length - 1] : null);

	return {
		title: data.title ?? opts.fallbackTitle ?? null,
		description: data.description ?? opts.fallbackDescription ?? null,
		keywords: data.keywords ?? [],
		tags: data.tags ?? [],
		author: data.author ?? null,
		image: data.image ?? null,
		section: data.section ?? null,
		type: data.type ?? null,
		publishedTime,
		modifiedTime
	};
}
