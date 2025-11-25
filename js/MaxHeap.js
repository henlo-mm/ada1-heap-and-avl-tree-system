class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insertar(tarea) {
        this.heap.push(tarea);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].compararPrioridad(this.heap[parentIndex]) <= 0) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    extraerMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    heapifyDown(index) {
        const length = this.heap.length;
        
        while (true) {
            let largest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < length && this.heap[leftChild].compararPrioridad(this.heap[largest]) > 0) {
                largest = leftChild;
            }

            if (rightChild < length && this.heap[rightChild].compararPrioridad(this.heap[largest]) > 0) {
                largest = rightChild;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }

    obtenerTodas() {
        return [...this.heap];
    }

    estaVacio() {
        return this.heap.length === 0;
    }

    tamaño() {
        return this.heap.length;
    }

    eliminarPorId(id) {
        const index = this.heap.findIndex(tarea => tarea.id === id);
        if (index === -1) return false;

        const ultimoIndex = this.heap.length - 1;
        [this.heap[index], this.heap[ultimoIndex]] = [this.heap[ultimoIndex], this.heap[index]];
        
        this.heap.pop();

        if (index < this.heap.length) {
            const parent = Math.floor((index - 1) / 2);
            
            if (index > 0 && this.heap[index].compararPrioridad(this.heap[parent]) > 0) {
                this.heapifyUp(index);
            } else {
                this.heapifyDown(index);
            }
        }

        return true;
    }
}