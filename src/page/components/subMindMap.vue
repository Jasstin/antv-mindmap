<template>
    <Modal v-model="modelValue" draggable sticky scrollable :mask="false" :title="data[0]?.info.title"
        @on-visible-change="() => this.$emit('update:modelValue', visible)">
        <mindmap v-model="data" :sharp-corner="true" v-if="subMindMapVisible" :scale-ratio="1" class="sub-mind-map" />
    </Modal>
</template>

<script>
import Mindmap from "../../components/MindMap";
export default {
    name: "SubMindMap",
    props: ['data', 'modelValue'],
    data() {
        return {
            subMindMapVisible: false
        }
    },
    components: {
        Mindmap,
    },
    watch: {
        modelValue: {
            handler(val) {
                this.$nextTick(() => {
                    this.subMindMapVisible = val
                });
            },
            immediate: true
        }
    }
}
</script>
<style scoped>
.sub-mind-map {
    width: 100%;
    height: 400px;
}
</style>