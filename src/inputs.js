import React from "react";
import ReactModal from "react-modal";
import copy from 'copy-html-to-clipboard';
import { AnimatePresence, motion } from "framer-motion"
import './styles/inputs.css'
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
 

ReactModal.setAppElement('body');
//react transition es una funcionalidad de react que permite aplicar estilos css cuando el componente de react cambia, pero es un lio, framer motion hace lo mismo y sí la entiendo




//esta es la clase en la que generaremos los inputs, en esta clase necesitamos un array con los datos de qué inputs tiene cada cosa, también necesitamos ver qué elemento del radio tiene check,  luego debemos explorar ese array para generar los campos de texto, el nombre de la propiedad sería un label y el input será el value, cada uno de estos botones debe tener un metodo handle change, este método debe seleccionar la propiedad que está cambiando y actualizarla en el estado, el estado va a tener por defecto todos los datos necesarios aunque algunos estén vacíos

let arrayInputsEjemplo = [
    {
    id: 'libro',
    autor: '',
    Apellidos: '',
    autor1: '',
    Apellidos1: '',
    autor2: '',
    Apellidos2: '',
    titulo: '',
    año: '',
    editorial:''
},
{
    id: 'capituloLibro',
    autor: '',
    Apellidos: '',
    autor1: '',
    Apellidos1: '',
    autor2: '',
    Apellidos2: '',
    año: '',
    tituloCapitulo: '',
    editor:'',
    editorial:'',
    tituloLibro:'',
    paginas:''
},
{
    id: 'libroOnline',
    autor: '',
    Apellidos:'',
    autor1: '',
    Apellidos1: '',
    autor2: '',
    Apellidos2: '',
    titulo: '',
    año:'',
    url: ''
},
{
    id:'articulo',
    autor:'',
    Apellidos: '',
    autor1: '',
    Apellidos1: '',
    autor2: '',
    Apellidos2: '',
    año:'',
    tituloArticulo: '',
    tituloRevista:'',
    volumen:'',
    numero:'',
    paginas:'',
    url:''
},
{
    id: 'web',
    autor:'',
    Apellidos:'',
    autor1: '',
    Apellidos1: '',
    autor2: '',
    Apellidos2: '',
    titulo:'',
    fecha:'',
    nombreWeb:'',
    url:''
},
{
    id: 'periodico',
    autor:'',
    Apellidos:'',
    autor1: '',
    Apellidos1: '',
    autor2: '',
    Apellidos2: '',
    titulo:'',
    fecha:'',
    periodico: '',
    paginas:'',
    url:''

},
{
    id: 'tesis',
    autor:'',
    Apellidos:'',
    autor1: '',
    Apellidos1: '',
    autor2: '',
    Apellidos2: '',
    titulo:'',
    año: '',
    universidad:'',
    repositorio: '',
    url:''
},
{
    id:'congreso',
    autor:'',
    Apellidos: '',
    autor1: '',
    Apellidos1: '',
    autor2: '',
    Apellidos2: '',
    año:'',
    titulo:'',
    congreso:'',
    lugar:'',
    url:''
}

];

let id;
let autor;
let Apellidos;
let autor1;
let Apellidos1;
let autor2;
let Apellidos2;
let año;
let titulo;
let editorial;
let tituloCapitulo;
let editor;
let tituloLibro;
let paginas;
let url;
let tituloArticulo;
let tituloRevista;
let volumen;
let numero;
let nombreWeb;
let fecha;
let periodico;
let universidad;
let repositorio;
let congreso;
let lugar;

//la logica de esto, vamos a seleccionar todos los inputs que tienen el mismo nombre, luego vamos a almacenar el que tiene un check

let almacenaInputs= document.getElementsByName('tipoCita');

//añadimos un oyente para que cada vez que cambie llame a cambia selección

//variables para controlar ventana emergente
// let ModalState= false;

let output;//la salida final
let enElTexto;
let cuentaAutores= 0; //bandera para añadir autores;
let bibliografia = [];
class Inputs extends React.Component{
    constructor (props) {
        super (props);
        this.state = {
           ModalState: false
        }
        this.cambiaSeleccion = this.cambiaSeleccion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCita = this.handleCita.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.añadeAutores = this.añadeAutores.bind(this);
        this.cerrarModal =this.cerrarModal.bind(this);
        this.descargaBibliografia = this.descargaBibliografia.bind(this);
    }
    
