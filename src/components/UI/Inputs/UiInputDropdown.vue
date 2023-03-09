<template>
  <v-card max-width="100" elevation="0" style="background-color: inherit">
    <v-select
        item-color="black"
        class="input text-h6 text-uppercase"
        color="green"
        v-bind="$attrs"
        density="compact"
        hide-details
        variant="plain"
    >
    </v-select>
  </v-card>
</template>

<script>
export default {
  name: "UiInputDropdown",
  inheritAttrs: false
}
</script>

<style scoped>
.input >>> fieldset {
  border-color: rgba(255, 255, 255, 0);
}

.input >>> input {
  display: none;
}

.input >>> .v-field__input{
  padding: 4px;
}

.input >>> .v-field__append-inner {
  padding-top: 2px;
  margin-left: -12px;
}

.input >>> .v-menu__content{
  border: none;
}

.input >>> .v-input__slot{
  padding: 0 !important;
}

</style>