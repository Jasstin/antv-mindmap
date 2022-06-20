import {NodeData} from "../interface";

class History {
    data: NodeData[] | [] = []
    index: number = 0

    push(data: NodeData) {
        (this.data as NodeData[]).push(data)
        this.index = this.data.length - 1
    }

    goBack(n: number = 1) {
        this.index--
        if (this.index <= 0) this.index = 0
        let data = this.data[this.index]
        return data
    }

    forword(n: number = 1) {
        this.index++
        if (this.index >= this.data.length - 1) this.index = this.data.length - 1
        let data = this.data[this.index]
        return data
    }
}

export default new History()