    componentDidMount(){
        for( let i=0; i< almacenaInputs.length; i++ ){
            almacenaInputs[i].addEventListener('click', this.cambiaSeleccion);
        }
       
        //lo llamamos una primera vez para que de valores a los inputs 
        this.cambiaSeleccion();

       
    }
    

    
    //cambiamos el valor de chequeado, luego usaremos chequeado para elegir el valor del array con los botones 
    cambiaSeleccion(){
        let chequeado;
        let  arraycomprobado;
        let propiedad=[];
        
        //recorremos los botones, comprobamos cual está check, luego recorremos el array con los datos de qué inputs debe tener cada tipo de cita y cuando encontramos el que coincida con el id lo volcamos en array comprobado
        for(let i=0; i<almacenaInputs.length; i++ ){
        if(almacenaInputs[i].checked){
             chequeado = almacenaInputs[i];
             id = chequeado.id;
             for( i=0; i<arrayInputsEjemplo.length; i++){
                if(chequeado.id === arrayInputsEjemplo[i].id){
                    arraycomprobado = arrayInputsEjemplo[i];
                    //object keys te da las claves del objeto, ahora dentro del setstate hacemos un for y cada clave será una propiedad
                   let claves =Object.keys(arraycomprobado);
                   
                   for(let i=0; i<claves.length; i++){
                    var objetotemporal = claves[i];
                     propiedad.push( objetotemporal);
                     //metemos cada key en propiedad y luego pasaremos propiedad al estado
                }
                }
            }
        }
    }
    this.setState({
        propiedad
        
    });
    let vaciaInputs = document.querySelectorAll('input');

        vaciaInputs.forEach(input => {
            input.value= '';
        });
    }
   

    handleCopy(e){
        let copia1 = document.getElementById("salida");
        let copia =copia1.innerHTML;
        let lista = '<ul> ';
        //le metemos ul porque innerhtml se lo deja fuera
        let copiaOverlay = document.getElementById("outputBibliografia");
        let biblioSalida = copiaOverlay.innerHTML;
        biblioSalida = lista+ biblioSalida+ '</ul>';
        
        //vamos a quitar la parte de la bibliografia
         let indice = copia.indexOf(':');
        let copiaCortada = copia.slice(indice+1);
        //como tenemos que procesar las cursivas el copiar es un poco más complejo porque hay que crear clipboards item y decirle que es texto html

        console.log(biblioSalida)

        if(e.target.id=='copiaBibliografia'){
            copy(biblioSalida, {asHtml: true});
        }else{
        //esto es de la libreria copy html, tanta vuelta y mareos y al final hubo que tirar de ahí
        copy(copiaCortada, {asHtml: true})
        }
    }
   
    descargaBibliografia(){

        //primero vamos a hacer una prueba descargando un archivo normal, por lo que veo los pasos son almacenar el texto en una variable, crear un objeto blob diciendole el tipo y pasando la variable como argumento y luego llamar a saveas
        //voy a dejar ese comentario porque puede ser util hacerlo de esa manera si algun dia me hace falta pero en react no funciona porque saveas es un metodo que va desde el documento

        let archivo = document.getElementById("outputBibliografia");
        let archivoDescarga = archivo.innerHTML;

        //la versión de react para generar archivos es más lio y tiene más pasos

        //1. pasar los datos a texto, suponiendo que no lo sean
        let probando = "probando probando";

        //2. crear un objeto blob con ese texto y el tipo texto plano
        const blobesponja = new Blob ([archivoDescarga], {type: "text/html"});

        //3. Crear una url con ese blob, segun la documentación es una url que representa al objeto

        const url = URL.createObjectURL(blobesponja);

        const link = document.createElement("a");

        //4. le decimos que el href es la url y con download el nombre y tipo de archivo
        link.download = "prueba.doc";
        link.href = url;

        //5. como el link apunta no a una web sino a un objeto blob pinchar en el enlace lo descarga, supongo que es lo que hacen los enlaces estos que te salen de los pdfs le das y te lo descargan, enlazan a archivos, en este caso generado con blob, no a paginas web.
        //pinchamos en el enlace
        link.click();
    }

