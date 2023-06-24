<script lang="ts">
	import { goto } from '$app/navigation';
	import AsyncButton from '$lib/components/buttons/AsyncButton.svelte';
	import PasswordInput from '$lib/components/controls/PasswordInput.svelte';
	import FormControl from '$lib/components/forms/FormControl.svelte';
	import UserService from '$lib/services/user.service';
	import '$lib/styles/page/_login.scss';
	import { setUserState, userStore } from '$stores/user';

	let emailValue: string = '';
	let passwordValue: string = '';
	const emailRE: RegExp = /\w+/g;
	let emailTouched = false;
	let passwordTouched = false;
	let responseError: Error | null = null;
	$: emailErrorName = !emailValue.trim().length
		? 'required'
		: emailRE.test(emailValue)
		? null
		: 'email';

	let passwordErrorName: string | null;
	$: passwordErrorName = !passwordValue.trim().length
		? 'required'
		: passwordValue.trim().length >= 6
		? null
		: 'min-length:6';

	$: formIsValid =
		emailTouched && passwordTouched && !!(passwordErrorName || emailErrorName) === false;

	async function onSubmit() {
		try {
			const result = await UserService.login({ email: emailValue, account_pass: passwordValue });
			if (result.status !== 200) {
				console.error(result);
				throw result;
			}
			responseError = null;
			await setUserState(result.token);
			await goto('/dashboard');
		} catch (e) {
			responseError = e as Error;
		}
	}
</script>

<div class="page login-page">
	<main id="content" class="main-content">
		<h1>Login</h1>
		{#if responseError}
			<div class="response-error">
				{JSON.stringify(responseError)}
			</div>
		{/if}
		<form class="login-form form" on:submit|preventDefault>
			<FormControl errorName={emailTouched ? emailErrorName : null}>
				<label for="email" class="label required">Email</label>
				<input
					type="email"
					id="email"
					bind:value={emailValue}
					on:blur={() => (emailTouched = true)}
				/>
			</FormControl>
			<FormControl errorName={passwordTouched ? passwordErrorName : null}>
				<label for="password" class="label required">Password</label>
				<PasswordInput
					id="password"
					bind:value={passwordValue}
					on:blur={() => (passwordTouched = true)}
				/>
			</FormControl>
			<footer class="form-controls">
				<AsyncButton disabled={!formIsValid} color="primary" onClick={onSubmit}>Login</AsyncButton>
			</footer>
		</form>
	</main>
</div>
