<script lang="ts">
	import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth';
	import Auth from '$lib/fb';
	import { request } from '$lib/fetch';
	import { goto } from '$app/navigation';

	let email: string;
	let password: string;
	let error: string;
	// console.log('xxx');
	const submitHandler = async (e) => {
		try {
			const userCredential = await signInWithEmailAndPassword(Auth, email.trim(), password);
			// const idToken = await getIdToken(userCredential.user, true);
			const idToken = userCredential._tokenResponse.idToken;
			console.log(idToken);
			await request('/api/auth', 'post', { idToken });
			goto('/home');
		} catch (e) {
			const { message, code } = e;
			const errorCode = code;
			if (code === 'auth/too-many-requests') {
				error =
					'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
			} else if (code === 'auth/email-already-in-use') {
				error = 'email address already exist';
			} else if (code === 'auth/user-not-found') {
				error = "email doesn't exist";
			}
			console.log(message, code);
		}
	};
</script>

<h1>Login</h1>

kevin1552002@gmail.com

<form on:submit|preventDefault={submitHandler}>
	<label>
		Email:
		<input type="email" bind:value={email} />
	</label>
	<label>
		Password:
		<input type="password" bind:value={password} />
	</label>
	<input type="submit" />
</form>

{#if error}
	<p style="color: red">{error}</p>
{/if}

<p>if not have account then sign up / register <a href="/register">here</a>.</p>
