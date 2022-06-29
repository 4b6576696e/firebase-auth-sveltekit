<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session, props }) => {
		console.log('session: ', session);
		if (!session.user.exist)
			return {
				status: 302,
				redirect: '/login'
			};

		return {
			props: {
				user: session.user
			}
		};
	};
</script>

<script>
	import { goto } from '$app/navigation';
	import { request } from '$lib/fetch';

	export let user;

	const logout = async (e) => {
		await request('/api/auth', 'delete');
		goto('/login');
	};
</script>

<h1>Home</h1>

<button on:click={logout}>LogOut</button>

<p>user: {user.uid}</p>
