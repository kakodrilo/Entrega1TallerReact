import "./styles.css"
import axios from "axios" 

if (module.hot) {
    module.hot.accept()
}


/*
Función 

*/
function formato(x,n,a){
    letra = x.replace(/\n/g,"<br>")
    return `<p class="title">${n}</p>
            <p class="subtitle">${a}</p>
            <p class="">${letra}</p>`
}

function SinLetra(){
    return `<h1 class="subtitle is-3">Letra no Encontrada</h1>`
}


function obtener(){
    let a = (document.querySelector("#nombre").value).toLowerCase()
    let b = (document.querySelector("#artista").value).toLowerCase()
    let str = "https://private-anon-dcfdc333f4-lyricsovh.apiary-proxy.com/v1/"+b+"/"+a
    return str
}

function MaysPrimera(string){
    let arreglo = []
    let posicion = 0
    string.split(" ").forEach(x => {
        arreglo[posicion] = x.charAt(0).toUpperCase() + x.slice(1)
        posicion += 1
    });
    string = ""
    arreglo.forEach(x => {
        string += x + " "
    });
    return string;
}



document.querySelector("#boton").addEventListener('click', () => {
    let str = obtener()
    let a = document.querySelector("#letra")
    let titulo = (document.querySelector("#nombre").value).toLowerCase()
    let artista = (document.querySelector("#artista").value).toLowerCase()
    titulo = MaysPrimera(titulo)
    artista = MaysPrimera(artista)
    axios.get(str).then((res) => {
        let letra = res.data.lyrics
        a.innerHTML = formato(letra,titulo,artista)
    }).catch((error) => {
        a.innerHTML = SinLetra()
    })
})