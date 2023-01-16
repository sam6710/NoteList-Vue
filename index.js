const {createApp} = Vue

createApp({
    data(){
        return{
            tareas: [],
            campoFiltro: "",
            texto: "",
            // filtroPorPrioridad: "",
        }
    },
    methods: {
        calcularTiempo(tarea){
            return Math.trunc(((Date.now() - tarea.date)/1000)/60);
        },
        añadirTarea(){
            let tarea = {
                contenido: this.texto,
                prioridad: 2,
                completado: false,
                date: Date.now()
            }
            this.tareas.push(tarea);
            this.texto="";+
            localStorage.setItem("tareas", JSON.stringify(this.tareas));
        },
        borrarNota(tarea){
            let index = this.tareas.indexOf(tarea);
            this.tareas.splice(index, 1);
            localStorage.setItem("tareas", JSON.stringify(this.tareas));
        },
        completarNota(tarea){
            tarea.completado = !tarea.completado;
            localStorage.setItem("tareas", JSON.stringify(this.tareas));
        },
        borrarCompletadas(){
            no_completadas = this.tareas.filter((tar) => tar.completado==false);
            this.tareas = no_completadas;
            localStorage.setItem("tareas", JSON.stringify(this.tareas));
        },
        cambiarPrioridad(tarea, prioridad){
            tarea.prioridad = prioridad;
            localStorage.setItem("tareas", JSON.stringify(this.tareas));
        }
    },
    computed: {
        tareasPendientes(){
            return this.tareas.filter((tar) => tar.completado==false).length;
        },
        totalTareas(){
            return this.tareas.length;
        },
        tareasFiltradas(){
            let arrayFilt = this.tareas.filter((tar) => tar.contenido.toLowerCase().includes(this.campoFiltro.toLowerCase()));
            return arrayFilt.sort(function(a, b){
              return b.prioridad - a.prioridad;
            });
        },
        // tareasFiltradasPorPrioridad(){
        //     if(this.filtroPorPrioridad)
        //         return this.tareas.filter((tar) => tar.prioridad == this.filtroPorPrioridad);
        //     else{
        //         return tareas;
        //     }
        // }
    },
    mounted(){
        if (localStorage.getItem('tareas')) {
            this.tareas = JSON.parse(localStorage.getItem('tareas'));
        }
    }
}).mount('#vue')