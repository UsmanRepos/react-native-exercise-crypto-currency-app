import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { CurrencyLabel, HeaderBar, TextButton, TransactionHistory } from '../components';
import { COLORS, FONTS, SIZES } from '../constants';


const Transaction = ({ navigation, route }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(null)

  useEffect(() => {
    const { currency } = route.params
    setSelectedCurrency(currency)
  }, [])

  const renderTrade = () => {
    return (
      <View
        style={{
          marginTop:SIZES.padding,
          marginHorizontal:SIZES.padding,
          padding:SIZES.padding,
          borderRadius:SIZES.radius,
          backgroundColor:COLORS.white,
          ...styles.shadow
        }}
      >
        <CurrencyLabel 
          icon = {selectedCurrency?.image}
          currency= {selectedCurrency?.currency}
          code={selectedCurrency?.code}  
        />

        <View
          style={{
            justifyContent:"center",
            alignItems:"center",
            marginTop:SIZES.padding,
            marginBottom:SIZES.padding*1.5
          }}
        >
          <Text style={{...FONTS.h2}}>{selectedCurrency?.wallet.crypto} {selectedCurrency?.code}</Text>
          <Text style={{ ...FONTS.body4, color:COLORS.gray}}>${selectedCurrency?.wallet.value}</Text>
        </View>
        <TextButton 
          label={"Trade"}
          onPress={() => console.warn("trade")}
        />
      </View>
    )
  }

  const renderTransactionHistory = () => (
    <TransactionHistory 
      customContainerStyle={styles.shadow}
      history={selectedCurrency?.transactionHistory} 
    />
  )
  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <HeaderBar
        right={false}
      />
      <ScrollView
        style={{ flex:1, paddingBottom:SIZES.padding }}
      >
        {renderTrade()}
        {renderTransactionHistory()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8
  },
});
