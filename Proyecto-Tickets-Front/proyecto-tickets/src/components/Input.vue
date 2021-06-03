<template>
    <div>
        <div class="izq">
            <label :for="id">{{ titulo }}</label>
            <input :id="id" class="form-control" :value="value" :type="type" :maxlength="maxlength" :placeholder="placeholder"
                   :disabled="disabled"  @input="$emit('input', $event.target.value)" />
            <span v-if="error" class="text-danger">{{ mensajeError }}</span>
        </div>
        
    </div>
</template>

<script>
export default ({
    name: 'Input',
    props: {
        id:{
            type:[String, Number],
            required: true
        },
        titulo: String,
        value: [String, Number],
        type: [String, Number],
        maxlength: {
            type:[String, Number],
            default: 100
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
        },
        mensajeError: {
            type: String,
            default: "Campo Obligatorio"
        },
        error: {
            type: Boolean,
            default: false
        }
    }
})

</script>

<style>
.izq{
    text-align: left;
}
</style>