import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.welcomeText, { color: colors.text }]}>Bem-vindo!</Text>
        <Text style={[styles.subtitle, { color: colors.subtitle }]}>Gerencie seu perfil na aba "Perfil"</Text>
        
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: colors.tint }]}>📱 App de Perfil</Text>
          <Text style={[styles.cardText, { color: colors.text }]}>
            Navegue até a aba Perfil para visualizar e editar suas informações pessoais.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: colors.tint }]}>✨ Funcionalidades</Text>
          <Text style={[styles.cardText, { color: colors.text }]}>
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
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
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
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
