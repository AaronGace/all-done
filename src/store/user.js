import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    logined: false,
  }),

  actions: {
    async loginCheck() {
      this.logined = true
    },
  },
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // function ola(var1){
    //     console.log(var1);
    // }
    // supabase.from('user').select('*')
    //     .then(response => {
    //         ola(response.data)
    //         console.log("log",response.data)
    //     })
    //     .catch(error => {
    //         console.log(error.response)
    //     });

    //     console.log(ola)