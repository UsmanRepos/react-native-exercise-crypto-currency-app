import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, icons, SIZES } from '../constants';

const TransactionHistory = ({ customContainerStyle, history }) => {

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: SIZES.base
                }}
                onPress={() => console.warn("transaction item")}
            >
                <Image
                    source={icons.transaction}
                    resizeMode='contain'
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.primary
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>{item.description}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.gray }}>{item.date}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        height: "100%",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{ color: item.type == "B" ? COLORS.green : COLORS.black, ...FONTS.h3 }}
                    >{item.amount} {item.currency}</Text>
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
            </TouchableOpacity>
        )
    }
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle
            }}
        >
            <Text style={{ ...FONTS.h2 }}>Transaction History</Text>
            <FlatList
                contentContainerStyle={{ marginTop: SIZES.radius }}
                data={history}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                    return (
                        <View
                            style={{
                                width: "100%",
                                height: 1,
                                backgroundColor: COLORS.lightGray
                            }}
                        ></View>
                    )
                }}
            />
        </View>
    );
};

export default TransactionHistory;

const styles = StyleSheet.create({});
