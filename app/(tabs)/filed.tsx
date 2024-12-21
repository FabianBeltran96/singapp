import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';



export default function TabTwoScreen() {
  const data = [
    {
      id: 1,
      name: 'Contrato de servicios.pdf',

      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Acuerdo de confidencialidad.pdf',

      date: '2024-01-16'
    },
    {
      id: 3,
      name: 'Propuesta comercial.pdf',

      date: '2024-01-17'
    },
    {
      id: 4,
      name: 'Contrato laboral.pdf',

      date: '2024-01-18'
    },
    {
      id: 5,
      name: 'Términos y condiciones.pdf',

      date: '2024-01-19'
    }
  ];


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View />}
        ListHeaderComponent={() => <View />}
        ListEmptyComponent={() => <View />}
        renderItem={({ item }) =>
        (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text >{item.date}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
    height: '100%',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});
