class Serie extends Array {
    constructor(...args) {
        super(...args);
    }

    distinct() {
        return Serie.from(new Set(this));
    }

    unique() {
        return this.distinct();
    }

    countValues() {
        const counts = {};
        this.forEach(item => {
            counts[item] = (counts[item] || 0) + 1;
        });
        return counts;
    }
}

export default Serie;
