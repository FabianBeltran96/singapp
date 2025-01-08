import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { ServiceManager } from '../../src/services/services';
import { AuthService } from '../../src/services/auth';
import type { Service } from '../../src/types/service';
import * as ImagePicker from 'expo-image-picker';

export default function TabTwoScreen() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const response = await ServiceManager.getCurrentUserServices();
      console.log('Services response:', response);

      if (response.status === 200) {
        setServices(response.data);
      } else {
        console.error('Error response:', response);
        Alert.alert('Error', response.error || 'Error al cargar servicios');
      }
    } catch (error) {
      console.error('Error loading services:', error);
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log('Loading services');
    const fetchServices = async () => {
      console.log('Fetching services 2');
      try {
        const response = await ServiceManager.getCurrentUserServices();
        if (mounted && response.status === 200) {
          setServices(response.data);
        }
        console.log('Fetching services 3');
      } catch (error) {
        console.error('Error:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    console.log('Fetching services');
    fetchServices();

    return () => {
      mounted = false;
    };
  }, []);

  const handleItemPress = (service: Service) => {
    router.push({
      pathname: '/(tabs)/filed',
      params: {
        id: service.id,
        title: service.titulo,
        description: service.descripcion,
        status: service.estado,
        date: service.fecha_hora_evento,
        client: service.cliente.nombre,
        worker: service.trabajador.nombre_apellido,
        address: service.direccion,
        price: service.precio
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendiente':
        return '#FFA500';
      case 'en_progreso':
        return '#4169E1';
      case 'finalizado':
        return '#32CD32';
      case 'creado':
        return '#FFD700';
      default:
        return '#808080';
    }
  };

  const handleStartService = async (serviceId: number) => {
    Alert.alert(
      'Confirmar inicio',
      '¿Estás seguro de que deseas iniciar este servicio?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Iniciar',
          onPress: async () => {
            try {
              const response = await ServiceManager.setServiceInProgress(serviceId);
              if (response.status === 200) {
                loadServices();
                Alert.alert('Éxito', 'Servicio iniciado correctamente');
              } else {
                Alert.alert('Error', response.error || 'Error al iniciar el servicio');
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

  const handleSignService = async (serviceId: number) => {
    Alert.alert(
      'Confirmar firma',
      '¿Deseas proceder a firmar este servicio?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Firmar',
          onPress: async () => {
            try {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              
              if (status !== 'granted') {
                Alert.alert('Error', 'Se necesita permiso para acceder a la galería');
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
              });

              if (!result.canceled && result.assets[0].base64) {
                const signatureData = {
                  firma: `data:image/png;base64,${result.assets[0].base64}`,
                  observacion: null
                };

                const response = await ServiceManager.signService(serviceId, signatureData);
                if (response.status === 200) {
                  loadServices();
                  Alert.alert('Éxito', 'Servicio firmado correctamente');
                } else {
                  Alert.alert('Error', response.error || 'Error al firmar el servicio');
                }
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Error al procesar la imagen');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{item.titulo}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.estado) }]}>
          <Text style={styles.statusText}>{item.estado}</Text>
        </View>
      </View>

      <Text style={styles.itemDescription} numberOfLines={2}>
        {item.descripcion}
      </Text>

      <View style={styles.itemDetails}>
        <Text style={styles.itemDate}>{item.fecha_hora_evento}</Text>
        <Text style={styles.itemClient}>{item.cliente.nombre}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.startButton]}
          onPress={() => handleStartService(item.id)}
        >
          <Text style={styles.buttonText}>Iniciar Servicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.signButton]}
          onPress={() => handleSignService(item.id)}
        >
          <Text style={styles.buttonText}>Firmar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshing={isLoading}
        onRefresh={loadServices}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay servicios disponibles</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={loadServices}
      >
      </TouchableOpacity>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
  },
  itemClient: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  signButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
