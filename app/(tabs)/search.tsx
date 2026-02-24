import {View, Text, FlatList, Image, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import MovieCard from "@/components/movieCard";
import useFetch from "@/services/useFetch";
import {getMovies} from "@/services/api";
import {icons} from "@/assets/constants/icons";
import SearchBar from "@/components/searchBar";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: movies, loading, error, refetch: loadMovies, reset } = useFetch(
        () => getMovies({ query: searchQuery}),
        false
    )

    useEffect(() => {
        const func = setTimeout(
            async () => {
                if (searchQuery.trim()) {
                    await loadMovies();
                } else {
                    reset()
                }
            },
            500
        )

        return () => clearTimeout(func)
    }, [searchQuery])

    return (
        <View className='flex-1 bg-primary'>
            <FlatList
                data={movies}
                renderItem={({ item } ) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                className='px-5'
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 15,
                    marginVertical: 16
                }}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                ListHeaderComponent={
                    <>
                        <View className='w-full flex-row justify-center mt-20 items-center'>
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>
                        
                        <View className='my-5'>
                            <SearchBar
                                placeholder='Search Movies'
                                value={searchQuery}
                                onChangeText={(text) => setSearchQuery(text)}/>

                            { loading && (
                                <ActivityIndicator
                                    size="large"
                                    color="#0000ff"
                                    className='mt-10 self-center'/>
                            )}
                            { error && (
                                <Text className='text-red-500 px-5 my-3'>Something went wrong, please try again</Text>
                            )}
                            { !loading && !error && searchQuery.trim() && movies?.length > 0 && (
                                <Text className='text-xl text-white font-bold mt-5'>Search Results:</Text>
                            )}
                        </View>
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className='mt-10 px-5'>
                            <Text className='text-center text-gray-500'>
                                {searchQuery.trim() ? 'No movies found' : ''}
                            </Text>
                        </View>
                    ): null
                }/>
        </View>
    )
}
export default Search
