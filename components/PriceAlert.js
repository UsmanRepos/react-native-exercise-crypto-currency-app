import { StyleSheet, Text, TouchableOpacity, View, Image  } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES, icons, images } from '../constants'

const PriceAlert = ({ customContainerStyle }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection:"row",
                paddingHorizontal:SIZES.padding,
                paddingVertical:SIZES.radius,
                marginHorizontal:SIZES.padding,
                marginTop:SIZES.padding*4.5,
                alignItems:"center",
                backgroundColor:COLORS.white,
                borderRadius:SIZES.radius,
                ...customContainerStyle,
                ...styles.shadow,
            }}
        >
            <Image 
                source={icons.notification_color}
                resizeMode='contain'
                style={{
                    width:30,
                    height:30
                }}
            />
            <View 
                style={{
                    flex:1,
                    marginLeft:SIZES.radius
                }}
            >
                <Text style={{...FONTS.h3}}>Set Price Alert</Text>
                <Text style={{...FONTS.body4, color:COLORS.gray}}>Get notified when your coins are moving</Text>
            </View>
            <Image 
                source={icons.right_arrow}
                resizeMode='contain'
                style={{
                    width:25,
                    height:25,
                    tintColor:COLORS.gray
                }}
            />
        </TouchableOpacity>
    );
};

export default PriceAlert;

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
    }
});
