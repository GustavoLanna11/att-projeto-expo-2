import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PerfilData {
  nome: string;
  sobrenome: string;
  idade: string;
  instituicao: string;
  curso: string;
}

export default function PerfilScreen() {
  const router = useRouter();
  const [perfilData, setPerfilData] = useState<PerfilData>({
    nome: '',
    sobrenome: '',
    idade: '',
    instituicao: '',
    curso: '',
  });

  useFocusEffect(
    useCallback(() => {
      loadPerfilData();
    }, [])
  );

  const loadPerfilData = async () => {
    try {
      const nome = await AsyncStorage.getItem('nome') || '';
      const sobrenome = await AsyncStorage.getItem('sobrenome') || '';
      const idade = await AsyncStorage.getItem('idade') || '';
      const instituicao = await AsyncStorage.getItem('instituicao') || '';
      const curso = await AsyncStorage.getItem('curso') || '';

      setPerfilData({
        nome,
        sobrenome,
        idade,
        instituicao,
        curso,
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleEdit = () => {
    router.push('/modal');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Meu Perfil</Text>
        
        <View style={styles.card}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{perfilData.nome || 'Não informado'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Sobrenome</Text>
            <Text style={styles.value}>{perfilData.sobrenome || 'Não informado'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Idade</Text>
            <Text style={styles.value}>{perfilData.idade || 'Não informado'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Instituição</Text>
            <Text style={styles.value}>{perfilData.instituicao || 'Não informado'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Curso</Text>
            <Text style={styles.value}>{perfilData.curso || 'Não informado'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3498DB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

