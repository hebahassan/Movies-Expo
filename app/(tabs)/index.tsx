import {View, Image, ScrollView, ActivityIndicator, Text, FlatList} from "react-native";
import {useRouter} from "expo-router";
import {icons} from "@/assets/constants/icons";
import SearchBar from "@/components/searchBar";
import useFetch from "@/services/useFetch";
import {getMovies} from "@/services/api";
import MovieCard from "@/components/movieCard";

export default function Index() {
    const router = useRouter();
    const { data: movies, loading, error } = useFetch(
        () => getMovies({ query: ''})
    )

  return (
    <View className="flex-1 bg-primary">
        <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                minHeight: "100%",
                paddingBottom: 10
            }}>

            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className='mt-10 self-center'/>
            ) : error ? (
                <Text>No data found</Text>
            ): (
                <View className="flex-1 mt-5">
                    <SearchBar
                        onPress = {() => router.push("/search")}
                        placeholder='Search Movies'/>

                    <>
                        <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

                        <FlatList
                            data={movies}
                            renderItem={({ item }) => (
                                <MovieCard {...item} />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            columnWrapperStyle={{
                                gap: 10,
                                justifyContent: 'flex-start',
                            }}
                            contentContainerStyle={{
                                gap:15,
                            }}
                            className='mt-2 pb-32'
                            scrollEnabled={false}/>
                    </>
                </View>
            )}

        </ScrollView>
    </View>
  );
}
