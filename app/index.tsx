import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { InputField } from '../src/components/InputField';
import { AuthService } from '../src/services/auth';
import type { LoginCredentials } from '../src/types/auth';

export default function HomeScreen() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    identificacion: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateCredentials = (): boolean => {
    if (!credentials.identificacion || !credentials.password) {
      Alert.alert('Error', 'Por favor ingresa identificación y contraseña');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateCredentials()) return;

    setIsLoading(true);
    router.push('/(tabs)');
    try {
      const response = await AuthService.login(credentials);
      console.log('Login response:', response);

      if (response.status === 200) {
        await AuthService.saveToken(response.data.token);
        const savedToken = await AuthService.getToken();
        console.log('Token guardado:', savedToken);
      } else {
        Alert.alert('Error', response.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>

        <View style={styles.inputContainer}>
          <InputField
            label="Identificación"
            value={credentials.identificacion}
            onChangeText={(text) => setCredentials(prev => ({ ...prev, identificacion: text }))}
            isDisabled={isLoading}
          />
          <InputField
            label="Contraseña"
            value={credentials.password}
            onChangeText={(text) => setCredentials(prev => ({ ...prev, password: text }))}
            isPassword
            isDisabled={isLoading}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity disabled={isLoading}>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },
});

