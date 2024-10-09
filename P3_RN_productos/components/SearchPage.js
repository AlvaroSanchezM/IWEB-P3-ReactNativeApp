import React from 'react';
import { View, Button, Text, Image, FlatList } from 'react-native';
import Header from './Header';
import Formulario from './Formulario';
//import Lista from './Lista';
import CONFIG from './config/config';
import { mockdata } from './constants/products';
//importaciones para Módulo de lista_de_productos
import { useState, useEffect } from 'react';
//import { waitFor } from '@testing-library/react-native';

export default function SearchPage (props) {
    //MÓDULO DE PRUEBAS BÁSICAS
    /*const producto = mockdata.products[0];//{title: 'Iphone2Prueba', images: "https://dummyjson.com/image/i/products/1/thumbnail.jpg"};
    function logConfig(){
        console.log("use_server="+CONFIG.use_server);
    }
    function buscar(input){
        console.log("se ha buscado:"+input);
    }*/
    //MÓDULO DE LISTA_DE_PRODUCTOS
    //guarda los datos de los productos
    const [allProducts, setProducts] = useState(props.theproducts);
    //indica que termina de cargar cuando se pone a true
    const [finishLoading, setLoadEnd] = useState(props.theproducts);
    //--- --- --- --- --- --- USE-EFFECT
    useEffect(() => {
        //definir función fetch
        async function callServer(){
            try {
                const response = await fetch(CONFIG.server_url);
                const datos = await response.json();
                console.log("Datos devueltos del servidor:"+datos);
                ponerProducts(datos);
                if (response.status === 200){
                    // se ha devuelto un 200 OK
                    // setHayErrores();
                }else{
                    //se ha devuelto un error por parte de la API
                    // setHayErrores(true);
                }
            } catch (error) {
                //alert("No se ha podido conectar con el servidor");
                console.log("No se pudo conectar, Error:"+error);
            }
        }
        //Función setter de allProducts y finishLoading
        function ponerProducts(){//llamada a setLoadEnd y setProducts
            //console.log("El objeto puesto es:"+ objetos.PropertyName);
            //console.log("Los products puestos son:"+ objetos.products.PropertyName);
            //for (var i in objetos){
            //  console.log(i+"="+objetos[i]);
            //}
            //SOBRE LA FORMA DE RECIBIR LOS PRODUCTOS
            //TRATAMIENTO DEL ATRIBUTO theproducts
            
            if (props.theproducts === null || props.theproducts === undefined){
                console.log("props.theproducts="+props.theproducts);
                setProducts(mockdata.products);
                setLista(mockdata.products);
            }else{
                console.log("props.theproducts: is not null or undefined");
                setProducts(props.theproducts);
                setLista(props.theproducts);
                console.log("Tipo="+typeof(props.theproducts));
            }
            //waitFor(allProducts !== undefined);
            //console.log("JSON-AllProducts="+JSON.stringify(allProducts));
            console.log("Ha acabado la carga");
            setLoadEnd(true);
        }
        //usar servidor con fetch y timeout o usar mockdata
        const id = setTimeout(() => {
            props.theproducts === null || undefined ? console.log("Calling Server="+CONFIG.use_server) : null;
            CONFIG.use_server ? callServer() : ponerProducts();
        }, CONFIG.loading_timeout_ms);
        return () => {
            clearTimeout(id);
        }
    }, []);//FIN de USE-EFFECT
    
    //MÓDULO DE FILTRADO DEL FORMULARIO
    const [listaDeObjetos, setLista] = useState();//indica los productos que se muestran en las tarjetas
    //Función Setter
    function modificaLista(modo, palClave){//llamada a setLista
        console.log("Se quiere modificar con modo:"+modo+", clave:\""+palClave+"\"");
        if (modo === "buscar"){ //palClave es un String
            //pillar todos los elems de listaOriginal que contengan "palClave" en el título
            let listaIds1 = "";
            for (var i in allProducts){
                let id = allProducts[i].id;
                listaIds1 = listaIds1 + id + ", ";
            }
            console.log("allProducts' IDs="+listaIds1+"\n\npalClave=\""+palClave.toString()+"\"");
            const nuevaLista = allProducts.filter((objeto) => {
                //console.log("objeto.title="+objeto.title);
                //console.log("palClave="+palClave.toString());
                return(
                    objeto.title.toLowerCase().includes(palClave.toLowerCase())
                );
            });
            if (nuevaLista === allProducts){
                console.log("No se ha filtrado adecuadamente o se buscó: \"\"")
            }else{
                let listaIds = "";
                for (var i in nuevaLista){
                    let id = nuevaLista[i].id;
                    listaIds = listaIds + id + ", ";
                }
                console.log("ListaFiltrada's IDs: "+listaIds);
            }
            //establecer esa lista de objetos como la nueva lista
            setLista(nuevaLista);
            //console.log("listaDeObjetos= "+JSON.stringify(listaDeObjetos));

        }
    }
    //Función aux de búsqueda
    function buscar(texto){//función de filtro o búsqueda
        console.log("Se busca (raw):\""+texto+"\"; Tipo:"+typeof(texto));
        //eliminar de listaDeObjetos los objetos que no contengan "texto" en su título
        modificaLista("buscar", texto)
    }
    //Función que nos dice qué item se ha pedido abrir
    /*function verProducto(producto){
        console.log("Ver Producto item_"+producto.id);
        props.navigation.navigate('Product', {objeto: producto});
    }*/
    
    //Configuración de Visibilidad de la FlatList
    const initialNumToRender = 40;
      
    return (
        <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
            <Header/>
            <Text testID="catalogo" style={{ fontSize:30 }}>Catálogo de productos</Text>
            <Formulario busqueda={buscar}/> 
            <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
                {finishLoading ? /*<Lista objetosDeLaLista={listaDeObjetos} navigate={props.navigation.navigate}/>*/
                <FlatList
                /*data={DATA}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor={item => item.id}*/
                //const numColumns = 2;
                data={listaDeObjetos}
                renderItem={({item}) => {
                    return(
                        <View testID={"item_"+item.id} style={{flex: 1, margin: 5}}>
                            <Image style={{height: 100, width:200}} source={{uri: item.images[0]}}/>
                            <Text testID={"title_"+item.id}>{"Id"+item.id+"Title:"+item.title}</Text>
                            <Button
                            testID={"button_"+item.id}
                            onPress={() => props.navigation.navigate('Product', {objeto: item})}
                            title="Ver el Producto"/>
                        </View>
                    );
                }}
                keyExtractor={item => item.id}
                initialNumToRender={initialNumToRender}
                //numColumns={numColumns}
                /> : <Image testID='loading' source={require('../assets/spinner.gif')}/>}
            </View>
        </View>
    )
}