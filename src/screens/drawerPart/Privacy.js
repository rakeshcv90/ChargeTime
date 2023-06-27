import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Privacy() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <View style={styles.shadowContainer}>
        <Text style={styles.text}>Box Shadow Example</Text>
      </View>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#888888',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Required for Android
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});