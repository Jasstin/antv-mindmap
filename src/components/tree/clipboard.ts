import {ref} from "vue";

let dataArr = ref([])

export const pushData = (data) => {
    dataArr.value.push(data)
}

export const popData = () => {
    return dataArr.value.pop()
}
