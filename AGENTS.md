<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the Apoura marketplace experience on the home route with page-specific sections, so the root opens directly into vendor discovery.
- Keep appearance preferences in the shared ThemePicker using browser-local storage and global CSS tokens; they are device settings, not account data.
- Convert user RGB accents to OKLCH tokens through the appearance helper, and apply shape tokens globally so pages and portalled controls stay consistent.
