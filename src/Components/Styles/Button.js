import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { fonts, colors } from './Theme'

export default ({ title, onPress, isLoading }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text style={[styles.buttonText]}>{title}</Text>
      {
        isLoading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator color={colors.primary} />
          </View>
        )
      }
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
    flexDirection: 'row',
  },
  buttonText: {
    color: colors.primary,
    fontFamily: fonts.light,
    fontSize: 18,
    letterSpacing: 0.5,
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  activityIndicator: {
    transform: [{scale: 0.70}],
    marginTop: 3.5,
    marginLeft: 5
  }
})