    handleChange(event){
        //aver, todos disparan este evento entonces lo suyo sería crear un bucle que cree una variable por cada elemento y le meta ahí el contenido del input


       
        //vamos a almacenar el state en una variable y operamos con ella
        const valoresActuales = this.state.propiedad;
        //aver si conseguimos iterar valores y crear una variable para cada valor

        const objetoDePrueba={}
       
        valoresActuales.forEach(function(elemento, indice){
            objetoDePrueba[elemento] = '';
        });
       

        let fuente= event.target.id;
        let valor = event.target.value;
        


        //esta función la he cogido de stackoverflow, permite asignar cosas que están como array a formato objeto clave valor
        function setData(key,val,obj) {
            if (!obj) obj = estado; //outside (non-recursive) call, use "data" as our base object
            var ka = key.split(/\./); //split the key by the dots
            if (ka.length < 2) { 
              obj[ka[0]] = val; //only one part (no dots) in key, just set value
            } else {
              if (!obj[ka[0]]) obj[ka[0]] = {}; //create our "new" base obj if it doesn't exist
              obj = obj[ka.shift()]; //remove the new "base" obj from string array, and hold actual object for recursive call
              setData(ka.join("."),val,obj); //join the remaining parts back up with dots, and recursively set data on our new "base" obj
            }    
          }
        const estado = Object.assign( this.state);
        
        setData(fuente, valor, estado);
        
        this.setState(estado);
        
        
        
        
        //vale ya actualiza el state según lo que metas ahora lo siguiente sería crear una variable con cada prop del state, quizá no sea lo más dinámico pero podría hacerse a mano creando variables de más
        //he metido el event para ver la fuente que dispara el evento y con eso seleccionamos qué actualizar
         //harcoding variables
           
            autor = this.state.autor;
            Apellidos = this.state.Apellidos;
            autor1 =this.state.autor1;
            Apellidos1 = this.state.Apellidos1;
            autor2 =this.state.autor2;
            Apellidos2 = this.state.Apellidos2;
            año = this.state.año;
            titulo= this.state.titulo;
            editorial= this.state.editorial;
            tituloCapitulo=this.state.tituloCapitulo;
            editor = this.state.editor;
            tituloLibro = this.state.tituloLibro;
            paginas = this.state.paginas;
            url = this.state.url;
            tituloArticulo = this.state.tituloArticulo;
            tituloRevista= this.state.tituloRevista;
            volumen =this.state.volumen;
            numero =this.state.numero;
            nombreWeb =this.state.nombreWeb;
            fecha = this.state.fecha;
            periodico = this.state.periodico;
            universidad =this.state.universidad;
            repositorio = this.state.repositorio;
            congreso =this.state.congreso;
            lugar =this.state.lugar;
          

        

    }

