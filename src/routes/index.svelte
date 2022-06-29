<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session, props }) => {
		if (!session.user.exist)
			return {
				status: 302,
				redirect: '/login'
			};

		return { props };
	};
</script>
