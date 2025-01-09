import { TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AuthService } from '../../../src/services/auth';

export function LogoutButton() {
  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await AuthService.logout();
              if (response.status === 200) {
                router.replace('/');
              } else {
                Alert.alert('Error', response.error || 'Error al cerrar sesión');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Error de conexión');
            }
          }
        }
      ]
    );
  };

  return (
    <TouchableOpacity 
      onPress={handleLogout}
      style={{ marginRight: 15 }}
    >
      <MaterialIcons name="logout" size={24} color="#2196F3" />
    </TouchableOpacity>
  );
} 