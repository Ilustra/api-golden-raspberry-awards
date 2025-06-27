 class ProducerAnalyzer {

    constructor(producers){
        this.producers = producers;
        this.producerYears = {}
        this.intervals = []
    }
    
    moviesWithSplitListProducers  =(movie)=>{
        return movie.producers
        .split(/\s*(?:,| and )\s*/i)
        .filter(p => p !== 'and' && p !== ',' && p.trim() !== '')
        .map(producer =>({year: movie.year, name: producer.trim()}))
    }
    groupProducers(){
        this.producers.forEach(({year, name}) => {
            if(!this.producerYears[name]){
                this.producerYears[name] = [];
            }
            this.producerYears[name].push(year);
        })
        for (let name in this.producerYears) {
            this.producerYears[name].sort((a, b) => a - b);
        }

        return this;
    }

    calculateIntervals(){
        for(const producer in this.producerYears){
        const years = this.producerYears[producer]
            for(let i =1; i < years.length; i++){
                this.intervals.push({
                    producer: producer,
                    interval: years[i] - years[i -1],
                    previousWin: years[i-1],
                    followingWin: years[i]
                })
            }
        }
        return this;
    }
    minMaxWinner(){
        const minVal = Math.min(...this.intervals.map(i => i.interval));
        const maxVal = Math.max(...this.intervals.map(i => i.interval));
        return {
            min: this.intervals.filter(i => i.interval === minVal),
            max: this.intervals.filter(i => i.interval === maxVal)
        }
    }
}

module.exports = ProducerAnalyzer;