import { Text, Image, View } from 'react-native';

export default function Header(){
    return(
        <View testID='cabecera' style={{backgroundColor: '#282c34',
          minHeight: '1vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: 'white',
          flexWrap: 'nowrap',}}>
            {/*Contenido de Header*/}
            <Image source={require('../assets/sun.png')} testID='logo' />
            <Text style={{color: 'white'}} testID='mensaje'>Bienvenido a la App de Álvaro Sánchez Martínez</Text>
        </View>
    );
}