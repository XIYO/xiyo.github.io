module.exports = {
  theme: {
    extend: {
      colors: {
        // Base surfaces
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        'surface-inverse': 'var(--color-surface-inverse)',

        // Typography colors
        content: 'var(--color-content)',
        'content-muted': 'var(--color-content-muted)',
        'content-inverse': 'var(--color-content-inverse)',
        // Positive/Negative text colors
        'text-positive': 'var(--color-content)', // 기본 텍스트 컬러(포지티브)
        'text-negative': 'var(--color-content-inverse)', // 반전 텍스트 컬러(네거티브)

        // Brand actions
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',

        // System elements
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        focus: 'var(--color-focus)',
        accent: 'var(--color-accent)',
        destructive: 'var(--color-destructive)',
      },
    },
  },
};