import React from "react";
import { useState } from "react";

// import Form from 'react-bootstrap/Form';
import { TextInput, Button, View, Text } from "react-native";

export default function Formulario(props){
    //estado del input
    const [textoFiltro, setFiltro] = useState();

    //Función que llama al setter
    function inputFiltroSet(valor){
        console.log("\n\nEl usuario ha introducido:"+valor);
        console.log("Se ha introducido (raw):"+valor);
        /*for (var i in valor){
            for (var j in valor[i]){
                for (var k in valor[i][j]){
                    console.log(i+" > "+j+" > "+k+" = "+valor[i][j][k]);
                }
            }
        }*/
        setFiltro(valor);
    }

    return(
        <View style={{margin: 5}} testID="formulario">
            <Text>Buscar</Text>
            <TextInput type="text" testID='filtro' value={textoFiltro} onChangeText={(e) => inputFiltroSet(e)} placeholder="Buscar Producto" style={{width: 200, borderColor: 'black', borderStyle: 'solid', borderWidth: 1}}></TextInput>
            <Button testID='buscador' onPress={() => props.busqueda(textoFiltro)} title="Buscar" />
        </View>
    );
}