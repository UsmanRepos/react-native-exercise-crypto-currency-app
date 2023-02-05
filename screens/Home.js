import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import { portfolio, trendingCurrencies, transactionHistory } from '../utils'
import { PriceAlert, TransactionHistory } from '../components'

const Home = ({ navigation }) => {
  const [trending, setTrending] = useState(trendingCurrencies)
  const [transHistory, setTransHistory] = useState(transactionHistory)

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, []);

  const renderHeader = () => {

    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{
            width: 180,
            padding: SIZES.padding,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginRight: SIZES.base,
            borderRadius: 10,
            backgroundColor: COLORS.white
          }}
          onPress={() => navigation.navigate("cryptoDetail", { "currency": item })}
        >
          {/* Currency */}
          <View
            style={{ flexDirection: "row" }}
          >
            <View>
              <Image
                source={item.image}
                resizeMode='cover'
                style={{
                  marginTop: 5,
                  width: 25,
                  height: 25,
                }}
              />
            </View>
            <View
              style={{ marginLeft: SIZES.base }}
            >
              <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
              <Text style={{ ...FONTS.body3, color: COLORS.gray }}>{item.code}</Text>
            </View>
          </View>

          {/* Value */}
          <View
            style={{ marginTop: SIZES.radius }}
          >
            <Text style={{ ...FONTS.h2, }}>${item.amount}</Text>
            <Text style={{ color: item.type == "I" ? COLORS.green : COLORS.red, ...FONTS.h3 }}>{item.changes}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View
        style={{
          width: "100%",
          height: "24%",
          ...styles.shadow,
        }}
      >
        <ImageBackground
          source={images.banner}
          resizeMode='cover'
          style={{
            flex: 1,
            alignItems:"center"
          }}
        >
          {/* Header Bar */}
          <View
            style={{
              marginTop: SIZES.padding * 2,
              alignItems: "flex-end",
              paddingHorizontal: SIZES.padding,
              width: "100%"
            }}
          >
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => console.warn("notification")}
            >
              <Image
                source={icons.notification_white}
                resizeMode='contain'
                style={{ flex: 1, width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          </View>

          {/* Balance Section */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>Your Portfolio Balance</Text>
            <Text style={{ ...FONTS.h1, color: COLORS.white, marginTop: SIZES.base }}>${portfolio.balance}</Text>
            <Text style={{ ...FONTS.body5, color: COLORS.lightGray }}>{portfolio.changes} Last 24 Hours</Text>
          </View>

          {/* Trending Section */}
          <View
            style={{
              position: "absolute",
              bottom: "-30%"
            }}
          >
            <Text style={{ marginLeft: SIZES.padding, color: COLORS.white, ...FONTS.h2 }}>Trending</Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: SIZES.base }}
              data={trending}
              renderItem={renderItem}
              keyExtractor={item => `${item.id}`}
            />
          </View>


        </ImageBackground>
      </View>
    );
  };

  const renderAlert = () => (
    <PriceAlert />
  )
  const renderNotice = () => (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.secondary,
        ...styles.shadow,
      }}
    >
      <Text style={{ color: COLORS.lightGray, ...FONTS.h3 }}>Investing Safety</Text>
      <Text
        style={{
          marginTop: SIZES.base,
          ...FONTS.body4,
          lineHeight: 18,
          color: COLORS.lightGray,
        }}
      >
        It's very difficult time to investment, especially when the market is volatile.
        Learn how to use dollar cost averging to you advantages.
      </Text>
      <TouchableOpacity
        style={{
          marginTop: SIZES.base,
        }}
      >
        <Text style={{ color: COLORS.green, textDecorationLine: "underline", ...FONTS.h3 }}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTransactionHistory = () => (
    <TransactionHistory
      customContainerStyle={styles.shadow}
      history={transHistory}
    />
  )
  return (
    <ScrollView>
      <View
        style={{ flex: 1, paddingBottom: 130 }}
      >
        {renderHeader()}
        {renderAlert()}
        {renderNotice()}
        {renderTransactionHistory()}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  }
})
