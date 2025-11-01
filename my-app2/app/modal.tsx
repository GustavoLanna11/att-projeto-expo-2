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

export default function EditarPerfilScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
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
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Editar Perfil</Text>

          <View style={[styles.form, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Nome</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.inputBorder,
                    color: colors.text,
                  },
                ]}
                value={formData.nome}
                onChangeText={(text) => setFormData({ ...formData, nome: text })}
                placeholder="Digite seu nome"
                placeholderTextColor={colors.label}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Sobrenome</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.inputBorder,
                    color: colors.text,
                  },
                ]}
                value={formData.sobrenome}
                onChangeText={(text) => setFormData({ ...formData, sobrenome: text })}
                placeholder="Digite seu sobrenome"
                placeholderTextColor={colors.label}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Idade</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.inputBorder,
                    color: colors.text,
                  },
                ]}
                value={formData.idade}
                onChangeText={(text) => setFormData({ ...formData, idade: text })}
                placeholder="Digite sua idade"
                placeholderTextColor={colors.label}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Instituição</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.inputBorder,
                    color: colors.text,
                  },
                ]}
                value={formData.instituicao}
                onChangeText={(text) => setFormData({ ...formData, instituicao: text })}
                placeholder="Digite o nome da instituição"
                placeholderTextColor={colors.label}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Curso</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.inputBorder,
                    color: colors.text,
                  },
                ]}
                value={formData.curso}
                onChangeText={(text) => setFormData({ ...formData, curso: text })}
                placeholder="Digite o nome do curso"
                placeholderTextColor={colors.label}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.buttonSuccess }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cancelButton, { backgroundColor: colors.buttonDanger }]}
            onPress={() => router.back()}
          >
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
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
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
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  saveButton: {
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
