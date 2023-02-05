import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { VictoryScatter, VictoryChart, VictoryLine, VictoryAxis } from 'victory-native'


import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import { charOptions } from '../utils'
import { HeaderBar, CurrencyLabel, TextButton, PriceAlert } from '../components'
import { VictoryCustomTheme } from '../styles'


const CryptoDetail = ({ navigation, route }) => {

  const scrollX = new Animated.Value(0)
  const numberOfCharts = [1, 2, 3]

  const [selectedCurrency, setSelectedCurrency] = useState(null)
  const [charOption, setCharOptions] = useState(charOptions)
  const [selectedOption, setSelectedOption] = useState(charOption[0])


  useEffect(() => {
    const { currency } = route.params
    setSelectedCurrency(currency)
  }, [])

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width)
    return (
      <View
        style={{ height: 30, marginTop: 15 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {
            numberOfCharts.map((index) => {
              const opacity = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp"
              })
              const dotSize = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [SIZES.base * .8, 10, SIZES.base * .8],
                extrapolate: "clamp"
              })
              const dotColor = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
                extrapolate: "clamp"
              })
              return (
                <Animated.View
                  key={`dot-${index}`}
                  opacity={opacity}
                  style={{
                    width: dotSize,
                    height: dotSize,
                    borderRadius: SIZES.radius,
                    backgroundColor: dotColor,
                    marginHorizontal: 6,
                  }}
                ></Animated.View>
              )
            })
          }

        </View>
      </View>

    )
  }
  const renderChart = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          // justifyContent:"center",
          ...styles.shadow,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding
          }}
        >
          <View style={{ flex: 1 }}>
            <CurrencyLabel
              icon={selectedCurrency?.image}
              currency={selectedCurrency?.currency}
              code={selectedCurrency?.code}
            />
          </View>
          <View>
            <Text style={{ ...FONTS.h3 }}>{selectedCurrency?.amount}</Text>
            <Text
              style={{
                color: selectedCurrency?.type == "I" ? COLORS.green : COLORS.red,
                ...FONTS.body3
              }}
            >{selectedCurrency?.changes}</Text>
          </View>
        </View>
        {/* Chart */}

        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment={"center"}
          snapToInterval={SIZES.width - 40}
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } }
          ], { useNativeDriver: false })}
        >
          {
            numberOfCharts.map((index) => (
              <View
                key={`chart-${index}`}
                style={{ marginLeft: index == 0 ? SIZES.base : 0 }}
              >
                <View
                  style={{ marginTop: -25 }}
                >
                  <VictoryChart
                    theme={VictoryCustomTheme}
                    height={220}
                    width={SIZES.width - 40}
                  >
                    <VictoryLine
                      style={{
                        data: {
                          stroke: COLORS.secondary
                        },
                        parent: {
                          border: "1px solid #ccc"
                        },
                      }}
                      data={selectedCurrency?.chartData}
                      categories={{
                        x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                        y: ["15", "30", "45"]
                      }} />

                    <VictoryScatter
                      data={selectedCurrency?.chartData}
                      size={7}
                      style={{
                        data: {
                          fill: COLORS.secondary
                        }
                      }} />

                    <VictoryAxis
                      style={{
                        grid: {
                          stroke: "transparent"
                        }
                      }} />
                    <VictoryAxis
                      dependentAxis
                      style={{
                        axis: {
                          stroke: "transparent"
                        },
                        grid: {
                          stroke: "grey"
                        }
                      }} />

                  </VictoryChart>
                </View>
              </View>
            ))
          }
        </Animated.ScrollView>

        {/* Options */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            justifyContent: "space-between"
          }}
        >
          {
            charOption.map((option) => (
              <TextButton
                key={`option-${option.id}`}
                label={option.label}
                customContainerStyle={{
                  width: 60,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: selectedOption.id == option.id ? COLORS.primary : COLORS.lightGray
                }}
                customLabelStyle={{
                  color: selectedOption.id == option.id ? COLORS.white : COLORS.gray,
                  ...FONTS.body5
                }}
                onPress={() => setSelectedOption(option)}
              />
            ))
          }
        </View>
        {/* Dots */}
        {renderDots()}
      </View>
    );
  };

  const renderBuy = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          padding: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: SIZES.radius
          }}
        >
          {/* Currency */}
          <View style={{ flex: 1 }}>
            <CurrencyLabel
              icon={selectedCurrency?.image}
              currency={`${selectedCurrency?.currency} wallet`}
              code={selectedCurrency?.code}
            />
          </View>

          {/* Amount */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View style={{ marginRight: SIZES.base }}>
              <Text style={{ ...FONTS.h3 }}>{selectedCurrency?.wallet.value}</Text>
              <Text style={{ textAlign: "right", color: COLORS.gray, ...FONTS.body4 }}>{selectedCurrency?.wallet.crypto} {selectedCurrency?.code}</Text>
            </View>
            <Image
              source={icons.right_arrow}
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.gray
              }}

            />
          </View>
        </View>
        <TextButton
          label={"Buy"}
          onPress={() => navigation.navigate("transaction", { "currency": selectedCurrency })}
        />
      </View>
    );
  };

  const renderAbout = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          padding: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow
        }}
      >
        <Text style={{ ...FONTS.h3 }}>About {selectedCurrency?.currency}</Text>
        <Text style={{ marginTop: SIZES.base, ...FONTS.body3 }}>{selectedCurrency?.description}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray1,
      }}
    >
      <HeaderBar right={true} />
      <ScrollView>
        <View
          style={{ flex: 1, paddingBottom: SIZES.padding, }}
        >
          {renderChart()}
          {renderBuy()}
          {renderAbout()}
          <PriceAlert
            customContainerStyle={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.radius
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CryptoDetail;

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
