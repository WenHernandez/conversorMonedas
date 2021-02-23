new Vue ({
    el: "#app",
    data:{
        money: {},
        amount: 0,
        from: 'EUR',
        to: 'USD',
        result: 0
    },
    mounted(){
        this.getMoney();
    },
    computed: {
        formatMoney(){
            return Object.values(this.money);
        },
        calculateResult(){
            return(Number(this.amount) * this.result).toFixed(2);
        },
        disabled(){
            return this.amount === 0 || !this.amount;
        }
    },
    methods: {
        getMoney(){
            const money = localStorage.getItem("money")

            if (money){
                this.money = JSON.parse(money)
                return;
            }

            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=do-not-use-this-key')
            .then( response => {
                this.money = response.data.results;
                localStorage.setItem('money' , JSON.stringify(response.data.results));
            });
        },
        convertMoney(){
            const search = `${this.from}_${this.to}`;
            axios.get(`https://free.currconv.com/api/v7/convert?q=${search}&apiKey=do-not-use-this-key`)
            .then((response) => {
                console.log(response);
                this.result = response.data.results[search].val;
            });
        }
    },
    
    watch:{
        from(){
            this.result = 0;
        },
        to(){
            this.result = 0;
        }
    }
});