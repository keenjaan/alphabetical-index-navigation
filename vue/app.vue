<template>
	<div id="app">
		<country-list></country-list>
	</div>
</template>

<script>
  import countryList from './country.vue';
  export default {
    components: {
      countryList
    }
  };
</script>

<style scoped>
	#app {
		font-size: 14px;
	}
</style>
