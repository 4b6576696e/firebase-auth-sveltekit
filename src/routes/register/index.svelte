<script lang="ts">
	import {
		getAuth,
		createUserWithEmailAndPassword,
		updateProfile,
		getIdToken
	} from 'firebase/auth';

	import Auth from '$lib/fb';
	import { request } from '$lib/fetch';
	import { goto } from '$app/navigation';

	let email: string;
	let password: string;
	let name: string;
	let error: string;

	const submitHandler = async (e) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(Auth, email.trim(), password);
			console.log(userCredential.user);
			await updateProfile(userCredential.user, { displayName: name });
			console.log(userCredential.user);
			const idToken = getIdToken(userCredential.user, true);
			await request('/api/auth', 'post', { idToken });
			goto('/home');
		} catch (e) {
			const { message, code } = e;
			const errorCode = code;
			if (code === 'auth/weak-password') {
				error = 'Enter a strong password';
			} else if (code === 'auth/email-already-in-use') {
				error = 'email address already exist';
			}
			console.log(message, code);
		}
	};
</script>

<h1>Register</h1>

<form on:submit|preventDefault={submitHandler}>
	<label>
		Name:
		<input type="text" bind:value={name} />
	</label>
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

<p>Log in <a href="/login">here</a>.</p>
