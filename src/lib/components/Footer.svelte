<footer>
Designed By chimi 🎈
</footer>

<style>
    footer {
        font-size: 0.7rem;
        text-align: center;
        margin-block: var(--margin-default-block);

        view-transition-name: footer;
    }

    :global(html) {
        ::view-transition-old(footer) {
            animation:
                    90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
                    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
        }

        ::view-transition-new(footer) {
            animation:
                    210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
                    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
        }

    }
</style>