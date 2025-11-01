import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PerfilData {
  nome: string;
  sobrenome: string;
  idade: string;
  instituicao: string;
  curso: string;
}

export default function EditarPerfilScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<PerfilData>({
    nome: '',
    sobrenome: '',
    idade: '',
    instituicao: '',
    curso: '',
  });

  useEffect(() => {
    loadPerfilData();
  }, []);

  const loadPerfilData = async () => {
    try {
      const nome = await AsyncStorage.getItem('nome') || '';
      const sobrenome = await AsyncStorage.getItem('sobrenome') || '';
      const idade = await AsyncStorage.getItem('idade') || '';
      const instituicao = await AsyncStorage.getItem('instituicao') || '';
      const curso = await AsyncStorage.getItem('curso') || '';

      setFormData({
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

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('nome', formData.nome);
      await AsyncStorage.setItem('sobrenome', formData.sobrenome);
      await AsyncStorage.setItem('idade', formData.idade);
      await AsyncStorage.setItem('instituicao', formData.instituicao);
      await AsyncStorage.setItem('curso', formData.curso);

      Alert.alert('Sucesso', 'Perfil salvo com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Editar Perfil</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={formData.nome}
                onChangeText={(text) => setFormData({ ...formData, nome: text })}
                placeholder="Digite seu nome"
                placeholderTextColor="#95A5A6"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Sobrenome</Text>
              <TextInput
                style={styles.input}
                value={formData.sobrenome}
                onChangeText={(text) => setFormData({ ...formData, sobrenome: text })}
                placeholder="Digite seu sobrenome"
                placeholderTextColor="#95A5A6"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={styles.input}
                value={formData.idade}
                onChangeText={(text) => setFormData({ ...formData, idade: text })}
                placeholder="Digite sua idade"
                placeholderTextColor="#95A5A6"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Instituição</Text>
              <TextInput
                style={styles.input}
                value={formData.instituicao}
                onChangeText={(text) => setFormData({ ...formData, instituicao: text })}
                placeholder="Digite o nome da instituição"
                placeholderTextColor="#95A5A6"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Curso</Text>
              <TextInput
                style={styles.input}
                value={formData.curso}
                onChangeText={(text) => setFormData({ ...formData, curso: text })}
                placeholder="Digite o nome do curso"
                placeholderTextColor="#95A5A6"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8ECEF',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#2C3E50',
  },
  saveButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#27AE60',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#E74C3C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
