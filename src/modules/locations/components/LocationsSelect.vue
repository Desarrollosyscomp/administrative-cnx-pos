<!-- ******************** HTML ******************** -->
<template>
  <v-select
    v-model="selectedLocation"
    :items="items"
    item-title="name"
    item-value="id"
    color="#841811ff"
    density="compact"
    variant="outlined"
    :label="title"
    :disabled="disabled"
    @update:modelValue="onUpdateLocation"
  >
  </v-select>
</template>

<!-- ******************** JavaScript ******************** -->
<script lang="ts" setup>

import { ref, onMounted } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: [],
  },
  defaultSelected: {
    type: Number|| null,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

let title = ref("");
let selectedLocation = ref<number | null>(null);

const setDefault = () => {
  title.value = props.title;
  selectedLocation.value =
    props.defaultSelected == 0 ? null : props.defaultSelected;
};

const findLocationById = (id: number) => {
  return props.items.find((item: any)=>{
    return item.id == id
  })
}

const onUpdateLocation = (value: any) => {
  const location = findLocationById(value)
  emit('update:modelValue',
  {name: 'LocationSelect.onUpdateLocation',
    data: {
      name: props.title,
      location
    }
  })
}
// watch(() => props.defaultSelected, () => {
//   console.log(props.defaultSelected)

  
// })
onMounted(() => {
  setDefault();
  
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
