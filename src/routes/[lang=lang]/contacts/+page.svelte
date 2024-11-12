<script lang="ts">
	import { PUBLIC_MAILTO_ADDRESS } from '$env/static/public';
	export let data;

	let formValues = {
		subject: '',
		message: '',
		name: ''
	};

	const submit = (e: Event) => {
		e.preventDefault();
		window.location.href = `mailto:${PUBLIC_MAILTO_ADDRESS}?subject=${encodeURIComponent(formValues.subject)}&body=${encodeURIComponent(`${formValues.message}\n\n${formValues.name}`)}`;
	};
</script>

<div class="wrapper" itemscope itemtype="http://schema.org/ContactPage">
	<h2>{data.page.contents.title}</h2>

	<form on:submit={submit} itemscope itemtype="http://schema.org/CommunicateAction">
		{#each data.page.contents.form.inputs as formData}
			<div>
				<label hidden for={formData.for}>{formData.label}</label>
				{#if formData.textarea}
					<textarea
						placeholder={formData.placeholder}
						required
						itemprop={formData.itemprop}
						class="feedback-input"
						bind:value={formValues.message}
					></textarea>
				{:else}
					<input
						placeholder={formData.placeholder}
						required
						itemprop={formData.itemprop}
						class="feedback-input"
						bind:value={formValues[formData.for == 'subject' ? 'subject' : 'name']}
					/>
				{/if}
			</div>
		{/each}

		<div>
			<button type="submit" itemprop="handler">{data.page.contents.form.submit}</button>
		</div>
	</form>

	<div class="form-options">
		<a title="Telegram Link" href="https://t.me/SebaOfficial" target="_blank" rel="noreferrer">
			<img class="circle-image" src="/svg/telegram.svg" alt="Telegram Logo" itemprop="sameAs" />
		</a>
		<a title="Github Link" href="https://github.com/SebaOfficial" target="_blank" rel="noreferrer">
			<img class="circle-image" src="/svg/github.svg" alt="Github Logo" itemprop="sameAs" />
		</a>
	</div>
</div>

<style lang="scss">
	.wrapper {
		border: 1px solid var(--color6);
		padding: 3em 2em 3em 2em;

		h2 {
			font-size: 2.5em;
			text-align: center;
			margin-bottom: 0.3em;
			color: var(--color7);
		}

		> h2 {
			margin-bottom: 1em;
		}

		.form-options {
			margin-top: 30px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			gap: 2.2em;

			a {
				background-color: transparent;
			}

			img {
				box-shadow: 0 0 0 transparent;
				width: 60px;
				height: 60px;
			}

			.circle-image {
				&:hover {
					box-shadow: 0 0 15px var(--color7);
					border-radius: 50%;
				}
			}
		}

		.feedback-input {
			color: var(--color7);
			font-weight: 500;
			font-size: 18px;
			border-radius: 5px;
			line-height: 22px;
			background-color: transparent;
			border: 2px solid #469;
			transition: all 0.3s;
			padding: 13px;
			margin-bottom: 15px;
			width: 100%;
			box-sizing: border-box;
			outline: 0;

			&::focus {
				border: 2px solid var(--color7);
			}
		}

		textarea {
			height: 150px;
			line-height: 150%;
			resize: vertical;
		}

		[type='submit'] {
			font-family: 'Montserrat', Arial, Helvetica, sans-serif;
			width: 100%;
			background: #469;
			border-radius: 5px;
			border: 0;
			cursor: pointer;
			color: white;
			font-size: 24px;
			padding-top: 10px;
			padding-bottom: 10px;
			transition: all 0.3s;
			margin-top: -4px;
			font-weight: 700;

			&:hover {
				background: rgb(65, 130, 228);
			}
		}
	}
</style>
