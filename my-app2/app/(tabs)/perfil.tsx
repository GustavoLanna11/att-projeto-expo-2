import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
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
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Meu Perfil</Text>
        
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.fieldContainer, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.label }]}>Nome</Text>
            <Text style={[styles.value, { color: colors.text }]}>{perfilData.nome || 'Não informado'}</Text>
          </View>

          <View style={[styles.fieldContainer, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.label }]}>Sobrenome</Text>
            <Text style={[styles.value, { color: colors.text }]}>{perfilData.sobrenome || 'Não informado'}</Text>
          </View>

          <View style={[styles.fieldContainer, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.label }]}>Idade</Text>
            <Text style={[styles.value, { color: colors.text }]}>{perfilData.idade || 'Não informado'}</Text>
          </View>

          <View style={[styles.fieldContainer, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.label }]}>Instituição</Text>
            <Text style={[styles.value, { color: colors.text }]}>{perfilData.instituicao || 'Não informado'}</Text>
          </View>

          <View style={[styles.fieldContainer, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.label }]}>Curso</Text>
            <Text style={[styles.value, { color: colors.text }]}>{perfilData.curso || 'Não informado'}</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.buttonPrimary }]} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
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
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
  },
  editButton: {
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

