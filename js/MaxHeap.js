class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // O(log n) - Insertar elemento
    insertar(tarea) {
        this.heap.push(tarea);
        this.heapifyUp(this.heap.length - 1);
    }

    // O(log n) - Heapify hacia arriba
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].compararPrioridad(this.heap[parentIndex]) <= 0) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    // O(log n) - Extraer máximo
    extraerMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    // O(log n) - Heapify hacia abajo
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

    // O(1) - Obtener todas las tareas
    obtenerTodas() {
        return [...this.heap];
    }

    // O(1) - Verificar si está vacío
    estaVacio() {
        return this.heap.length === 0;
    }

    // O(1) - Obtener tamaño
    tamaño() {
        return this.heap.length;
    }

    // O(n) - Eliminar tarea por ID
    eliminarPorId(id) {
        const index = this.heap.findIndex(tarea => tarea.id === id);
        if (index === -1) return false;

        // Intercambiar con el último elemento
        const ultimoIndex = this.heap.length - 1;
        [this.heap[index], this.heap[ultimoIndex]] = [this.heap[ultimoIndex], this.heap[index]];
        
        // Eliminar el último elemento
        this.heap.pop();

        // Si no era el último, reajustar el heap
        if (index < this.heap.length) {
            const parent = Math.floor((index - 1) / 2);
            
            // Si el elemento es mayor que su padre, hacer heapify up
            if (index > 0 && this.heap[index].compararPrioridad(this.heap[parent]) > 0) {
                this.heapifyUp(index);
            } else {
                // Sino, hacer heapify down
                this.heapifyDown(index);
            }
        }

        return true;
    }
}