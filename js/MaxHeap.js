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
            
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    eliminarPorId(id) {
        const index = this.heap.findIndex(tarea => tarea.id === id);
        if (index === -1) return false;

        const ultimoIndex = this.heap.length - 1;
        this.swap(index, ultimoIndex);
        this.heap.pop();

        if (index < this.heap.length) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (index > 0 && this.heap[index].compararPrioridad(this.heap[parentIndex]) > 0) {
                this.heapifyUp(index);
            } else {
                this.heapifyDown(index);
            }
        }

        return true;
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

            this.swap(index, largest);
            index = largest;
        }
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
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
}