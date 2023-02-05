
import { Image, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../constants'

const TabBarIcon = ({ icon, focused, label }) => {
    return (
        <View
            style={{ justifyContent: "center", alignItems: "center" }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? COLORS.primary : COLORS.black
                }}

            />
            <Text
                style={{ ...FONTS.body5, color: focused ? COLORS.primary : COLORS.black }}
            >{label}</Text>
        </View>
    );
};

export default TabBarIcon;


