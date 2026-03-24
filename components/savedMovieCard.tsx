import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {StarredMovie} from "@/services/starredMovies";
import {icons} from "@/assets/constants/icons";

interface SavedMovieCardProps extends StarredMovie {
    onRemove: () => void
}

const SavedMovieCard = ({title, poster_path, vote_average, release_date, onRemove}: SavedMovieCardProps) => {
    return (
        <View className='flex-row w-full my-2 p-3 bg-dark-200 rounded-lg'>
            <Image
                source={{
                    uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
                }}
                className='w-28 h-32 rounded-lg'
                resizeMode='cover'/>

            <View className='flex-1 ml-3 justify-between'>
                <Text className='text-white text-lg font-bold' numberOfLines={2}>{title}</Text>
                <Text className='text-light-200 text-sm'>{release_date?.split('-')[0]}</Text>
                <View className='flex-row items-center'>
                    <Image source={icons.star} className='size-4'/>
                    <Text className='text-white text-sm mx-1'>{Math.round(vote_average)}/10</Text>
                </View>

                <TouchableOpacity
                    className='self-end bg-red-600 rounded-md py-1 px-2'
                    onPress={onRemove}>
                    <Text className='text-white text-xs'>Remove</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default SavedMovieCard
