<template>
    <GridLayout columns="auto, *">
        <Label col="0" class="settings_form_title"
            :text="title"></Label>
        <Label col="1" class="settings_form_value"
            :text="value"></Label>
    </GridLayout>    
</template>
<script>
export default {
    props: {
        title: String,
        value: String
    }
}
</script>