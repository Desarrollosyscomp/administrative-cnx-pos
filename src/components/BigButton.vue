<template>
  <v-card
    :style="{ background: test[selectedColor].background, 
      border: `1px solid ${test[selectedColor].border}`, 
      color: test[selectedColor].text, 
      width: test[selectedColor].width,
      height: test[selectedColor].height,
      borderRadius: test[selectedColor].borderRadius }"
    :class="[selected && 'selected', 'clickable']" elevation="2">
    <v-card-text>
      <div align="center">
        <p class="mt-n1">{{ label }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "Click Me",
  },
  selected: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'default',
  }
});

let selected = ref(false);

watch(() => props.label, (newValue) => {
  if (newValue) {
    selected.value = true;
  } else {
    selected.value = false;
  }
});
let selectedColor = ref('default')
let test = {
  blue: {
    background: '#1867C0',
    border: '#1259ab',
    text: 'white',
    width: '150px',
    height: '45px',
    borderRadius: '5px',
  },
  default: {
    color: 'white',
    border: 'lightgray',
  },
} as any;
onMounted(() => {
  selected.value = props.selected;
  selectedColor.value = props.color;
});
</script>
<style scoped>
.clickable:hover {
  background: rgb(200, 199, 199);
}

.clickable {
  border: 1px solid #1259ab;
  transition: 0.15s;
}

.selected {
  /* background: rgb(252, 236, 236); */
  border: 1px solid;
}
</style>
