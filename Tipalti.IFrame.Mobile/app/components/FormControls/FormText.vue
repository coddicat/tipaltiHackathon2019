<template>
    <GridLayout rows="auto, auto">
        <Label row="0" class="settings_form_title"
            :text="title"></Label>
        <Label row="1" textWrap="true" class="settings_form_value--ownline"
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