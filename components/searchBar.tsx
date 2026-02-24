import {View, Image, TextInput} from 'react-native'
import React from 'react'
import {icons} from "@/assets/constants/icons";
import {Colors} from "@/theme/colors";

interface Props {
    placeholder: string,
    onPress?: () => void,
    value?: string,
    onChangeText?: (text: string) => void,
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
    return (
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
            <Image source={icons.search} className='size-5' resizeMode='contain' />
            <TextInput
                onPress={onPress}
                onChangeText={onChangeText}
                placeholder={placeholder}
                value={value}
                placeholderTextColor={Colors.textSecondary}
                className='flex-1 ml-2 text-white'/>
        </View>
    )
}
export default SearchBar
