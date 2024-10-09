import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import Header from './Header';
export default function Producto (props) {
    return (
        <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
            <Header/>
            <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
                {/* <Text style={{ fontSize:30 }}>{props.route.params.objeto}</Text> */}
                <Text testID="detalle" style={{ fontSize:30 }}>{props.route.params.objeto.title}</Text>
                <Image style={{height: 150, width:300}} source={{uri: props.route.params.objeto.images[0]}}/>
                <Button
                testID='volver'
                onPress={() => props.navigation.goBack()}
                title="Volver"/>
            </View>
        </View>
    )
}