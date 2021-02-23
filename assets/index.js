new Vue ({
    el: "#app",
    data:{
        money:{}
    },
    mounted(){
        this.getMoney();
    },
    computed: {
        formatMoney(){
            return Object.values(this.money);
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
            //console.log(response)
        });
        }
    },  
});