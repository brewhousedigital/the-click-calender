<script>
  import dayjs from 'dayjs'

	export let title = "";

  let date = "";

  let calculatedDate = "";

  const handleChange = () => {
    console.log(">>>date", date)
		calculatedDate = dayjs(date).format('MMM D, YYYY');
	}
</script>


<h1>{title}</h1>

<input type="date" bind:value={date} on:change={handleChange} />

<h2>Output: {calculatedDate}</h2>




<style>
	input {
			padding: 12px 24px;
			font-size: 24px;
	}
</style>