<template>
    <GridLayout columns="auto, *, 15" @tap="onTap">
        <Label col="0" class="settings_form_title"
            :text="title"></Label>
        <Label col="1" class="settings_form_value"
            :text="selected && getDisplayFunc(selected) || null"></Label>
        <Label col="2" text.decode="&#xf0d7;" textAlignment="right" class="fas nt-icon" color="#999"></Label>
    </GridLayout>    
</template>
<script>
export default {
    props: {
        getValueFunc: {
            type: Function,
            default: (x) => x
        },
        getDisplayFunc: {
            type: Function,
            default: (x) => x
        },
        value: [String, Object, Number, Boolean],
        list: Array,
        title: String
    },
    computed: {
        selected(){
            const item = this.list.find(x => this.getValueFunc(x) === this.value);
            return item;
        },        
    },
    methods: {
        async onTap() {
            const res = await this.$listPicker({ 
                list: this.list, 
                selected: this.selected, 
                title: 'Select ' + this.title,
                getDisplayFunc: this.getDisplayFunc
            });            
            this.$emit('input', res && this.getValueFunc(res) || this.value);
        }
    },
}
</script>