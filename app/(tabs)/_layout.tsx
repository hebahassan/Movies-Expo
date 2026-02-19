import React from 'react'
import {Tabs} from "expo-router";
import { Image } from "react-native";
import {icons} from "@/assets/constants/icons";
import {Colors} from "@/theme/colors";

const TabIcon = ({ focused, icon }: any) => {
    return(
        <Image
            source={icon}
            resizeMode="contain"
            style={{
                tintColor: focused ? Colors.accent : Colors.textSecondary,
            }} />
    )
}

const _Layout = () => {
    return (
        <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                height: "100%",
            },
            tabBarStyle: {
                backgroundColor: "#1C1C1E",
                display: "flex",
            },
            tabBarIconStyle: {
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home} />
                    )
                }}/>
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search} />
                    )
                }}/>
            <Tabs.Screen
                name="saved"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                        icon={icons.save} />
                    )
                }}/>
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person} />
                    )
                }}/>
        </Tabs>
    )
}
export default _Layout