    handleCita(){
        //okey vamos a hacer un switch en base al id para cargar una cosa u otra
        let nombreProcesado;
        //RESULTADOS FINALES:
        //-Iniciales procesadas para el nombre
        //-Apellidos Procesados para los Apellidos
        //vamos a meter todo el output de nombres en la misma variable para gestionar cuando hay más de un autor
        //esta será la salida final


        //variables para evitar not defined
        let inicial1=[];
        let indiceEspacio1;
            let Apellidosprocesar1 = Apellidos1;
            let ApellidosProcesados1;
            let inicialesProcesadas1='';
            let primerApellido1;
            let segundoApellido1;
            let inicial2=[];
            let indiceEspacio2;
            let Apellidosprocesar2 = Apellidos2;
            let ApellidosProcesados2;
            let inicialesProcesadas2='';
            let primerApellido2;
            let segundoApellido2;
        //voy a sacar aquí nombre y Apellidos porque es comun a todos y me ahorro reusarlo
            let inicial=[];
            if(autor != null){
            autor.trim(); //quitamos los espacios que pueda haber
            
            let iniciales = autor.split(' ')
            if (iniciales.length > 0){
                for(let i=0; i< iniciales.length; i++){
                   let recortado = iniciales[i];
                   let recortado1 =recortado.split('');
                   inicial.push(recortado1[0])
                }
            }else{
             inicial= iniciales[0];
            }}
            
            
            let inicialesProcesadas='';
            for(let i=0; i<inicial.length;i++){
                inicialesProcesadas += inicial[i].toString() + '. '
            }
            inicialesProcesadas= inicialesProcesadas.toUpperCase();
            //Apellidos
            let indiceEspacio;
            let Apellidosprocesar = Apellidos;
            let ApellidosProcesados;
            if(Apellidos !== undefined){
            if(Apellidosprocesar.indexOf(' ') != -1){
            indiceEspacio= Apellidosprocesar.indexOf(' ');
            let primerApellido = Apellidosprocesar.slice(0, indiceEspacio);
            let segundoApellido = Apellidosprocesar.slice(indiceEspacio+1);
            primerApellido= primerApellido[0].toUpperCase()+ primerApellido.substring(1);
            segundoApellido= segundoApellido[0].toUpperCase()+ segundoApellido.substring(1);
             ApellidosProcesados = primerApellido + ' ' +segundoApellido;
            }else {
                 ApellidosProcesados = Apellidosprocesar[0].toUpperCase() + Apellidosprocesar.substring(1);
            }}

            if(cuentaAutores !=0){
                //repetimos con el primer autor y el segundo, se viene copia pega
                //INICIALES PRIMER AUTOR
               
            if(autor1 != null){
            autor1.trim(); //quitamos los espacios que pueda haber
            
            let iniciales1 = autor1.split(' ')
            if (iniciales1.length > 0){
                for(let i=0; i< iniciales1.length; i++){
                   let recortado1 = iniciales1[i];
                   let recortado2 =recortado1.split('');
                   inicial1.push(recortado2[0])
                }
            }else{
             inicial1= iniciales1[0];
            }}
            
            
            
            for(let i=0; i<inicial1.length;i++){
                inicialesProcesadas1 += inicial1[i].toString() + '. '
            }
            inicialesProcesadas1= inicialesProcesadas1.toUpperCase();
            //Apellidos
            
            if(Apellidos1 !== undefined){
            if(Apellidosprocesar1.indexOf(' ') != -1){
            indiceEspacio1= Apellidosprocesar1.indexOf(' ');
             primerApellido1 = Apellidosprocesar1.slice(0, indiceEspacio1);
             segundoApellido1 = Apellidosprocesar1.slice(indiceEspacio1+1);
            primerApellido1= primerApellido1[0].toUpperCase()+ primerApellido1.substring(1);
            segundoApellido1= segundoApellido1[0].toUpperCase()+ segundoApellido1.substring(1);
             ApellidosProcesados1 = primerApellido1 + ' ' +segundoApellido1;
            }else {
                 ApellidosProcesados1 = Apellidosprocesar1[0].toUpperCase() + Apellidosprocesar1.substring(1);
            }}
            console.log(inicialesProcesadas1 + ' '+ApellidosProcesados1)

//---------------------------SEGUNDO AUTOR-------------
if(autor2 != null){
    autor2.trim(); //quitamos los espacios que pueda haber
    
    let iniciales2 = autor2.split(' ')
    if (iniciales2.length > 0){
        for(let i=0; i< iniciales2.length; i++){
           let recortado2 = iniciales2[i];
           let recortado3 =recortado2.split('');
           inicial2.push(recortado3[0])
        }
    }else{
     inicial2= iniciales2[0];
    }}
    
    
    
    for(let i=0; i<inicial2.length;i++){
        inicialesProcesadas2 += inicial2[i].toString() + '. '
    }
    inicialesProcesadas2= inicialesProcesadas2.toUpperCase();
    //Apellidos
    
    if(Apellidos2 !== undefined){
    if(Apellidosprocesar2.indexOf(' ') != -1){
    indiceEspacio2= Apellidosprocesar2.indexOf(' ');
     primerApellido2 = Apellidosprocesar2.slice(0, indiceEspacio2);
     segundoApellido2 = Apellidosprocesar2.slice(indiceEspacio2+1);
    primerApellido2= primerApellido2[0].toUpperCase()+ primerApellido2.substring(1);
    segundoApellido2= segundoApellido2[0].toUpperCase()+ segundoApellido2.substring(1);
     ApellidosProcesados2 = primerApellido2 + ' ' +segundoApellido2;
    }else {
         ApellidosProcesados2 = Apellidosprocesar2[0].toUpperCase() + Apellidosprocesar2.substring(1);
    }}
    console.log(inicialesProcesadas2 + ' '+ApellidosProcesados2)


            }

            




            let nombreFinal;
            let enElTextoFinal;
            //SALIDA FINAL
            if(cuentaAutores ==0){
             nombreFinal = ApellidosProcesados + ', '+ inicialesProcesadas;
            enElTextoFinal= ApellidosProcesados;
        }else if (cuentaAutores==1){
             nombreFinal = ApellidosProcesados + ', '+ inicialesProcesadas + ', '+ ApellidosProcesados1+', '+ inicialesProcesadas1;
             enElTexto = ApellidosProcesados +' y '+ApellidosProcesados1;
        }else if(cuentaAutores ==2){
            nombreFinal = ApellidosProcesados + ', '+ inicialesProcesadas + ', '+ ApellidosProcesados1+', '+ inicialesProcesadas1 + ' y ' +ApellidosProcesados2+', '+ inicialesProcesadas2;
            enElTextoFinal = ApellidosProcesados +' et al.'
        }
            console.log(nombreFinal)
           
//-------SWITCH CON LAS OPCIONES DE CITA PARA EL FORMATO---  

        switch(id){
            case 'libro': 
            
            output = 'En la bibliografía: '+ nombreFinal+ '('+ año + ') ' + '<i>'+titulo+'</i> ' + '. '+ editorial;
            
            enElTexto = 'En el texto: ('+ enElTextoFinal + ', ' + año+ ')';
            this.setState({
                output,
                enElTexto
            });
            break;

            case 'capituloLibro':
                //vamos a procesar el editor para sacar el nombre y el apellido
                let datosEditor =editor;
                let editorProcesado;
                if(datosEditor.indexOf(' ') !==-1 && datosEditor !==undefined){
                let indice = datosEditor.indexOf(' ');
                let nombreEditor = datosEditor.slice(0, indice);
                nombreEditor = nombreEditor[0].toUpperCase() 
                let apellidoEditor= datosEditor.slice(indice+1);
                apellidoEditor = apellidoEditor[0].toUpperCase()+ apellidoEditor.substring(1);
                 editorProcesado = nombreEditor + '. '+ apellidoEditor;
               
                }else {
                     editorProcesado = datosEditor[0].toUpperCase()+ '.' ;
                }
                
             output = 'En la bibliografía: '+ nombreFinal + ' ( '+ año+ '). '+ tituloCapitulo +'. <strong>En </strong> ' + editorProcesado + ' <strong>(Ed.),</strong> ' + '<i>'+ tituloLibro + '</i> ' + '( '+ paginas + '). '+ editorial +'.'

             enElTexto = 'En el texto: ('+enElTextoFinal  +  ', '+ año +')'
             this.setState({
                output,
                enElTexto
            });

            break;

            //-----LIBRO ONLINE-----
            case 'libroOnline':
            
            output = 'En la bibliografía: '+ nombreFinal + ' ('+ año+ ') '+ '<i>'+titulo + '</i> ;'+ 'recuperado de: '+ url ;
            enElTexto = 'En el texto: ('+enElTextoFinal  +  ', '+ año +')';

            this.setState({
                output,
                enElTexto
            });
            break;

            //------------PAPER---------------
            case 'articulo':
            
            output = 'En la bibliografía: '+ nombreFinal +' ('+ año +'). '+ tituloArticulo + '. '+ '<i> '+tituloRevista+'</i>, '+volumen +' ('+ numero + '), '+ paginas +'. DOI: '+ url;
            enElTexto = 'En el texto: ('+enElTextoFinal  +  ', '+ año +')';

            this.setState({
                output,
                enElTexto
            });

            break;

            //-----------WEB----------------
            case 'web': 

            output = 'En la bibliografía: '+ nombreFinal + ' ('+fecha + '). '+titulo+ '. <i> '+nombreWeb +' </i>. '+ 'recuperado de: '+url;
            enElTexto = 'En el texto: ('+enElTextoFinal  +  ', '+ fecha +')';

            this.setState({
                output,
                enElTexto
            })
            
            break;

            //-----------------PERIODICO-------------------
            case 'periodico':
            output = 'En la bibliografia: '+nombreFinal + ' ('+ fecha+').'+ titulo+ '. <i> '+periodico+ ' </i>. Recuperado de: ' +url;
            enElTexto = 'En el texto: ('+enElTextoFinal  +  ', '+ fecha +')';

            this.setState({
                output,
                enElTexto
            })
            break;

            //---------------TESIS DOCTORAL---------------
            case 'tesis':

            output = 'En la bibliografía: '+ nombreFinal+' ('+ año+' ).  <i>' +titulo+ '</i> [<strong>Tesis doctoral</strong>, '+universidad+' ]. '+ repositorio+ '. Recuperado de: ' + url;
            
            enElTexto = 'En el texto: ('+enElTextoFinal  +  ', '+ año +')';

            this.setState({
                output,
                enElTexto
            });
            break;

            //---------------CONGRESO-------------
            case 'congreso': 
            
            output = 'En la bibliografía: '+nombreFinal+' ( '+año+ ' ). <i> '+ titulo+' </i>[Comunicación en congreso]. ' + congreso+', '+ lugar+'. Recuperado de: '+ url;

            enElTexto = 'En el texto: ('+enElTextoFinal  +  ', '+ año +')';

            this.setState({
                output,
                enElTexto
            })
            break;
            
        }
        //-------------------FIN DEL SWITCH--------------------
        //he añadido lo de vaciar inputs porque así si cambias de elemento no te mantiene datos de lo que citaste antes
        let vaciaInputs = document.querySelectorAll('input');

        //CODIGO PARA IR ALMACENANDO TODO EN UNA BIBLIOGRAFÍA APARTE
        let indiceBibliografia = output.indexOf(':');
        let outputBibliografia = output.slice(indiceBibliografia+1);
        
        bibliografia.push(outputBibliografia);
        bibliografia.sort();
        console.log(bibliografia)
        //vaciamos numero autores 

        
        vaciaInputs.forEach(input => {
            input.value= '';
        });
        cuentaAutores=0;

        //queremos darle la clase que borra los campos de autores al darle al botón de citar
        let alterarautor1 = document.getElementsByName('autor1'); 
            let alterarapellido1 = document.getElementsByName('Apellidos1'); 
            let alterarautor2 = document.getElementsByName('autor2'); 
            let alterarapellido2 = document.getElementsByName('Apellidos2'); 
           
           
            alterarautor1[0].classList.add('autoresExtra');
            alterarapellido1[0].classList.add('autoresExtra');
            alterarautor2[0].classList.add('autoresExtra');
            alterarapellido2[0].classList.add('autoresExtra');
       
    }

