<script lang="ts">
	import { dev } from '$app/environment';
	import axios from 'axios';
	import { PUBLIC_BMC_ID, PUBLIC_API_URL } from '$env/static/public';
	import { page } from '$app/stores';

	export let data;

	const paymentMethods = ['Card', 'PayPal', 'SatisPay'];

	let paymentMethod = 'Card';
	let amount = $page.url.searchParams.get('amount') || '10.00';
	let amountError = false;

	const submit = async (e: Event) => {
		e.preventDefault();
		if (validateAmount() && paymentMethod) {
			const client = axios.create({
				baseURL: PUBLIC_API_URL
			});

			const res = await client.post(
				`/pay/${paymentMethod.toLowerCase()}/${amount.replace('.', '')}`
			);
			window.open(res.data.url, '_blank', 'noopener,noreferrer');
		}
	};

	const changePaymentMethod = (method: string) => (paymentMethod = method);

	const validateAmount = () => {
		amountError = !/^\d+\.\d{2}$/.test(amount);
		return !amountError;
	};
</script>

<div class="wrapper">
	<div>
		<h2>{data.page.contents.title}</h2>
		<p>{data.page.contents.subTitle}</p>
	</div>

	<form on:submit={submit}>
		<div class="payment-options">
			<label for="payment-method"><h3>{data.page.contents.form.method}</h3></label>
			<div class="form-options">
				{#each paymentMethods as method}
					<div class="option">
						<input type="radio" name="payment-method" value="pay-{method}" />
						<label for="pay-{method}">
							<!-- TODO: don't ignore svelte's warnings -->
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<img
								title="{method} Payment"
								alt="{method} Icon"
								src="/svg/{method.toLocaleLowerCase()}.svg"
								on:click={() => changePaymentMethod(method)}
								class:selected={method == paymentMethod}
							/>
						</label>
					</div>
				{/each}
			</div>
		</div>

		<br />

		<div>
			<label for="amount"><h3>{data.page.contents.form.amount}</h3></label>
			<p>
				€ <span
					class="amount"
					on:input={validateAmount}
					bind:textContent={amount}
					class:amountError
					contenteditable
				/>
			</p>
		</div>

		<br />

		<div>
			<button type="submit" id="pay-button">{data.page.contents.form.submit}</button>
		</div>
	</form>
</div>

{#if !dev}
	<script
		data-name="BMC-Widget"
		data-cfasync="false"
		src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
		data-id={PUBLIC_BMC_ID}
		data-description={data.page.contents.bmc.description}
		data-message={data.page.contents.bmc.message}
		data-color="#5F7FFF"
		data-position="Right"
		data-x_margin="18"
		data-y_margin="18"
	></script>
{/if}

<style lang="scss">
	.wrapper {
		min-height: 500px;
		border: 1px solid var(--color6);
		padding: 3em 2em 3em 2em;

		h2 {
			font-size: 2.5em;
			text-align: center;
			margin-bottom: 0.3em;
			color: var(--color7);
		}
		form h3 {
			margin: 15px 0 5px 0;
		}

		input[type='radio'] {
			display: none;
		}
		.form-options {
			margin-top: 30px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			gap: 2.2em;

			img {
				box-shadow: 0 0 0 transparent;
				width: 90px;
				height: 90px;
				padding: 10px;
				transition:
					width 1s,
					height 1s;
			}
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

		.amount {
			font-size: 2em;
		}

		.amountError {
			background-color: red;
		}

		img.selected {
			border: 4px solid #4f95ff;
			height: 125px;
			width: 125px;
		}
	}
</style>
