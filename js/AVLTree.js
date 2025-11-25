class AVLNode {
    constructor(task) {
        this.task = task;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    updateHeight(node) {
        if (node) {
            node.height = 1 + Math.max(
                this.getHeight(node.left), 
                this.getHeight(node.right)
            );
        }
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    insert(task) {
        this.root = this.insertNode(this.root, task);
    }

    insertNode(node, task) {
        if (!node) return new AVLNode(task);

        if (task.id < node.task.id) {
            node.left = this.insertNode(node.left, task);
        } else if (task.id > node.task.id) {
            node.right = this.insertNode(node.right, task);
        } else {
            return node;
        }

        this.updateHeight(node);
        return this.balance(node);
    }

    balance(node) {
        const balance = this.getBalance(node);

        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }

        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    search(id) {
        return this.searchNode(this.root, id);
    }

    searchNode(node, id) {
        if (!node) return null;
        
        if (id === node.task.id) return node.task;
        if (id < node.task.id) return this.searchNode(node.left, id);
        return this.searchNode(node.right, id);
    }
}