    añadeAutores(e){
        cuentaAutores +=1;
        if( cuentaAutores>0 &&cuentaAutores<=3){
       
        let alterarautor = document.getElementsByName('autor'+cuentaAutores); 
        let alterarapellido = document.getElementsByName('Apellidos'+cuentaAutores); 
       
       
        alterarautor[0].classList.remove('autoresExtra');
        alterarautor[0].classList.add('entrar');
        alterarapellido[0].classList.remove('autoresExtra');
        alterarapellido[0].classList.add('entrar');
      
        }
    }

    cerrarModal(){
        if(this.state.ModalState==false){
       this.setState({
        ModalState: true
       })
    }else{
        this.setState({
            ModalState: false
           })
    }
        //solo cambiamos el valor del modal para abrir o cerrar
    }

    

    render () {
        
       const textos = this.state.propiedad;
       
       //cuando cambia el estado cambia eso y también textos así que se reprocesa
       let textoArray=[];
       let placeholder;
       let salida;
       let copiar;

       let arrayBibliografia=[]; //aquí metemos los li de cada elemento de la bibliografia

       if(bibliografia != undefined){
        for(let i= 0; i<bibliografia.length;i++){
            arrayBibliografia.push(
                <li dangerouslySetInnerHTML={{__html: bibliografia[i]}}></li>
            )
        }
       }
       
       if(output == undefined){
        salida='';
        copiar='copiar'
       }else{
        salida ='salida';
        copiar = 'copiarBueno'
       }
       
       
       
       //la primera vez que carga está vacío por eso el if, para que no salte error
       if(textos !== undefined){
       
       
        for(let i=0; i<textos.length; i++){
            if(textos[i] !== 'id'){
            
            switch(textos[i]){
                case 'tituloCapitulo': 
                placeholder = 'titulo del capitulo';
                break;
                case 'tituloLibro': placeholder = 'titulo del libro';
                break;
                case 'tituloArticulo': placeholder= 'titulo del paper';
                break;
                case 'tituloRevista': placeholder= 'titulo de la revista';
                break;
                case 'nombreWeb': placeholder= 'nombre de la web';
                break;

                default: placeholder = textos[i];
                break;
            }
            if (textos[i]== 'Apellidos'){
                textoArray.push(
                    <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity: 1}}
                    name={textos[i]}

                     key={textos[i]}>
                    
                         <label htmlFor={textos[i]}>{placeholder} :</label>
                        <input id={textos[i]} key={"div"+ i} placeholder=  {' '+placeholder} onChange={this.handleChange}></input>

                        <button id='añadeAutores' title="pulsa para añadir un autor" onClick={this.añadeAutores}><i className="fa-solid fa-plus"></i></button>
                        </motion.div>)
            }else if (textos[i]== 'Apellidos1' || textos[i]== 'autor1' || textos[i]== 'Apellidos2' ||textos[i]== 'autor2') {
                textoArray.push(
                    <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity: 1}}
                    className="autoresExtra"
                    name={textos[i]}
                     key={textos[i]}>
                    
                         <label htmlFor={textos[i]}>{placeholder} :</label>
                        <input id={textos[i]} key={"div"+ i} placeholder=  {' '+placeholder} onChange={this.handleChange}></input>
                        
                        </motion.div>)

            
            }else{
                textoArray.push(
                    <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity: 1}}
                    name={textos[i]}
                     key={textos[i]}>
                    
