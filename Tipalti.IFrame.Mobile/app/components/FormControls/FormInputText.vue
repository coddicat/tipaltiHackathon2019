<template>
    <GridLayout rows="auto, auto">
        <Label row="0" class="settings_form_title"
            :text="title"></Label>
        <TextView row="1" class="settings_form_value--ownline" 
            v-model="model" :keyboardType="keyboardType"></TextView>
    </GridLayout>
</template>

<script>
export default {
    props: {
        title: String,
        value: String,
        keyboardType: String
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    },
}
</script>