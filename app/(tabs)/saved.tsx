import {View, Text, FlatList} from 'react-native'
import React, {useCallback, useState} from 'react'
import {useFocusEffect} from "expo-router";
import {getStarredMovies, StarredMovie, toggleMovie} from "@/services/starredMovies";
import SavedMovieCard from "@/components/savedMovieCard";

const Saved = () => {
    const [movies, setMovies] = useState<StarredMovie[]>([])

    useFocusEffect(
        useCallback(() => {
            getStarredMovies().then(setMovies)
        }, [])
    )

    return (
        <View className="flex-1 bg-primary p-3">
            <Text className='text-white font-bold text-xl pt-20'>Saved Movies</Text>

            <FlatList
                data={movies}
                renderItem={({item}) => (
                    <SavedMovieCard {...item}
                        onRemove={() => {
                            toggleMovie(item).then(() => getStarredMovies().then(setMovies))
                        }}/>
                )}
                keyExtractor={(item) => item.id.toString()}
                className='mt-4 pb-32'
                scrollEnabled={false}
                contentContainerStyle={{paddingBottom: 80}}/>
        </View>
    )
}
export default Saved