                         <label htmlFor={textos[i]}>{placeholder} :</label>
                        <input id={textos[i]} key={"div"+ i} placeholder=  {' '+placeholder} onChange={this.handleChange}></input>
                        
                        </motion.div>)
            }
            }
    }
        
        return (
            <div className="inputs-componente">
                
                <motion.div
                initial= {{opacity:0}}
                animate={{opacity:1}}
                className="motion-wrap-inputs"
                >
                <div id="grupo-inputs">
                <AnimatePresence>
               {textoArray}
               </AnimatePresence>
              
                
                
                </div>
                <button type="submit" onClick={this.handleCita} id='boton-cita' >Cítame Esta</button>
                </motion.div>
                
                
                <div className={salida}>
                    <button id={copiar} onClick={this.handleCopy} title="Copiar cita">
                    <i className="fa-solid fa-copy" ></i></button>
            <h1 id="salida" dangerouslySetInnerHTML={{__html: this.state.output}}></h1>
            <h2 id="salidaCitaTexto">{enElTexto}</h2>
            </div>
            <button onClick={this.cerrarModal} id="tuBibliografia">Tu bibliografia</button>
            <ReactModal 
            isOpen={this.state.ModalState}
            onRequestClose={this.cerrarModal}
            ClassName="modalTamaño"
            overlayClassName="Overlay"
            preventScroll="false"
           
            ><h1>Tu bibliografia</h1>
            <ul id="outputBibliografia">
                {arrayBibliografia}
            </ul>
            
            <button id="copiaBibliografia"
            onClick={this.handleCopy}>Copiar bibliografia</button>
            <button id="descargaBibliografia"
            onClick={this.descargaBibliografia}>Descargar bibliografia</button>
            </ReactModal>
            </div>
           
        )
    }
}}

export default Inputs;