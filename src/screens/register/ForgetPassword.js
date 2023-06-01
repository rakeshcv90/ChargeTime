import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgetPassword = () => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' >
    <View>
    <SignUp />
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default ForgetPassword