import {View, Image, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams, Stack} from "expo-router";
import useFetch from "@/services/useFetch";
import {getMovieDetails} from "@/services/api";
import {icons} from "@/assets/constants/icons";
import MovieInfo from "@/components/movieInfo";
import {isStarredMovie, toggleMovie} from "@/services/starredMovies";

const MovieDetails = () => {
    const { id } = useLocalSearchParams()
    const movieId = Number(id)
    const [starred, setStarred] = useState<boolean>(false)
    const { data: movie, loading } = useFetch(() => getMovieDetails(id as string))

    const handleToggle = async () => {
        if (!movie) return

        const newState = await toggleMovie({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path
        })
        setStarred(newState)
    }

    useEffect(() => {
        isStarredMovie(movieId).then(setStarred)
    }, [movieId])

    return (
        <View className='bg-primary flex-1'>
            <Stack.Screen options={{ headerShown: false }} />

            {
                loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className='mt-10 self-center'/>
                ) : (
                    <ScrollView contentContainerStyle={{
                        paddingBottom: 80
                    }}>
                        <View>
                            <Image source={{
                                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                            }}
                                   className='w-full h-[550px]'
                                   resizeMode='stretch'/>
                        </View>

                        <TouchableOpacity
                            className='flex-row justify-end items-center mt-5'
                            onPress={handleToggle}>
                            <Image source={starred ? icons.added : icons.add}/>
                            <Text className='text-light-200 text-sm px-3'>
                                {starred ? 'Added to Watchlist' : 'Add to Watchlist'}
                            </Text>
                        </TouchableOpacity>

                        <View className='flex-col items-start justify-center mt-5 px-5'>
                            <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
                            <View className='flex-row items-center gap-x-1 mt-2'>
                                <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
                            </View>
                            <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                                <Image source={icons.star} className='size-4' />
                                <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
                                <Text className='text-light-200 text-sm'>({movie?.vote_count} votes)</Text>
                            </View>
                            <MovieInfo label='Overview' value={movie?.overview} />
                            <MovieInfo label='Genres' value={movie?.genres?.map((g) => g.name).join(' - ') || 'N/A'} />
                            <View className='flex flex-row justify-between w-1/2'>
                                <MovieInfo label='Budget' value={`$${(movie?.budget ?? 0) / 1_000_000} million`} />
                            </View>
                        </View>

                    </ScrollView>
                )
            }
        </View>
    )
}

export default MovieDetails
