<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue-demi";

const props = defineProps({
  itemsPerPage: {
    type: Number,
    required: true,
    default: 10,
  },

  maxButtons: {
    type: Number,
    required: true,
    default: -1,
  },

  //   totalItems: {
  //     type: Number,
  //     required: true,
  //     default: -1,
  //   },

  totalPages: {
    type: Number,
    required: true,
    default: -1,
  },

  currentPage: {
    type: Number,
    required: true,
    default: -1,
  },
});

let side_buttons = reactive({
  left: 0,
  right: 0,
});

let table_results_num = ref(10);
const createSideButtonArray = (buttons_count, invert) => {
  let arr = [];
  if (invert) {
    for (
      let i = props.currentPage - buttons_count;
      i < props.currentPage;
      i++
    ) {
      arr.push(i);
    }
  } else {
    for (
      let i = props.currentPage + 1;
      i <= props.currentPage + buttons_count;
      i++
    ) {
      arr.push(i);
    }
  }
  return arr;
};

const calculateSideButtons = () => {
  let more_pages_than_buttons = props.maxButtons < props.totalPages;
  if (more_pages_than_buttons) {
    let n = props.currentPage - Math.ceil(props.maxButtons / 2);
    if (n <= 0) {
      let right_buttons_count = Math.floor(props.maxButtons / 2) - n;
      let left_buttons_count = Math.ceil(props.maxButtons / 2) - 1 + n;

      side_buttons.right = createSideButtonArray(right_buttons_count, false);
      side_buttons.left = createSideButtonArray(left_buttons_count, true);
    } else {
      let m =
        props.totalPages -
        (props.currentPage + Math.floor(props.maxButtons / 2));

      if (m <= 0) {
        let right_buttons_count = m + Math.floor(props.maxButtons / 2);
        let left_buttons_count = Math.ceil(props.maxButtons / 2) - 1 - m;

        side_buttons.right = createSideButtonArray(right_buttons_count, false);
        side_buttons.left = createSideButtonArray(left_buttons_count, true);
      } else {
        let right_buttons_count = Math.ceil(props.maxButtons / 2) - 1;
        let left_buttons_count = Math.floor(props.maxButtons / 2);
        side_buttons.right = createSideButtonArray(right_buttons_count, false);
        side_buttons.left = createSideButtonArray(left_buttons_count, true);
      }
    }
  }
};

const onChangePage = (page) => {
  emit("onChangePage", {
    name: "Paginator.onChangePage",
    data: { page },
  });
};

const emit = defineEmits(["onChangePage"]);

const showLeftArrows = computed(() => {
  let more_pages_than_buttons = props.maxButtons < props.totalPages;
  let exist_pages_before = Math.ceil(props.maxButtons / 2) < props.currentPage;

  return exist_pages_before && more_pages_than_buttons;
});

const showRightArrows = computed(() => {
  let more_pages_than_buttons = props.maxButtons < props.totalPages;
  let exist_pages_after =
    props.currentPage + Math.floor(props.maxButtons / 2) < props.totalPages;

  return exist_pages_after && more_pages_than_buttons;
});

const buttons = computed(() => {
  if (props.maxButtons >= props.totalPages) {
    let aux_array = [];
    for (let i = 1; i <= props.totalPages; i++) {
      aux_array.push(i);
    }
    return aux_array;
  } else {
    return [props.currentPage];
  }
});

const leftButtons = computed(() => {
  let more_pages_than_buttons = props.maxButtons < props.totalPages;
  if (more_pages_than_buttons) {
    return [0, 1, 2, 3];
  } else {
    return [];
  }
});

onMounted(() => {
  calculateSideButtons();
});
</script>
<template>
  <ul class="pagination">
    <!-- <li class="paginate_button" v-if="showLeftArrows">
            <a class="page-link " @click="onChangePage(1)"> F </a>
        </li> -->
    <li
      class="paginate_button clickable"
      v-if="showLeftArrows"
      @click="onChangePage(currentPage - 1)"
    >
      <a type="button" class="page-link">
        <v-icon>mdi-chevron-left</v-icon>
      </a>
    </li>

    <li
      class="paginate_button clickable"
      v-for="i in side_buttons.left"
      :key="i"
      @click="onChangePage(i)"
    >
      <a class="page-link">{{ i }}</a>
    </li>

    <li
      class="paginate_button clickable"
      :class="[currentPage === j && 'active']"
      v-for="j in buttons"
      :key="j"
      @click="onChangePage(j)"
    >
      <a class="page-link">{{ j }}</a>
    </li>

    <li
      class="paginate_button clickable"
      v-for="k in side_buttons.right"
      :key="k"
      @click="onChangePage(k)"
    >
      <a class="page-link">{{ k }}</a>
    </li>

    <li
      class="paginate_button clickable"
      v-if="showRightArrows"
      @click="onChangePage(currentPage + 1)"
    >
      <a class="page-link">
        <v-icon>mdi-chevron-right</v-icon>
      </a>
    </li>
    <!-- <li class="paginate_button" v-if="showRightArrows">
        <a class="page-link " @click="onChangePage(totalPages)"> L </a>
      </li> -->
  </ul>
</template>
<style scoped>
.pagination {
  list-style: none;
  width: 100%;
}
.paginate_button {
  display: inline-block;
  padding: 2px 8px;
  margin: 0 2px;
  border: 1px solid rgb(206, 206, 206);
  border-radius: 3px;
  transition: 0.1s;
  font-size: 11px;
}
.paginate_button:hover {
  transition: 0.1s;
  background: rgb(233, 233, 233);
}
.active {
  box-shadow: 0px 0px 6px 0 rgba(132, 25, 17, 0.582);
  border: 1px solid rgba(132, 25, 17, 0.582);
  color: #841811ff;
  border-radius: 3px;
  font-weight: 900;
}
</style>
