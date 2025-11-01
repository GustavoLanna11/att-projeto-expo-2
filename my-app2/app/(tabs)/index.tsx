import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Gerencie seu perfil na aba "Perfil"</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📱 App de Perfil</Text>
          <Text style={styles.cardText}>
            Navegue até a aba Perfil para visualizar e editar suas informações pessoais.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Funcionalidades</Text>
          <Text style={styles.cardText}>
            • Visualize suas informações{'\n'}
            • Edite seu perfil facilmente{'\n'}
            • Dados salvos localmente
          </Text>
        </View>
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
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
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
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});
