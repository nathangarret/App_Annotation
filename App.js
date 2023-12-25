import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [ estado, useEstado ] = useState('leitura');
  const [ annotation, setAnnotation ] = useState('');

  useEffect(() => {

    (async () => {
      try {
        const annotationRead = await AsyncStorage.getItem('annotation');
        setAnnotation(annotationRead);
      } catch (error) {
        alert(error);
      }
    })();

  }, []);

  const setData = async () => {
    try {
      await AsyncStorage.setItem('annotation', annotation);
    } catch (error) {
      alert(error);
    }
    alert('Anotação salva com sucesso!');
  }

  const atualizarTexto = () => {
    useEstado('leitura');
    setData();
  }

  if (estado == 'leitura') {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ color: 'white', fontSize: 28 }}>Aplicativo Anotação</Text>
        </View>

        <View style={{ padding: 20 }}>
          <Text style={styles.anotacaoTitle}>Anotações:</Text>
        </View>
        {
          (annotation != '')
            ?
            <View>
              <Text style={styles.anotacao}>{annotation}</Text>
            </View>
            :
            <View>
              <Text style={{ fontSize: 18, opacity: 0.4, padding: 20 }}>Não possui anotações :(</Text>
            </View>
        }
        <TouchableOpacity onPress={() => { useEstado('atualizando') }} style={styles.btnSetAnnotation}>
          {
            (annotation == "")
              ?
              <Text style={styles.btnSetAnnotationText}>+</Text>
              :
              <Text style={styles.btnSetAnnotationSave}>Editar</Text>
          }
        </TouchableOpacity>
      </View>
    );
  } else if (estado == 'atualizando') {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ color: 'white', fontSize: 28 }}>Aplicativo Anotação</Text>
        </View>

        <TextInput autoFocus={true} style={styles.anotacaoAtualizando} onChangeText={(text) => setAnnotation(text)} multiline={true} numberOfLines={5} placeholder='Digite aqui a sua anotação...' value={annotation}></TextInput>

        <TouchableOpacity onPress={() => { atualizarTexto() }} style={styles.btnSetAnnotation}>
          <Text style={styles.btnSetAnnotationSave}>Salvar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  header: {
    paddingTop: 64,
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#069',
    width: '100%',
  },

  anotacaoTitle: {
    fontSize: 26,
  },

  anotacao: {
    fontSize: 18,
    padding: 20
  },

  anotacaoAtualizando: {
    padding: 30,
    paddingTop: 15,
    backgroundColor: '#CCC',
    textAlignVertical: 'top',
    fontSize: 18
  },

  btnSetAnnotation: {
    position: 'absolute', /* aquuuuuuuuuuuuuuuuuuui */
    right: 20,
    bottom: 20,
    width: 75,
    height: 75,
    backgroundColor: '#069',
    borderRadius: 50
  },

  btnSetAnnotationText: {
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    top: 15,
    fontSize: 35
  },

  btnSetAnnotationSave: {
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    top: 25,
    fontSize: 22
  }

});