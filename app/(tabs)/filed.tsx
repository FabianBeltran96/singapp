import { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { ServiceManager } from '../../src/services/services';
import type { Service } from '../../src/types/service';

export default function TabTwoScreen() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const response = await ServiceManager.getCurrentUserServices();
      
      if (response.status === 200) {
        // Filtrar solo los servicios finalizados
        const firmados = response.data.filter(service => service.estado === 'finalizado');
        setServices(firmados);
      } else {
        Alert.alert('Error', response.error || 'Error al cargar servicios');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={services}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No hay servicios finalizados</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.headerContainer}>
              <Text style={styles.itemTitle}>{item.titulo}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.estado}</Text>
              </View>
            </View>
            <Text style={styles.description}>
              {item.descripcion || 'Sin descripción disponible'}
            </Text>
            <Text style={styles.itemDate}>{item.fecha_hora_evento}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  itemDate: {
    color: '#888',
    fontSize: 12,
  },
  list: {
    paddingVertical: 12,
  },
  separator: {
    height: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  }
});
